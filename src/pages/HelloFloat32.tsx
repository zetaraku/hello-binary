// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if'
import * as React from 'react'
import * as M from '@mui/material'
import { css } from '@emotion/react'
import { Icon } from '@iconify/react'
import Float32, { Float32Mask, Float32MaskSize, Float32Offset } from '../utils/Float32'

const Float32Indexes = {
  Sign: [...Array(Float32MaskSize.Sign).keys()].map(index => Float32Offset.Sign + index),
  Exponent: [...Array(Float32MaskSize.Exponent).keys()].map(index => Float32Offset.Exponent + index),
  Mantissa: [...Array(Float32MaskSize.Mantissa).keys()].map(index => Float32Offset.Mantissa + index),
  All: [...Array(Float32MaskSize.All).keys()].map(index => Float32Offset.All + index)
} as const

function formatNumberWithSign (value: number, digits?: number): string {
  if (Object.is(value, -0)) return '-0'
  if (Object.is(value, +0)) return '+0'
  return (value > 0 ? '+' : '') + (digits !== undefined ? value.toFixed(digits) : value.toString())
}

function formatFloat32AsRawWithSpace (value: Float32): string {
  const result = value.getRaw().toString(2).padStart(32, '0')
  return [result.substring(0, 1), result.substring(1, 9), result.substring(9, 32)].join(' ')
}

export const style = {
  bit: css`
    width: 30px;
    height: 30px;
    min-width: 0;
    border-radius: 50%;

    font-size: 24px;
    font-family: monospace;

    ruby {
      rt {
        opacity: 0.0;
        transition: opacity 400ms;
      }

      &:hover rt {
        opacity: 1.0;
      }
    }
  `,
  number: css`
    font-size: 20px;
    font-family: monospace;
  `
}

const HelloFloat32: React.FunctionComponent = () => {
  const [float32, dispatch] = React.useReducer(
    (prevState: Float32, action: (
      {
        type: 'set_raw'
        value: number
      } | {
        type: 'set_number'
        value: number
      } | {
        type: 'toggle_bit'
        index: number
      }
    )) => {
      switch (action.type) {
        case 'set_raw': {
          return prevState.clone().setRaw(action.value)
        }
        case 'set_number': {
          return prevState.clone().setNumber(action.value)
        }
        case 'toggle_bit': {
          return prevState.clone().rawXor(1 << action.index)
        }
      }
    },
    Float32.fromNumber(0)
  )

  const numberInputRef = React.useRef<HTMLButtonElement>(null)

  const u32Value = float32.getRaw()
  const f32Value = float32.getNumber()
  const bits = React.useMemo(() => Float32Indexes.All.map(index => float32.getBit(index)), [float32])

  const rawSign = (u32Value & Float32Mask.Sign) >>> Float32Offset.Sign
  const rawExponent = (u32Value & Float32Mask.Exponent) >>> Float32Offset.Exponent
  const rawMantissa = (u32Value & Float32Mask.Mantissa) >>> Float32Offset.Mantissa

  const binSign = rawSign.toString(2)
  const binExponent = rawExponent.toString(2)
  const binMantissa = rawMantissa.toString(2).padStart(Float32MaskSize.Mantissa, '0')

  const decSign = rawSign.toString(10)
  const decExponent = rawExponent.toString(10)
  const decMantissa = (rawMantissa / (2 ** Float32MaskSize.Mantissa)).toFixed(Float32MaskSize.Mantissa).replace(/^0\./, '')

  const setRaw = (value: number): void => dispatch({ type: 'set_raw', value })
  const setNumber = (value: number): void => dispatch({ type: 'set_number', value })
  const toggleBit = (index: number): void => dispatch({ type: 'toggle_bit', index })

  const resetAll = (): void => setRaw(0)
  const toggleSign = (): void => rawSign !== 0 ? setRaw(u32Value & ~Float32Mask.Sign) : setRaw(u32Value | Float32Mask.Sign)
  const toggleExponent = (): void => rawExponent !== 0 ? setRaw(u32Value & ~Float32Mask.Exponent) : setRaw(u32Value | Float32Mask.Exponent)
  const toggleMantissa = (): void => rawMantissa !== 0 ? setRaw(u32Value & ~Float32Mask.Mantissa) : setRaw(u32Value | Float32Mask.Mantissa)

  const makeBitButtons = (indexes: number[]): React.ReactNode[] => indexes.map(index => (
    <M.Button
      key={index}
      variant="text"
      css={style.bit}
      onClick={() => toggleBit(index)}
    >
      <ruby>
        {bits[index]}
        <rt>[{index}]</rt>
      </ruby>
    </M.Button>
  )).reverse()

  return (
    <>
      <h1>Float32 (Single-precision floating-point format)</h1>

      <h2>Calculator</h2>
      <M.Table>
        <M.TableHead>
          {/* Headers */}
          <M.TableRow>
            <M.TableCell align="center">
              <M.IconButton onClick={resetAll}>
                <Icon icon="mdi:replay" />
              </M.IconButton>
            </M.TableCell>
            <M.TableCell align="center">
              <M.Button variant="text" onClick={toggleSign}>
                Sign ({Float32MaskSize.Sign} bit)
              </M.Button>
            </M.TableCell>
            <M.TableCell align="center">
              <M.Button variant="text" onClick={toggleExponent}>
                Exponent ({Float32MaskSize.Exponent} bit)
              </M.Button>
            </M.TableCell>
            <M.TableCell align="center">
              <M.Button variant="text" onClick={toggleMantissa}>
                Mantissa ({Float32MaskSize.Mantissa} bit)
              </M.Button>
            </M.TableCell>
          </M.TableRow>
        </M.TableHead>
        <M.TableBody>
          {/* Bits */}
          <M.TableRow>
            <M.TableCell component="th">
              Bits
            </M.TableCell>
            <M.TableCell align="center">
              {makeBitButtons(Float32Indexes.Sign)}
            </M.TableCell>
            <M.TableCell align="center">
              {makeBitButtons(Float32Indexes.Exponent)}
            </M.TableCell>
            <M.TableCell align="center">
              {makeBitButtons(Float32Indexes.Mantissa)}
            </M.TableCell>
          </M.TableRow>

          {/* Binary */}
          <M.TableRow>
            <M.TableCell component="th">
              Binary
            </M.TableCell>
            <M.TableCell align="center" css={style.number}>
              {binSign}
            </M.TableCell>
            <M.TableCell align="center" css={style.number}>
              {binExponent}
            </M.TableCell>
            <M.TableCell align="center" css={style.number}>
              .{binMantissa}
            </M.TableCell>
          </M.TableRow>

          {/* Decimal */}
          <M.TableRow>
            <M.TableCell component="th">
              Decimal
            </M.TableCell>
            <M.TableCell align="center" css={style.number}>
              {decSign}
            </M.TableCell>
            <M.TableCell align="center" css={style.number}>
              {decExponent}
            </M.TableCell>
            <M.TableCell align="center" css={style.number}>
              .{decMantissa}
            </M.TableCell>
          </M.TableRow>

          {/* Value (1) */}
          <M.TableRow>
            {/* Value Label */}
            <M.TableCell component="th" rowSpan={2}>
              Value
            </M.TableCell>

            {/* Value Sign */}
            <M.TableCell align="center" css={style.number}>
              <Unless condition={rawExponent === 255 && rawMantissa !== 0}>
                <span css={{ color: '#a9a9a9' }}>(-1)</span>
                <sup css={{ color: '#000000' }}>{rawSign}</sup>
              </Unless>
            </M.TableCell>

            {/* Value Exponent */}
            <M.TableCell align="center" css={style.number} colSpan={rawExponent === 255 ? 2 : 1}>
              <Unless condition={rawExponent === 255 && rawMantissa !== 0}>
                <span>{'× '}</span>
              </Unless>
              <When condition={rawExponent === 0}>
                <span css={{ color: '#a9a9a9' }}>2</span>
                <sup>
                  <span css={{ color: '#ff0000' }}>{1 - 127}</span>
                </sup>
                <small css={{ color: '#ff0000' }}> (denormalized)</small>
              </When>
              <When condition={rawExponent > 0 && rawExponent < 255}>
                <span css={{ color: '#a9a9a9' }}>2</span>
                <sup>
                  <span css={{ color: '#000000' }}>{rawExponent}</span>
                  <span css={{ color: '#1e90ff' }}>-{127}</span>
                </sup>
                <small css={{ color: '#1e90ff' }}> (normalized)</small>
              </When>
              <When condition={rawExponent === 255}>
                <When condition={rawMantissa === 0}>
                  <span css={{ color: '#ff0000' }}>Infinity</span>
                  <small css={{ color: '#a9a9a9' }}> (Exponent = 255, Mantissa = 0)</small>
                </When>
                <When condition={rawMantissa !== 0}>
                  <span css={{ color: '#ff0000' }}>NaN</span>
                  <small css={{ color: '#a9a9a9' }}> (Exponent = 255, Mantissa ≠ 0)</small>
                </When>
              </When>
            </M.TableCell>

            {/* Value Mantissa */}
            <When condition={rawExponent !== 255}>
              <M.TableCell align="center" css={style.number}>
                <span>{'× '}</span>
                <When condition={rawExponent === 0}>
                  <span css={{ color: '#ff0000' }}>0</span>.{decMantissa}
                  <small css={{ color: '#ff0000' }}> (denormalized)</small>
                </When>
                <When condition={rawExponent !== 0}>
                  <span css={{ color: '#1e90ff' }}>1</span>.{decMantissa}
                  <small css={{ color: '#1e90ff' }}> (normalized)</small>
                </When>
              </M.TableCell>
            </When>
          </M.TableRow>

          {/* Value (2) */}
          <M.TableRow>
            {/* Value Result */}
            <M.TableCell align="center" css={style.number} colSpan={3}>
              = <span>{formatNumberWithSign(f32Value, 60)}</span>
              <When condition={Object.is(f32Value, -0)}>
                <small> (Negative Zero)</small>
              </When>
              <When condition={Object.is(f32Value, +0)}>
                <small> (Positive Zero)</small>
              </When>
              <When condition={Object.is(f32Value, NaN)}>
                <small> (Not a Number)</small>
              </When>
            </M.TableCell>
          </M.TableRow>
        </M.TableBody>
      </M.Table>

      <h2>Special Values</h2>
      <M.Table size="small">
        <M.TableHead>
          <M.TableRow>
            <M.TableCell>Name</M.TableCell>
            <M.TableCell>Value</M.TableCell>
            <M.TableCell>Binary Representation</M.TableCell>
            <M.TableCell>Set</M.TableCell>
          </M.TableRow>
        </M.TableHead>
        <M.TableBody>
          {[
            { text: 'Positive Zero', value: Float32.fromNumber(+0) },
            { text: 'Negative Zero', value: Float32.fromNumber(-0) },
            { text: 'Max Safe Integer', value: Float32.fromNumber(2 ** (Float32MaskSize.Mantissa + 1) - 1) },
            { text: 'Positive Infinity', value: Float32.fromNumber(+Infinity) },
            { text: 'Negative Infinity', value: Float32.fromNumber(-Infinity) },
            { text: 'Not a Number', value: Float32.fromNumber(NaN) }
          ].map((item, index) => (
            <M.TableRow key={index}>
              <M.TableCell>
                {item.text}
              </M.TableCell>
              <M.TableCell>
                {formatNumberWithSign(item.value.getNumber())}
              </M.TableCell>
              <M.TableCell css={{ fontFamily: 'monospace' }}>
                {!Number.isNaN(item.value.getNumber()) ? formatFloat32AsRawWithSpace(item.value) : '* 11111111 **********≠0***********' }
              </M.TableCell>
              <M.TableCell>
                <M.Button variant="outlined" size="large" onClick={() => setRaw(item.value.getRaw())}>
                  Set
                </M.Button>
              </M.TableCell>
            </M.TableRow>
          ))}
          <M.TableRow key={-1}>
            <M.TableCell>Custom Number</M.TableCell>
            <M.TableCell colSpan={2}>
              <M.TextField
                inputRef={numberInputRef}
                type="number"
                defaultValue="42"
                fullWidth
                css={css`
                  .MuiInputBase-root {
                    height: 42.25px;
                  }
                  .MuiInputBase-input {
                    text-align: center;
                    font-family: monospace;
                  }
                `}
              />
            </M.TableCell>
            {/* <M.TableCell></M.TableCell> */}
            <M.TableCell>
              <M.Button variant="outlined" size="large" onClick={() => setNumber(Number(numberInputRef.current?.value))}>
                Set
              </M.Button>
            </M.TableCell>
          </M.TableRow>
        </M.TableBody>
      </M.Table>
    </>
  )
}

export default HelloFloat32

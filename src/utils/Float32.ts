import Binary32 from './Binary32'

export default class Float32 extends Binary32 {
  static fromRaw (value: number): Float32 {
    return new Float32().setRaw(value)
  }

  static fromNumber (value: number): Float32 {
    return new Float32().setNumber(value)
  }

  clone (): Float32 {
    return new Float32().setRaw(this.getRaw())
  }

  getNumber (): number {
    return new Float32Array(this.buffer)[0]
  }

  setNumber (value: number): Float32 {
    new Float32Array(this.buffer)[0] = value
    return this
  }
}

export const Float32Mask = {
  Sign: 0b10000000000000000000000000000000,
  Exponent: 0b01111111100000000000000000000000,
  Mantissa: 0b00000000011111111111111111111111,
  All: 0b11111111111111111111111111111111
} as const

export const Float32MaskSize = {
  Sign: 1,
  Exponent: 8,
  Mantissa: 23,
  All: 32
} as const

export const Float32Offset = {
  Sign: 31,
  Exponent: 23,
  Mantissa: 0,
  All: 0
} as const

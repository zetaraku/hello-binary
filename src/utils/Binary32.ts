export default class Binary32 {
  protected buffer: ArrayBuffer

  constructor () {
    this.buffer = new ArrayBuffer(4)
  }

  getBit (index: number): 0 | 1 {
    return (new Uint32Array(this.buffer)[0] & (1 << index)) === 0 ? 0 : 1
  }

  getRaw (): number {
    return new Uint32Array(this.buffer)[0]
  }

  setBit (index: number, value: 0 | 1): this {
    new Uint32Array(this.buffer)[0] = (new Uint32Array(this.buffer)[0] & ~(1 << index)) | ((value & 1) << index)
    return this
  }

  setRaw (value: number): this {
    new Uint32Array(this.buffer)[0] = value
    return this
  }

  rawNot (): this {
    new Uint32Array(this.buffer)[0] = ~new Uint32Array(this.buffer)[0]
    return this
  }

  rawAnd (value: number): this {
    new Uint32Array(this.buffer)[0] &= value
    return this
  }

  rawOr (value: number): this {
    new Uint32Array(this.buffer)[0] |= value
    return this
  }

  rawXor (value: number): this {
    new Uint32Array(this.buffer)[0] ^= value
    return this
  }
}

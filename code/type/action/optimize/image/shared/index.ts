export type BuildCommandToOptimizeGifWithGifsicle = {
  lossy?: number
  background?: string
  left?: number
  right?: number
  top?: number
  bottom?: number
  flip?: Flip
  transparent?: string
  optimize?: GifsicleOptimizeOption
  scale?: number
  output: {
    file: {
      path: string
    }
  }
}

export type Flip = 'horizontal' | 'vertical'

export type GifsicleOptimizeOption = '1' | '2' | '3'

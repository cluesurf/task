export type SlicePdf = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  startPage: number
  endPage: number
  output: {
    file: {
      path: string
    }
  }
}
export type SlicePdfWithData = {
  input: {
    format: string
    file: {
      data: ArrayBuffer
    }
  }
  startPage: number
  endPage: number
}

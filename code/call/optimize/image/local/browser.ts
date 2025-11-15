import gifsicle from 'gifsicle-wasm-browser'

// https://www.lcdf.org/gifsicle/man.html
export async function generateGifWithGifsicle(cmd: Array<string>) {
  const newCmd = cmd.concat()
  newCmd.shift()

  return gifsicle.run({
    input: [
      {
        // file,
        // name: '1.gif',
      },
    ],
    command: [newCmd.join(' ')],
  })
}

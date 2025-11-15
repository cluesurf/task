// export async function renameFileList({
//   inputPatternList,
//   startMatch,
//   endMatch,
// }) {
//   const inputRegExp = new RegExp(startMatch, 'i')
//   const entries = fg.sync(inputPatternList, {
//     dot: true,
//     globstar: true,
//   })
//   for (let i = 0, n = entries.length; i < n; i++) {
//     const inputEntry = entries[i]
//     const outputEntry = inputEntry.replace(inputRegExp, endMatch)
//     const outputDir = path.dirname(outputEntry)
//     fs.mkdir(outputDir, { recursive: true })
//     await moveFile(inputEntry, outputEntry)
//   }
// }

// export async function moveFile(oldPath, newPath) {
//   return new Promise((res, rej) => {
//     fs.rename(oldPath, newPath, function (err) {
//       if (err) {
//         if (err.code === 'EXDEV') {
//           copy()
//         } else {
//           rej(err)
//         }
//         return
//       }
//       res()
//     })

//     function copy() {
//       var readStream = fs.createReadStream(oldPath)
//       var writeStream = fs.createWriteStream(newPath)

//       readStream.on('error', err => rej(err))
//       writeStream.on('error', err => rej(err))

//       readStream.on('close', function () {
//         fs.unlink(oldPath, () => res())
//       })

//       readStream.pipe(writeStream)
//     }
//   })
// }

export const foo = () => {}

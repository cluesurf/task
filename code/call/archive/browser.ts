import * as fflate from 'fflate'

export async function compressFileWithZlib(file: Uint8Array) {
  return new Promise((res, rej) => {
    // 6 default, 0-9
    fflate.zlib(file, { level: 9 }, (err, compressed) => {
      if (err) {
        return rej(err)
      }
      res(compressed)
    })
  })
}

export async function compressFileWithGzip(file: Uint8Array) {
  return new Promise((res, rej) => {
    // level 6 default, 0-9
    // The mem ranges from 0 to 12, where 4 is the default
    fflate.gzip(file, { level: 9 }, (err, compressed) => {
      if (err) {
        return rej(err)
      }
      res(compressed)
    })
  })
}

// const gzipped = fflate.gzipSync(massiveFile, {
//   // GZIP-specific: the filename to use when decompressed
//   filename: 'aMassiveFile.txt',
//   // GZIP-specific: the modification time. Can be a Date, date string,
//   // or Unix timestamp
//   mtime: '9/1/16 2:00 PM',
// })

export async function decompressArchive(compressed: Uint8Array) {
  return new Promise((res, rej) => {
    fflate.decompress(compressed, (err, decompressed) => {
      if (err) {
        return rej(err)
      }
      res(decompressed)
    })
  })
}

// const gzipStream = new fflate.Gzip({ level: 9 }, (chunk, isLast) => {
//   // accumulate in an inefficient binary string (just an example)
//   outStr += fflate.strFromU8(chunk, true);
// });

// // You can also attach the data handler separately if you don't want to
// // do so in the constructor.
// gzipStream.ondata = (chunk, final) => { ... }

// // Since this is synchronous, all errors will be thrown by stream.push()
// gzipStream.push(chunk1);
// gzipStream.push(chunk2);

// ...

// // You should mark the last chunk by using true in the second argument
// // In addition to being necessary for the stream to work properly, this
// // will also set the isLast parameter in the handler to true.
// gzipStream.push(lastChunk, true);

// ZIP
// const zip = new fflate.Zip((err, dat, final) => {
//   if (!err) {
//     // output of the streams
//     console.log(dat, final)
//   }
// })

// const helloTxt = new fflate.ZipDeflate('hello.txt', {
//   level: 9,
// })

// // Always add streams to ZIP archives before pushing to those streams
// zip.add(helloTxt)

// helloTxt.push(chunk1)
// // Last chunk
// helloTxt.push(chunk2, true)

// // ZipPassThrough is like ZipDeflate with level 0, but allows for tree shaking
// const nonStreamingFile = new fflate.ZipPassThrough('test.png')
// zip.add(nonStreamingFile)
// // If you have data already loaded, just .push(data, true)
// nonStreamingFile.push(pngData, true)

// // You need to call .end() after finishing
// // This ensures the ZIP is valid
// zip.end()

// Unzip object
// const unzipper = new fflate.Unzip();

// // This function will almost always have to be called. It is used to test
// // compression algorithms such as BZIP2 or LZMA in ZIP files if just DEFLATE
// // is not enough (though it almost always is).
// // If your ZIP files are not compressed, this line is not needed.
// unzipper.register(fflate.UnzipInflate);

// const neededFiles = ['file1.txt', 'example.json'];

// // Can specify handler in constructor too
// unzipper.onfile = file => {
//   // file.name is a string, file is a stream
//   if (neededFiles.includes(file.name)) {
//     file.ondata = (err, dat, final) => {
//       // Stream output here
//       console.log(dat, final);
//     };

//     console.log('Reading:', file.name);

//     // File sizes are sometimes not set if the ZIP file did not encode
//     // them, so you may want to check that file.size != undefined
//     console.log('Compressed size', file.size);
//     console.log('Decompressed size', file.originalSize);

//     // You should only start the stream if you plan to use it to improve
//     // performance. Only after starting the stream will ondata be called.
//     // This method will throw if the compression method hasn't been registered
//     file.start();
//   }
// };

// // Try to keep under 5,000 files per chunk to avoid stack limit errors
// // For example, if all files are a few kB, multi-megabyte chunks are OK
// // If files are mostly under 100 bytes, 64kB chunks are the limit
// unzipper.push(zipChunk1);
// unzipper.push(zipChunk2);
// unzipper.push(zipChunk3, true);

export async function createZip({ tree }) {
  return new Promise((res, rej) => {
    fflate.zip(
      {},
      // tree,{ f1: aMassiveFile, 'f2.txt': anotherMassiveFile }
      {
        level: 6,
      },
      (err, data) => {
        // Save the ZIP file
        if (err) {
          return rej(err)
        }
        res(data)
      },
    )
  })
}

// unzip(aMassiveZIPFile, (err, unzipped) => {
//   // If the archive has data.xml, log it here
//   console.log(unzipped['data.xml'])
//   // Conversion to string
//   console.log(strFromU8(unzipped['data.xml']))
// })

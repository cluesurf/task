import express, { Request, Response, NextFunction } from 'express'
import __dirname from '~/code/tool/shared/directory.js'
import cors from 'cors'
import kink from '~/code/tool/shared/kink.js'
import Kink from '@termsurf/kink'

const app = express()

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.static(`${__dirname}/host`))

app.get('/', (req: Request, res: Response) => {
  res.sendFile(`${__dirname}/test/test.html`)
})

app.get('/source', (req: Request, res: Response) => {
  res.sendFile(`${__dirname}/test/source-mappings.wasm`)
})

app.get('/v2/work/:id', (req: Request, res: Response) => {
  res.json({
    id: 123,
    status: 'complete',
    output: {
      file: {
        path: 'http://localhost:3000/',
      },
    },
  })
})

app.post('/v2/convert/:a/:b', (req: Request, res: Response, next) => {
  // task.convert({
  //   input: {
  //     format: String(req.params.a),
  //   },
  //   output: {
  //     format: String(req.params.b),
  //   },
  // } as any)

  if (req.params.b === 'woff') {
    setTimeout(() => {
      res.json({
        id: 123,
        status: 'error',
        output: {
          code: 456,
          note: 'Some error.',
        },
      })
    }, 2000)
  } else if (req.params.b === 'woff2') {
    req.on('close', () => {
      console.error('Closed request')
    })
    setTimeout(() => {
      next(kink('system_error', {}, 400))
    }, 2000)
  } else if (req.params.b === 'ttf') {
    setTimeout(() => {
      next(kink('system_error', {}, 400))
    }, 1000)
  } else {
    setTimeout(() => {
      res.json({
        id: 123,
        status: 'queued',
      })
    }, 2000)
  }

  // const json = JSON.stringify({
  //   test: 'test',
  // })
  // const buf = Buffer.from(json)
  // res.writeHead(200, {
  //   'Content-Type': 'application/octet-stream',
  //   'Content-disposition': 'attachment; filename=data.json',
  // })
  // res.write(buf)
  // res.end()
})

app.use(handleFail)

export default function handleFail(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('ERROR')
  console.log(err)

  if (res.headersSent) {
    return next(err)
  }

  let status
  if (err instanceof Kink && err.siteCode) {
    status = err.siteCode
  } else {
    status = 500
  }

  res.status(status).json({
    form: 'kink',
    ...err,
  })
}

app.listen(3000, () => {
  console.log(`App listening on port 3000`)
})

if (process.env.NODE_ENV === 'development') require('dotenv').config()

import express from 'express'
import next from 'next'
import { config } from 'aws-sdk'

if (!(config.region = process.env.AWS_REGION))
	throw new Error('Missing AWS region')

import routes from './routes'
import { DEV, ROOT, PORT, ORIGIN } from './lib/constants'

const app = express()

const nextApp = next({ dev: DEV, dir: ROOT })
const nextRequestHandler = nextApp.getRequestHandler()

app.set('trust proxy', 1)
app.disable('x-powered-by')

app.use(routes)
app.use((req, res) => nextRequestHandler(req, res))

const start = async () => {
	await nextApp.prepare()

	await new Promise<void>(resolve => {
		app.listen(PORT, resolve)
	})

	console.log(`Listening on ${ORIGIN}`)
}

start()

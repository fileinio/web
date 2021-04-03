if (process.env.NODE_ENV === 'development') require('dotenv').config()

import express from 'express'
import { config } from 'aws-sdk'

if (!(config.region = process.env.AWS_REGION))
	throw new Error('Missing AWS region')

import routes from './routes'
import { PORT, ORIGIN } from './lib/constants'

const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')

app.use(routes)

const start = async () => {
	await new Promise<void>(resolve => {
		app.listen(PORT, resolve)
	})

	console.log(`Listening on ${ORIGIN}`)
}

start()

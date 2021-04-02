import session from 'express-session'
import store from 'connect-dynamodb'

import config from '../lib/config'
import { DEV } from '../lib/constants'

const MAX_AGE = 1000 * 60 * 60 * 24 * 365 * 10

const secret = process.env.SESSION_SECRET
if (!secret) throw new Error('Missing session secret')

export default session({
	store: new (store(session))({
		table: 'filein.sessions',
		AWSConfigJSON: config
	}),
	secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: MAX_AGE,
		sameSite: DEV ? 'lax' : 'none',
		secure: !DEV
	}
})

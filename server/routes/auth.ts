import express, { Router } from 'express'
import rateLimit from 'express-rate-limit'

import User, { toPublicUser } from '../models/User'
import passport from '../lib/passport'
import HttpError from '../lib/error/http'
import sendError from '../lib/error/send'
import {
	assertAuthenticated,
	assertUnauthenticated
} from '../middleware/assert'

const router = Router()

router.use(passport.initialize())
router.use(passport.session())

router.get('/auth', ({ user }, res) => {
	res.json(user ? toPublicUser(user as User) : null)
})

router.post(
	'/auth/log-in',
	rateLimit({ windowMs: 60 * 60 * 1000, max: 60 }),
	assertUnauthenticated,
	express.json(),
	async (req, res, next) => {
		try {
			const user = await new Promise<User>((resolve, reject) => {
				passport.authenticate('local', (error, user: User | null) => {
					if (error) return reject(error)
					if (!user) return reject(new HttpError(404, 'No such user exists'))

					req.logIn(user, error => {
						error ? reject(error) : resolve(user)
					})
				})(req, res, next)
			})

			res.send(toPublicUser(user))
		} catch (error) {
			sendError(res, error, 401)
		}
	}
)

router.post(
	'/auth/sign-up',
	rateLimit({ windowMs: 60 * 60 * 1000, max: 10 }),
	assertUnauthenticated,
	express.json(),
	async (req, res) => {
		try {
			const { headers, body } = req

			if (
				!(
					headers['content-type'] === 'application/json' &&
					typeof body === 'object' &&
					body
				)
			)
				throw new HttpError(400, 'Invalid body')

			const { name, email, password } = body as {
				name: unknown
				email: unknown
				password: unknown
			}

			if (
				!(
					typeof name === 'string' &&
					typeof email === 'string' &&
					typeof password === 'string'
				)
			)
				throw new HttpError(400, 'Invalid body')

			// TODO: Create user
			const user: User = { name, email, password }

			await new Promise<void>((resolve, reject) => {
				req.logIn(user, error => {
					error ? reject(error) : resolve()
				})
			})

			res.send(toPublicUser(user))
		} catch (error) {
			sendError(res, error, 401)
		}
	}
)

router.post(
	'/auth/sign-out',
	rateLimit({ windowMs: 60 * 60 * 1000, max: 60 }),
	assertAuthenticated,
	(req, res) => {
		req.logOut()
		res.send()
	}
)

export default router

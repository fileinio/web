import passport from 'passport'
import { Strategy } from 'passport-local'

import User from '../models/User'

passport.use(
	new Strategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			// TODO: Resolve user
		} catch (error) {
			done(error)
		}
	})
)

passport.serializeUser((user, done) => {
	done(null, (user as User).name)
})

passport.deserializeUser(async (name: string, done) => {
	try {
		// TODO: Deserialize user
	} catch (error) {
		done(error)
	}
})

export default passport

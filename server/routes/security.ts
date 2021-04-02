import { Router } from 'express'
import { getCSP, SELF, INLINE, EVAL } from 'csp-header'

import { DEV, ORIGIN } from '../lib/constants'

const router = Router()

router.use(({ headers, url }, res, next) => {
	DEV || headers['x-forwarded-proto'] === 'https'
		? next()
		: res.redirect(301, `https://${headers.host}${url}`)
})

router.use((_req, res, next) => {
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Origin', ORIGIN)

	res.header('Expect-CT', '0')
	res.header('Referrer-Policy', 'no-referrer')
	res.header('Strict-Transport-Security', 'max-age=15552000')
	res.header('X-Content-Type-Options', 'nosniff')
	res.header('X-DNS-Prefetch-Control', 'off')
	res.header('X-Download-Options', 'noopen')
	res.header('X-Frame-Options', 'SAMEORIGIN')
	res.header('X-Permitted-Cross-Domain-Policies', 'none')
	res.header('X-XSS-Protection', '0')

	res.header(
		'Content-Security-Policy',
		getCSP({
			directives: {
				'default-src': [SELF],
				'style-src': [SELF, INLINE],
				'script-src': [
					SELF,
					...(DEV ? [EVAL] : []),
					"'sha256-Nqnn8clbgv+5l0PgxcTOldg8mkMKrFn4TvPL+rYUUGg='" // Render-blocking script
				],
				'base-uri': SELF,
				'upgrade-insecure-requests': !DEV
			}
		})
	)

	next()
})

export default router

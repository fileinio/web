import { Router } from 'express'

import security from './security'
import session from './session'
import auth from './auth'

const router = Router()

router.use(security)
router.use(session)

router.use(auth)

router.get('/', (_req, res) => {
	res.send('filein')
})

export default router

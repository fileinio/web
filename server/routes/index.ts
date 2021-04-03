import { Router } from 'express'

import security from './security'
import session from './session'
import auth from './auth'

const router = Router()

router.use(security)
router.use(session)

router.use(auth)

export default router

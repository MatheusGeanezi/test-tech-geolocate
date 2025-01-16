import { Router } from 'express'
import usersRouter from './modules/users/routes'
import regionsRouter from './modules/regions/routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/regions', regionsRouter)

export default router

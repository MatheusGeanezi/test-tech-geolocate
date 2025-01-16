import { Router } from 'express'
import usersRouter from './modules/users/routes'

const router = Router()

router.use('/users', usersRouter)
// router.use('/region', regionRouter)

export default router

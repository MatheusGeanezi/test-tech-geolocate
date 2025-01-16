import { Router } from 'express'
import { postUserController } from '../controllers/postUserController'

const usersRouter = Router()

usersRouter
.post('/', postUserController)
// .get('/', listUserController)

export default usersRouter

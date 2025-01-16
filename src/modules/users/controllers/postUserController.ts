import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { postUserService } from '../services/postUserService'

export const postUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await postUserService(req.body)
    res
      .status(200)
      .json({ message: 'Usuario adicionado', status: STATUS.CREATED })
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message, status: STATUS.BAD_REQUEST })
    } else {
      res.status(500).json({ error: 'Erro desconhecido' })
    }
  }
}

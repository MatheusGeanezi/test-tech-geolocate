import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { patchUserService } from '../services/patchUserService'

export const patchUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await patchUserService(req.body)
    res
      .status(201)
      .json({ message: 'Usuário atualizado', status: STATUS.UPDATED })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message, status: STATUS.BAD_REQUEST })
    } else {
      res.status(500).json({ error: 'Erro de Servidor' })
    }
  }
}

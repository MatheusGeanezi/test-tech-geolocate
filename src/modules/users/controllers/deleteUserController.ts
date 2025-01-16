import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { deleteUserService } from '../services/deleteUserService'

export const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id
    await deleteUserService(id)
    res.status(200).json({ message: 'Usuário removido', status: STATUS.OK })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message, status: STATUS.BAD_REQUEST })
    } else {
      res.status(500).json({ error: 'Erro de Servidor' })
    }
  }
}

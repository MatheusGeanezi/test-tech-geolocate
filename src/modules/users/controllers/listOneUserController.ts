import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { listOneUserService } from '../services/listOneUserService'

export const listOneUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id
    const response = await listOneUserService(id)
    res.status(200).json({ data: response, status: STATUS.OK })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message, status: STATUS.BAD_REQUEST })
    } else {
      res.status(500).json({ error: 'Erro desconhecido' })
    }
  }
}

import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { listUsersService } from '../services/listUsersService'

export const listUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response = await listUsersService()
    res.status(200).json({ data: response, status: STATUS.OK })
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message, status: STATUS.BAD_REQUEST })
    } else {
      res.status(500).json({
        error: 'Erro interno do servidor',
        status: STATUS.INTERNAL_SERVER_ERROR,
      })
    }
  }
}

import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { postRegionService } from '../services/postRegionService'

export const postRegionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await postRegionService(req.body)
    res
      .status(201)
      .json({ message: 'Região criada com sucesso', status: STATUS.CREATED })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message, status: STATUS.BAD_REQUEST })
    } else {
      res.status(500).json({
        error: 'Erro interno do servidor',
        status: STATUS.INTERNAL_SERVER_ERROR,
      })
    }
  }
}

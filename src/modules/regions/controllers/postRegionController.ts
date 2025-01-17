import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { postRegionService } from '../services/postRegionService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

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
    errorServiceDefault(res, error)
  }
}

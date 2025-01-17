import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { errorServiceDefault } from '../../../utils/errorServerDefault'
import { patchRegionService } from '../services/patchRegionService'

export const patchRegionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await patchRegionService(req.body)
    res
      .status(201)
      .json({ message: 'Região atualizada', status: STATUS.UPDATED })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

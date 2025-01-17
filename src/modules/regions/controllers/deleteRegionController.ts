import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { errorServiceDefault } from '../../../utils/errorServerDefault'
import { deleteRegionService } from '../services/deleteRegionService'

export const deleteRegionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id
    await deleteRegionService(id)
    res.status(200).json({ message: 'Região removida', status: STATUS.OK })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

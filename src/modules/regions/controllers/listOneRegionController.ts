import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { listOneRegionService } from '../services/listOneRegionService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

export const listOneRegionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id
    const response = await listOneRegionService(id)
    res.status(200).json({ data: response, status: STATUS.OK })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

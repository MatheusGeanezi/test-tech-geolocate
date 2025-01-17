import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import {
  IFilterRegions,
  listRegionsService,
} from '../services/listRegionsService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

export const listRegionsController = async (req: Request, res: Response) => {
  try {
    const { lat, lng, distance, excludeUser, userId } = req.query

    const regions = await listRegionsService({
      lat: parseFloat(lat as string),
      lng: parseFloat(lng as string),
      distance: distance ? parseInt(distance as string, 10) : undefined,
      excludeUser: excludeUser === 'true',
      userId,
    } as IFilterRegions)

    res.status(200).json({ data: regions, status: STATUS.OK })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

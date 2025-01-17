import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import {
  IFilterRegions,
  listRegionsService,
} from '../services/listRegionsService'

export const listRegionsController = async (req: Request, res: Response) => {
  try {
    const { lat, lng, distance, excludeUser, userId } = req.query

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Parâmetros lat e lng são obrigatórios',
        status: STATUS.BAD_REQUEST,
      })
    }

    const regions = await listRegionsService({
      lat: parseFloat(lat as string),
      lng: parseFloat(lng as string),
      distance: distance ? parseInt(distance as string, 10) : undefined,
      excludeUser: excludeUser === 'true',
      userId,
    } as IFilterRegions)

    res.status(200).json({ data: regions, status: STATUS.OK })
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      status: STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

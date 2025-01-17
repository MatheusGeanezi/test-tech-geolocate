import { Types } from 'mongoose'
import { listRegionsRepository } from '../repository/listRegionsRepository'

export interface IFilterRegions {
  lat: number
  lng: number
  distance?: number
  excludeUser?: boolean
  userId?: string
}

export const listRegionsService = async ({
  lat,
  lng,
  distance,
  excludeUser,
  userId,
}: IFilterRegions) => {
  if (!lat || !lng) {
    throw new Error('Parâmetros lat e lng são obrigatórios')
  }

  const point = {
    type: 'Point',
    coordinates: [parseFloat(lng.toString()), parseFloat(lat.toString())],
  }

  const query: any = {}

  if (!distance) {
    query.geometry = { $geoIntersects: { $geometry: point } }
  }

  if (distance) {
    query.geometry = {
      $near: {
        $geometry: point,
        $maxDistance: distance,
      },
    }
  }

  if (!excludeUser) {
    query.userId = new Types.ObjectId(userId)
  }

  return await listRegionsRepository(query)
}

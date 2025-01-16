import { Types } from 'mongoose'
import { IRegion } from '../schema/regionsSchema'
import { listOneRegionRepository } from '../repository/listOneRegionRepository'

export const listOneRegionService = async (id: string): Promise<IRegion> => {
  const findRegion = await listOneRegionRepository({
    _id: new Types.ObjectId(id),
  })

  if (!findRegion) {
    throw new Error('Região não encontrada')
  }

  return findRegion
}

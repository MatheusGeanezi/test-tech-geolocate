import { Types } from 'mongoose'
import { listOneRegionRepository } from '../repository/listOneRegionRepository'
import { deleteRegionRepository } from '../repository/deleteRegionRepository'

export const deleteRegionService = async (id: string): Promise<void> => {
  const exists = await listOneRegionRepository({
    _id: new Types.ObjectId(id),
  })

  if (!exists) {
    throw new Error('Região não encontrada')
  }

  await deleteRegionRepository({ _id: new Types.ObjectId(exists._id) })
}

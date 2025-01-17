import { Types } from 'mongoose'
import { IRegion } from '../schema/regionsSchema'
import { listOneUserRepository } from '../../users/repository/listOneUserRepository'
import { patchRegionRepository } from '../repository/patchRegionRepository'
import { listOneRegionRepository } from '../repository/listOneRegionRepository'

export const patchRegionService = async (
  body: Partial<IRegion>,
): Promise<void> => {
  const { name, geometry, userId, _id } = body

  if (!_id) {
    throw new Error('O ID da região é obrigatório')
  }

  const region = await listOneRegionRepository({
    _id: new Types.ObjectId(_id),
  })

  if (!region) {
    throw new Error('Região não encontrada')
  }

  if (userId) {
    const user = await listOneUserRepository({
      _id: new Types.ObjectId(userId),
    })
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
  }
  if (geometry) {
    if (geometry.type !== 'Polygon' || !Array.isArray(geometry.coordinates)) {
      throw new Error('A região deve ser um polígono válido')
    }
  }

  const updateData: Partial<IRegion> = {}

  if (name) updateData.name = name
  if (geometry) updateData.geometry = geometry
  if (userId) updateData.userId = new Types.ObjectId(userId)

  await patchRegionRepository({ _id }, updateData)
}

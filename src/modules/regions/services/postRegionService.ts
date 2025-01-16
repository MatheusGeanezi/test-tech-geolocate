import { Types } from 'mongoose'
import { IRegion } from '../schema/regionsSchema'
import { listOneUserRepository } from '../../users/repository/listOneUserRepository'
import { postRegionRepository } from '../repository/postRegionRepository'

export const postRegionService = async (body: IRegion): Promise<void> => {
  const { name, geometry, userId } = body

  if (!name) {
    throw new Error('O nome da região é obrigatório')
  }

  if (
    !geometry ||
    geometry.type !== 'Polygon' ||
    !Array.isArray(geometry.coordinates)
  ) {
    throw new Error('A região deve ser um polígono válido')
  }

  const user = await listOneUserRepository({ _id: new Types.ObjectId(userId) })
  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  await postRegionRepository({
    name,
    geometry,
    userId: new Types.ObjectId(userId),
  } as IRegion)
}

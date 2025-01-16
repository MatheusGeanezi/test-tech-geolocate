import { deleteUserRepository } from '../repository/deleteUserRepository'
import { listOneUserRepository } from '../repository/listOneUserRepository'
import { Types } from 'mongoose'

export const deleteUserService = async (id: string): Promise<void> => {
  const exists = await listOneUserRepository({
    _id: new Types.ObjectId(id),
  })

  if (!exists) {
    throw new Error('Usuário não encontrado')
  }

  await deleteUserRepository({ _id: new Types.ObjectId(exists._id) })
}

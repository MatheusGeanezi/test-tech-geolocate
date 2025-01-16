import { listOneUserRepository } from '../repository/listOneUserRepository'
import { IUsers } from '../schema/usersSchema'
import { Types } from 'mongoose'

export const listOneUserService = async (id: string): Promise<IUsers> => {
  const findUser = await listOneUserRepository({ _id: new Types.ObjectId(id) })

  if (!findUser) {
    throw new Error('Usuário não encontrado')
  }

  return findUser
}

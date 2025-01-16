import { listUsersRepository } from '../repository/listUsersRepository'
import { IUsers } from '../schema/usersSchema'

export const listUsersService = async (): Promise<IUsers[]> => {
  return await listUsersRepository()
}

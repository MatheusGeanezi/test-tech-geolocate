import Users from '../schema/usersSchema'
import { Ifilter } from './listOneUserRepository'

export const deleteUserRepository = async (filter: Ifilter): Promise<void> => {
  await Users.deleteOne(filter)
}

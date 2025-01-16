import Users, { IUsers } from '../schema/usersSchema'

export const listUsersRepository = async (): Promise<IUsers[]> => {
  return await Users.find().lean()
}

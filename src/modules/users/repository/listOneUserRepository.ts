import Users, { IUsers } from '../schema/usersSchema'

export const listOneUserRepository = async (
  filter: object,
): Promise<IUsers | null> => {
  return await Users.findOne(filter).lean()
}

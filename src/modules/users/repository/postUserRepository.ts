import Users, { IUsers } from '../schema/usersSchema'

export const postUserRepository = async (record: IUsers): Promise<void> => {
  await Users.create(record)
}

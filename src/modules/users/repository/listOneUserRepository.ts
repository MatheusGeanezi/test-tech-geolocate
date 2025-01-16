import { Types } from 'mongoose'
import Users, { IUsers } from '../schema/usersSchema'

export interface Ifilter {
  _id: Types.ObjectId
}

export const listOneUserRepository = async (
  filter: Ifilter,
): Promise<IUsers | null> => {
  return await Users.findOne(filter).lean()
}

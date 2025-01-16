import { UpdateWithAggregationPipeline, UpdateQuery } from 'mongoose'
import Users, { IUsers } from '../schema/usersSchema'
import { Ifilter } from './listOneUserRepository'

export const patchUserRepository = async (
  filter: Ifilter,
  updatedData: UpdateWithAggregationPipeline | UpdateQuery<IUsers> | undefined,
): Promise<void> => {
  await Users.updateOne(filter, { $set: updatedData })
}

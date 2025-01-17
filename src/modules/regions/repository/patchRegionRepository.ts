import { Types, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import Regions, { IRegion } from '../schema/regionsSchema'

export interface Ifilter {
  _id: Types.ObjectId
}
export const patchRegionRepository = async (
  filter: Ifilter,
  updatedData: UpdateWithAggregationPipeline | UpdateQuery<IRegion> | undefined,
): Promise<void> => {
  await Regions.updateOne(filter, { $set: updatedData })
}

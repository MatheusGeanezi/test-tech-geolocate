import { Types } from 'mongoose'
import Regions, { IRegion } from '../schema/regionsSchema'

export interface Ifilter {
  _id: Types.ObjectId
}

export const listOneRegionRepository = async (
  filter: Ifilter,
): Promise<IRegion | null> => {
  return await Regions.findOne(filter).lean()
}

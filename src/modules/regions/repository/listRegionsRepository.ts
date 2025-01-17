import { Types } from 'mongoose'
import Regions, { IRegion } from '../schema/regionsSchema'
import { IFilterRegions } from '../services/listRegionsService'

export const listRegionsRepository = async (
  filter: IFilterRegions,
): Promise<IRegion | null> => {
  return await Regions.find(filter).lean()
}

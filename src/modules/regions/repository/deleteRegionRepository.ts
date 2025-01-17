import Regions from '../schema/regionsSchema'
import { Ifilter } from './listOneRegionRepository'

export const deleteRegionRepository = async (
  filter: Ifilter,
): Promise<void> => {
  await Regions.deleteOne(filter)
}

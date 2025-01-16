import Region, { IRegion } from '../schema/regionsSchema'

export const postRegionRepository = async (record: IRegion): Promise<void> => {
  await Region.create(record)
}

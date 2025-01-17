import { Types } from 'mongoose'
import { listRegionsRepository } from '../../repository/listRegionsRepository'
import { listRegionsService } from '../../services/listRegionsService'

jest.mock('../../repository/listRegionsRepository')

const mockedListRegionsRepository = listRegionsRepository as jest.Mock

const makesut = (params: any) => {
  return listRegionsService(params)
}

describe('listRegionsService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call listRegionsRepository with correct parameters when no distance is provided', async () => {
    const params = {
      lat: -23.55052,
      lng: -46.633308,
      distance: undefined,
      excludeUser: false,
      userId: '6788fbaff71308ab57b734cc',
    }

    const expectedQuery = {
      geometry: {
        $geoIntersects: {
          $geometry: { type: 'Point', coordinates: [-46.633308, -23.55052] },
        },
      },
      userId: new Types.ObjectId('6788fbaff71308ab57b734cc'),
    }

    mockedListRegionsRepository.mockResolvedValue([])

    const result = await makesut(params)

    expect(mockedListRegionsRepository).toHaveBeenCalledWith(expectedQuery)
    expect(result).toEqual([])
  })

  it('should call listRegionsRepository with correct parameters when distance is provided', async () => {
    const params = {
      lat: -23.55052,
      lng: -46.633308,
      distance: 5000,
      excludeUser: false,
      userId: '6788fbaff71308ab57b734cc',
    }

    const expectedQuery = {
      geometry: {
        $near: {
          $geometry: { type: 'Point', coordinates: [-46.633308, -23.55052] },
          $maxDistance: 5000,
        },
      },
      userId: new Types.ObjectId('6788fbaff71308ab57b734cc'),
    }

    mockedListRegionsRepository.mockResolvedValue([])

    const result = await makesut(params)

    expect(mockedListRegionsRepository).toHaveBeenCalledWith(expectedQuery)
    expect(result).toEqual([])
  })

  it('should not include userId in query when excludeUser is true', async () => {
    const params = {
      lat: -23.55052,
      lng: -46.633308,
      distance: 5000,
      excludeUser: true,
      userId: '6788fbaff71308ab57b734cc',
    }

    const expectedQuery = {
      geometry: {
        $near: {
          $geometry: { type: 'Point', coordinates: [-46.633308, -23.55052] },
          $maxDistance: 5000,
        },
      },
    }

    mockedListRegionsRepository.mockResolvedValue([])

    const result = await makesut(params)

    expect(mockedListRegionsRepository).toHaveBeenCalledWith(expectedQuery)
    expect(result).toEqual([])
  })
})

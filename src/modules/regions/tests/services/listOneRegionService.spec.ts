import { Types } from 'mongoose'
import { listOneRegionRepository } from '../../repository/listOneRegionRepository'
import { listOneRegionService } from '../../services/listOneRegionService'

jest.mock('../../repository/listOneRegionRepository')

const mockedListOneRegionRepository = listOneRegionRepository as jest.Mock

const makesut = (id: string) => {
  return listOneRegionService(id)
}

describe('listOneRegionService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return error when the region is not found', async () => {
    mockedListOneRegionRepository.mockResolvedValue(null)

    expect(makesut('6788ec32e99bc78bcee76417')).rejects.toThrow(
      'Região não encontrada',
    )
  })

  it('should return a region when the region is found', async () => {
    const mockUser = {
      _id: '678961fc00acde1cd2def175',
      name: 'São Paulo',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.633308, -23.55052],
            [-46.629308, -23.54852],
            [-46.624308, -23.55252],
            [-46.633308, -23.55052],
          ],
        ],
      },
      userId: '6788fbaff71308ab57b734cc',
    }

    mockedListOneRegionRepository.mockResolvedValue(mockUser)

    const user = await makesut('678961fc00acde1cd2def175')

    expect(mockedListOneRegionRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId('678961fc00acde1cd2def175'),
    })

    expect(user).toEqual(mockUser)
  })
})

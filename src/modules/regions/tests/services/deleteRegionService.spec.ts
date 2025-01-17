import { Types } from 'mongoose'
import { deleteRegionService } from '../../services/deleteRegionService'
import { listOneRegionRepository } from '../../repository/listOneRegionRepository'
import { deleteRegionRepository } from '../../repository/deleteRegionRepository'

jest.mock('../../repository/listOneRegionRepository')
jest.mock('../../repository/deleteRegionRepository')

const mockedListOneRegionRepository = listOneRegionRepository as jest.Mock
const mockedDeleteRegionRepository = deleteRegionRepository as jest.Mock

const makesut = (id: string) => {
  return deleteRegionService(id)
}

describe('deleteRegionService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error when the region is not found', async () => {
    mockedListOneRegionRepository.mockResolvedValue(null)

    await expect(makesut('6788ec32e99bc78bcee76417')).rejects.toThrow(
      'Região não encontrada',
    )
  })

  it('should delete the region when it exists', async () => {
    const mockRegion = {
      _id: new Types.ObjectId('6788ec32e99bc78bcee76417'),
      name: 'Mock Region',
      geometry: { type: 'Polygon', coordinates: [] },
    }

    mockedListOneRegionRepository.mockResolvedValue(mockRegion)
    mockedDeleteRegionRepository.mockResolvedValue(undefined)

    await expect(makesut('6788ec32e99bc78bcee76417')).resolves.not.toThrow()

    expect(mockedListOneRegionRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId('6788ec32e99bc78bcee76417'),
    })

    expect(mockedDeleteRegionRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId('6788ec32e99bc78bcee76417'),
    })
  })
})

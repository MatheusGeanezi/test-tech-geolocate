import { listOneUserRepository } from '../../../users/repository/listOneUserRepository'
import { listOneRegionRepository } from '../../repository/listOneRegionRepository'
import { patchRegionRepository } from '../../repository/patchRegionRepository'
import { patchRegionService } from '../../services/patchRegionService'
import { Types } from 'mongoose'

jest.mock('../../repository/listOneRegionRepository')
jest.mock('../../repository/patchRegionRepository')
jest.mock('../../../users/repository/listOneUserRepository')

const mockedPatchRegionRepository = patchRegionRepository as jest.Mock
const mockedListOneUserRepository = listOneUserRepository as jest.Mock
const mockedListOneRegionRepository = listOneRegionRepository as jest.Mock

const makesut = (body: any) => {
  return patchRegionService(body)
}

describe('patchRegionService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update the region successfully when valid data is provided', async () => {
    const regionData = {
      _id: '64b2f6d8a2f4cabc12345678',
      name: 'Updated Region',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [123.45, 67.89],
          [123.46, 67.88],
          [123.47, 67.87],
        ],
      },
      userId: '64b2e6d8a2f4cabc12345678',
    }
    mockedListOneRegionRepository.mockResolvedValueOnce(true)
    mockedListOneUserRepository.mockResolvedValueOnce({
      _id: regionData.userId,
    })

    mockedPatchRegionRepository.mockResolvedValueOnce(undefined)

    await makesut(regionData)

    expect(mockedListOneUserRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId(regionData.userId),
    })
    expect(mockedPatchRegionRepository).toHaveBeenCalledWith(
      { _id: regionData._id },
      {
        name: regionData.name,
        geometry: regionData.geometry,
        userId: new Types.ObjectId(regionData.userId),
      },
    )
    expect(mockedListOneUserRepository).toHaveBeenCalledTimes(1)
    expect(mockedPatchRegionRepository).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if the region is not found', async () => {
    const regionData = {
      _id: '64b2f6d8a2f4cabc12345678',
      name: 'Updated Region',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [123.45, 67.89],
          [123.46, 67.88],
          [123.47, 67.87],
        ],
      },
      userId: '64b2e6d8a2f4cabc12345678',
    }
    mockedListOneRegionRepository.mockResolvedValueOnce(false)

    await expect(makesut(regionData)).rejects.toThrow('Região não encontrada')
  })

  it('should throw an error if the user is not found', async () => {
    const regionData = {
      _id: '64b2f6d8a2f4cabc12345678',
      name: 'Updated Region',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [123.45, 67.89],
          [123.46, 67.88],
          [123.47, 67.87],
        ],
      },
      userId: '64b2e6d8a2f4cabc12345678',
    }
    mockedListOneRegionRepository.mockResolvedValueOnce(true)
    mockedListOneUserRepository.mockResolvedValueOnce(null)

    await expect(makesut(regionData)).rejects.toThrow('Usuário não encontrado')
  })

  it('should throw an error if the region geometry is invalid', async () => {
    const regionData = {
      _id: '64b2f6d8a2f4cabc12345678',
      name: 'Updated Region',
      geometry: { type: 'Point', coordinates: [123.45, 67.89] },
      userId: '64b2e6d8a2f4cabc12345678',
    }
    mockedListOneRegionRepository.mockResolvedValueOnce(true)
    mockedListOneUserRepository.mockResolvedValueOnce(true)

    await expect(makesut(regionData)).rejects.toThrow(
      'A região deve ser um polígono válido',
    )
  })
})

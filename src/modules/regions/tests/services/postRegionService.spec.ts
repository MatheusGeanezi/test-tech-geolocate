import { postRegionService } from '../../services/postRegionService'

import { postRegionRepository } from '../../repository/postRegionRepository'
import { Types } from 'mongoose'
import { IRegion } from '../../schema/regionsSchema'
import { listOneUserRepository } from '../../../users/repository/listOneUserRepository'

jest.mock('../../../users/repository/listOneUserRepository')
jest.mock('../../repository/postRegionRepository')

const mockedListOneUserRepository = listOneUserRepository as jest.Mock
const mockedPostRegionRepository = postRegionRepository as jest.Mock

const makesut = (body: any) => {
  return postRegionService(body)
}

describe('postRegionService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should throw an error if name is missing', async () => {
    const regionData = {
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
      userId: '64f2c5e2b12345678a9bcdef',
    } as any

    await expect(makesut(regionData)).rejects.toThrow(
      'O nome da região é obrigatório',
    )
  })

  it('Should throw an error if geometry is invalid', async () => {
    const regionData = {
      name: 'Região Centro',
      geometry: {
        type: 'InvalidType',
        coordinates: null,
      },
      userId: '64f2c5e2b12345678a9bcdef',
    } as unknown as IRegion

    await expect(makesut(regionData)).rejects.toThrow(
      'A região deve ser um polígono válido',
    )
  })

  it('Should throw an error if user is not found', async () => {
    mockedListOneUserRepository.mockResolvedValueOnce(null)

    const regionData = {
      name: 'Região Centro',
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
      userId: '64f2c5e2b12345678a9bcdef',
    } as any

    await expect(makesut(regionData)).rejects.toThrow('Usuário não encontrado')
  })

  it('Should call postRegionRepository with the correct data', async () => {
    mockedListOneUserRepository.mockResolvedValueOnce({
      _id: '64f2c5e2b12345678a9bcdef',
    })

    const regionData = {
      name: 'Região Centro',
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
      userId: '64f2c5e2b12345678a9bcdef',
    } as any

    await makesut(regionData)

    expect(mockedPostRegionRepository).toHaveBeenCalledWith({
      name: regionData.name,
      geometry: regionData.geometry,
      userId: new Types.ObjectId(regionData.userId),
    })
  })
})

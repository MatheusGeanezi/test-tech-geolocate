import { geoLocateCoordToAdress } from '../../../../utils/geoLocate'
import { listOneUserRepository } from '../../repository/listOneUserRepository'
import { patchUserRepository } from '../../repository/patchUserRepository'
import { IUsers } from '../../schema/usersSchema'
import { patchUserService } from '../../services/patchUserService'
import { Types } from 'mongoose'

jest.mock('../../repository/listOneUserRepository')
jest.mock('../../repository/patchUserRepository')
jest.mock('../../../../utils/geoLocate')

const mockedGeoLocateCoordToAdress = geoLocateCoordToAdress as jest.Mock
const mockedListOneUserRepository = listOneUserRepository as jest.Mock
const mockedPatchUserRepository = patchUserRepository as jest.Mock

const makesut = (body: Partial<IUsers>) => {
  return patchUserService(body)
}
describe('patchUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw error if ID not exists in req.body', async () => {
    const mockBody = {
      coordinates: {
        lat: -22.8773349,
        lng: -47.06083,
      },
    }

    await expect(makesut(mockBody)).rejects.toThrow(
      'ID do usuário é obrigatório',
    )
  })

  it('should throw error if users not exists', async () => {
    const mockBody = {
      _id: new Types.ObjectId('6788ec32e99bc78bcee76420'),
      coordinates: {
        lat: -22.8773349,
        lng: -47.06083,
      },
    }

    mockedListOneUserRepository.mockResolvedValue(null)

    await expect(makesut(mockBody)).rejects.toThrow('Usuário não encontrado')
  })

  it('should throw only name and email', async () => {
    const mockBody: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Updated User',
      email: 'updateduser@example.com',
    }
    const mockUser: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Existing User',
      email: 'existinguser@example.com',
      address: 'Address, 456',
      coordinates: { lat: 12.34, lng: 56.78 },
    }
    mockedListOneUserRepository.mockResolvedValue(mockUser)
    mockedPatchUserRepository.mockResolvedValue(null)

    await makesut(mockBody)

    expect(mockedListOneUserRepository).toHaveBeenCalledWith({
      _id: expect.any(Object),
    })
    expect(mockedPatchUserRepository).toHaveBeenCalledWith(
      { _id: mockBody._id },
      expect.objectContaining({
        name: mockBody.name,
        email: mockBody.email,
        address: mockUser.address,
        coordinates: mockUser.coordinates,
      }),
    )
  })

  it('should update address and coordinate if have address', async () => {
    const mockBody: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Updated User',
      email: 'updateduser@example.com',
      address: 'new Address, 456',
    }
    const mockUser: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Existing User',
      email: 'existinguser@example.com',
      address: 'Address, 456',
      coordinates: { lat: 12.34, lng: 56.78 },
    }

    mockedListOneUserRepository.mockResolvedValue(mockUser)
    mockedGeoLocateCoordToAdress.mockResolvedValue({
      address: 'new Address, 456',
      geometry: { lat: 90.12, lng: 34.56 },
    })
    mockedPatchUserRepository.mockResolvedValue(null)

    mockBody.coordinates = undefined

    await makesut(mockBody)

    expect(mockedGeoLocateCoordToAdress).toHaveBeenCalledWith(mockBody.address)
    expect(mockedPatchUserRepository).toHaveBeenCalledWith(
      { _id: mockBody._id },
      expect.objectContaining({
        name: mockBody.name,
        email: mockBody.email,
        address: 'new Address, 456',
        coordinates: { lat: 90.12, lng: 34.56 },
      }),
    )
  })

  it('should update address and coordinate if have coordinates', async () => {
    const mockBody: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Updated User',
      email: 'updateduser@example.com',
      coordinates: { lat: 12.35, lng: 56.79 },
    }
    const mockUser: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Existing User',
      email: 'existinguser@example.com',
      address: 'Address, 456',
      coordinates: { lat: 12.34, lng: 56.78 },
    }

    mockedListOneUserRepository.mockResolvedValue(mockUser)
    mockedGeoLocateCoordToAdress.mockResolvedValue({
      address: 'new Address, 456',
      geometry: { lat: 12.35, lng: 56.79 },
    })
    mockedPatchUserRepository.mockResolvedValue(null)

    await makesut(mockBody)

    expect(mockedPatchUserRepository).toHaveBeenCalledWith(
      { _id: mockBody._id },
      expect.objectContaining({
        name: mockBody.name,
        email: mockBody.email,
        address: 'new Address, 456',
        coordinates: { lat: 12.35, lng: 56.79 },
      }),
    )
  })

  it('should throw error have address and coord', async () => {
    const mockBody: any = {
      _id: '6471d4f09b2e4c1b8c11c87a',
      name: 'Existing User',
      email: 'existinguser@example.com',
      address: 'Address, 456',
      coordinates: { lat: 12.34, lng: 56.78 },
    }
    await expect(makesut(mockBody)).rejects.toThrow(
      'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
    )
  })
})

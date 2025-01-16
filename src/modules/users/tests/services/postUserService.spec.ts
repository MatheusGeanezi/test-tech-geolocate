import { geoLocateCoordToAdress } from '../../../../utils/geoLocate'
import { postUserRepository } from '../../repository/postUserRepository'
import { IUsers } from '../../schema/usersSchema'
import { postUserService } from '../../services/postUserService'

jest.mock('../../../../utils/geoLocate')
jest.mock('../../repository/postUserRepository')

const mockedGeoLocateCoordToAdress = geoLocateCoordToAdress as jest.Mock
const mockedPostUserRepository = postUserRepository as jest.Mock

const makesut = (body: IUsers) => {
  return postUserService(body)
}

describe('postUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should throw an error if name or email is missing', async () => {
    const userData = {
      address: 'barão de itapura 800,campinas',
    } as IUsers

    await expect(makesut(userData)).rejects.toThrow(
      'Nome e email são obrigatórios',
    )
  })

  it('Should throw an error if both address and coordinates are provided', async () => {
    const userData = {
      name: 'roberto',
      email: 'roberto@email.com',
      address: 'barão de itapura 800,campinas',
      coordinates: { lat: -23.558588, lng: -46.661511 },
    } as IUsers

    await expect(makesut(userData)).rejects.toThrow(
      'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
    )
  })

  it('Should throw an error if neither address nor coordinates are provided', async () => {
    const userData = {
      name: 'roberto',
      email: 'roberto@email.com',
    } as IUsers

    await expect(makesut(userData)).rejects.toThrow(
      'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
    )
  })

  it('Should create a user using address', async () => {
    const userData = {
      name: 'roberto',
      email: 'roberto@email.com',
      address: 'barão de itapura 800,campinas',
    } as IUsers
    mockedGeoLocateCoordToAdress.mockResolvedValue({
      address:
        'Alameda Santos 2209, Jardim Paulista, São Paulo - SP, 01419-101, Brazil',
      geometry: { lat: -23.558588, lng: -46.661511 },
    })
    mockedPostUserRepository.mockResolvedValue(null)

    await expect(makesut(userData)).resolves.toBeUndefined()
  })

  it('Should create a user using coordenates', async () => {
    const userData = {
      name: 'roberto',
      email: 'roberto@email.com',
      coordinates: { lat: -23.558588, lng: -46.661511 },
    } as IUsers
    mockedGeoLocateCoordToAdress.mockResolvedValue({
      address:
        'Alameda Santos 2209, Jardim Paulista, São Paulo - SP, 01419-101, Brazil',
      geometry: { lat: -23.558588, lng: -46.661511 },
    })
    mockedPostUserRepository.mockResolvedValue(null)

    await expect(makesut(userData)).resolves.toBeUndefined()
  })
})

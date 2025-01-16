import { listUsersRepository } from '../../repository/listUsersRepository'
import { listUsersService } from '../../services/listUsersService'

jest.mock('../../repository/listUsersRepository')

const mockedListUsersRepository = listUsersRepository as jest.Mock

const makesut = () => {
  return listUsersService()
}

describe('listUsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return a list of users', async () => {
    const mockUsers: any[] = [
      {
        name: 'joão',
        email: 'joão@example.com',
        address: 'rua faria lima, são paulo',
        coordinates: { lat: 123.45, lng: 67.89 },
      },
    ]

    mockedListUsersRepository.mockResolvedValue(mockUsers)

    const result = await makesut()
    expect(result).toEqual(mockUsers)
    expect(mockedListUsersRepository).toHaveBeenCalledTimes(1)
  })
})

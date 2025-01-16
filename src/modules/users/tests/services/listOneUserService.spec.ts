import { Types } from 'mongoose'
import { listOneUserRepository } from '../../repository/listOneUserRepository'
import { listOneUserService } from '../../services/listOneUserService'

jest.mock('../../repository/listOneUserRepository')

const mockedListOneUserRepository = listOneUserRepository as jest.Mock

const makesut = (id: string) => {
  return listOneUserService(id)
}

describe('listOneUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return error when the user is not found', async () => {
    mockedListOneUserRepository.mockResolvedValue(null)

    expect(makesut('6788ec32e99bc78bcee76417')).rejects.toThrow(
      'Usuário não encontrado',
    )
  })

  it('should return a user when the user is found', async () => {
    const mockUser = {
      _id: '6788ec32e99bc78bcee76417',
      name: 'João',
      email: 'joao@example.com',
    }

    mockedListOneUserRepository.mockResolvedValue(mockUser)

    const user = await makesut('6788ec32e99bc78bcee76417')

    expect(mockedListOneUserRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId('6788ec32e99bc78bcee76417'),
    })

    expect(user).toEqual(mockUser)
  })
})

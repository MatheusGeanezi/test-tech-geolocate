import { Types } from 'mongoose'
import { deleteUserService } from '../../services/deleteUserService'
import { listOneUserRepository } from '../../repository/listOneUserRepository'
import { deleteUserRepository } from '../../repository/deleteUserRepository'

jest.mock('../../repository/listOneUserRepository')
jest.mock('../../repository/deleteUserRepository')

const mockedListOneUserRepository = listOneUserRepository as jest.Mock
const mockedDeleteUserRepository = deleteUserRepository as jest.Mock

const makesut = (id: string) => {
  return deleteUserService(id)
}

describe('deleteUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error when the user is not found', async () => {
    mockedListOneUserRepository.mockResolvedValue(null)

    await expect(makesut('6788ec32e99bc78bcee76417')).rejects.toThrow(
      'Usuário não encontrado',
    )
  })

  it('should delete the user when it exists', async () => {
    mockedListOneUserRepository.mockResolvedValue({
      _id: '6788ec32e99bc78bcee76417',
    })
    mockedDeleteUserRepository.mockResolvedValue(undefined)

    await expect(makesut('6788ec32e99bc78bcee76417')).resolves.not.toThrow()

    expect(mockedListOneUserRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId('6788ec32e99bc78bcee76417'),
    })

    expect(mockedDeleteUserRepository).toHaveBeenCalledWith({
      _id: new Types.ObjectId('6788ec32e99bc78bcee76417'),
    })
  })
})

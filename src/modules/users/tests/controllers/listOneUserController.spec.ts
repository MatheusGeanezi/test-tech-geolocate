import { Request, Response } from 'express'
import { listOneUserService } from '../../services/listOneUserService'
import { listOneUserController } from '../../controllers/listOneUserController'

jest.mock('../../services/listOneUserService')

const mockedListOneUserService = listOneUserService as jest.Mock

const mockRequest = (): Partial<Request> => ({
  params: { id: 'id' },
})

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('listUsersController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return a 409 if user not exists', async () => {
    mockedListOneUserService.mockRejectedValue(
      new Error('Usuário não encontrado'),
    )
    const req = mockRequest() as Request
    const res = mockResponse() as Response

    await listOneUserController(req, res)

    expect(mockedListOneUserService).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Usuário não encontrado',
      status: 400,
    })
  })

  it('Should return one user with status 200', async () => {
    const mockUser = {
      name: 'joão',
      email: 'joão@example.com',
      address: 'rua faria lima, são paulo',
      coordinates: { lat: 123.45, lng: 67.89 },
    }

    mockedListOneUserService.mockResolvedValue(mockUser)

    const req = mockRequest() as Request
    const res = mockResponse() as Response

    await listOneUserController(req, res)

    expect(mockedListOneUserService).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      data: mockUser,
      status: 200,
    })
  })
})

import { Request, Response } from 'express'
import { listUsersService } from '../../services/listUsersService'
import { listUsersController } from '../../controllers/listUsersController'

jest.mock('../../services/listUsersService')

const mockedListUsersService = listUsersService as jest.Mock

const mockRequest = (): Partial<Request> => ({
  body: {},
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

  it('Should return a list of users with status 200', async () => {
    const mockUsers: any[] = [
      {
        name: 'joão',
        email: 'joão@example.com',
        address: 'rua faria lima, são paulo',
        coordinates: { lat: 123.45, lng: 67.89 },
      },
    ]

    mockedListUsersService.mockResolvedValue(mockUsers)

    const req = mockRequest() as Request
    const res = mockResponse() as Response

    await listUsersController(req, res)

    expect(mockedListUsersService).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      data: mockUsers,
      status: 200,
    })
  })
})

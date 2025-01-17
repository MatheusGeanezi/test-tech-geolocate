import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { listUsersController } from '../../controllers/listUsersController'
import { listUsersService } from '../../services/listUsersService'

jest.mock('../../services/listUsersService')

const mockedListUsersService = listUsersService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())

app.get('/users', listUsersController)

describe('listUsersController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return a list of users with status 200', async () => {
    const mockUsers = [
      {
        name: 'joão',
        email: 'joão@example.com',
        address: 'rua faria lima, são paulo',
        coordinates: { lat: 123.45, lng: 67.89 },
      },
    ]

    mockedListUsersService.mockResolvedValue(mockUsers)

    const response = await request(app).get('/users')

    expect(mockedListUsersService).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: mockUsers,
      status: 200,
    })
  })
})

import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { listOneUserController } from '../../controllers/listOneUserController'
import { listOneUserService } from '../../services/listOneUserService'

jest.mock('../../services/listOneUserService')

const mockedListOneUserService = listOneUserService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())

app.get('/users/:id', listOneUserController)

describe('listOneUserController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 400 if the user does not exist', async () => {
    mockedListOneUserService.mockRejectedValue(
      new Error('Usuário não encontrado'),
    )

    const response = await request(app).get('/users/id')

    expect(mockedListOneUserService).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
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

    const response = await request(app).get('/users/id')

    expect(mockedListOneUserService).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: mockUser,
      status: 200,
    })
  })
})

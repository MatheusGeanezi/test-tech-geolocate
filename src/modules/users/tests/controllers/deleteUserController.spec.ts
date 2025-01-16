import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { deleteUserController } from '../../controllers/deleteUserController'
import { deleteUserService } from '../../services/deleteUserService'

jest.mock('../../services/deleteUserService')

const mockedDeleteUserService = deleteUserService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.delete('/users/:id', deleteUserController)

describe('deleteUserController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 200 when user is successfully deleted', async () => {
    mockedDeleteUserService.mockResolvedValue(null)

    const response = await request(app).delete('/users/123').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Usuário removido',
      status: 200,
    })
  })

  it('Should return 400 if user is not found', async () => {
    mockedDeleteUserService.mockRejectedValue(
      new Error('Usuário não encontrado'),
    )

    const response = await request(app).delete('/users/123').send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Usuário não encontrado',
      status: 400,
    })
  })
})

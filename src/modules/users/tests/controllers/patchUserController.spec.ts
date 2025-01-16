import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { patchUserController } from '../../controllers/patchUserController'
import { patchUserService } from '../../services/patchUserService'

jest.mock('../../services/patchUserService')

const mockedPatchUserService = patchUserService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.patch('/users', patchUserController)

describe('patchUserController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 201 when user is successfully updated', async () => {
    mockedPatchUserService.mockResolvedValue(null)

    const response = await request(app).patch('/users').send({
      _id: 'user_id',
      name: 'roberto',
      email: 'roberto@email.com',
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'Usuário atualizado',
      status: 201,
    })
  })

  it('Should return 409 if both address and coordinates are provided', async () => {
    mockedPatchUserService.mockRejectedValue(
      new Error(
        'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
      ),
    )
    const response = await request(app)
      .patch('/users')
      .send({
        _id: '6788fbaff71308ab57b734cc',
        address: 'barão de itapura 800,campinas',
        coordinates: {
          lat: -23.558588,
          lng: -46.661511,
        },
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error:
        'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
      status: 400,
    })
  })
})

import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { geoLocateCoordToAdress } from '../../../../utils/geoLocate'
import { postUserRepository } from '../../repository/postUserRepository'
import { postUserController } from '../../controllers/postUserController'

jest.mock('../../../../utils/geoLocate')
jest.mock('../../repository/postUserRepository')

const mockedGeoLocateCoordToAdress = geoLocateCoordToAdress as jest.Mock
const mockedPostUserRepository = postUserRepository as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.post('/users', postUserController)

describe('postUserController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 200 when a user is created with valid address', async () => {
    mockedGeoLocateCoordToAdress.mockResolvedValue({
      address:
        'Alameda Santos 2209, Jardim Paulista, São Paulo - SP, 01419-101, Brazil',
      geometry: { lat: -23.558588, lng: -46.661511 },
    })
    mockedPostUserRepository.mockResolvedValue(null)

    const response = await request(app).post('/users').send({
      name: 'roberto',
      email: 'roberto@email.com',
      address: 'barão de itapura 800,campinas',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Usuario adicionado',
      status: 201,
    })
  })

  it('Should return 409 if name or email is missing', async () => {
    const response = await request(app).post('/users').send({
      address: 'barão de itapura 800,campinas',
    })

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      error: 'Nome e email são obrigatórios',
      status: 400,
    })
  })

  it('Should return 409 if both address and coordinates are provided', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'roberto',
        email: 'roberto@email.com',
        address: 'barão de itapura 800,campinas',
        coordinates: { lat: -23.558588, lng: -46.661511 },
      })

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      error:
        'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
      status: 400,
    })
  })

  it('Should return 500 if an unexpected error occurs', async () => {
    mockedGeoLocateCoordToAdress.mockRejectedValue(
      new Error('Erro API opencage'),
    )

    const response = await request(app).post('/users').send({
      name: 'roberto',
      email: 'roberto@email.com',
      address: 'barão de itapura 800,campinas',
    })

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      error: 'Erro API opencage',
      status: 400,
    })
  })
})

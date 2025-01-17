import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { postRegionController } from '../../controllers/postRegionController'
import { postRegionService } from '../../services/postRegionService'

jest.mock('../../services/postRegionService')

const mockedPostRegionService = postRegionService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.post('/regions', postRegionController)

describe('postRegionController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 201 and a success message when the region is created successfully', async () => {
    mockedPostRegionService.mockResolvedValueOnce(undefined)

    const regionData = {
      name: 'Região Centro',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.633308, -23.55052],
            [-46.629308, -23.54852],
            [-46.624308, -23.55252],
            [-46.633308, -23.55052],
          ],
        ],
      },
      userId: '64f2c5e2b12345678a9bcdef',
    }

    const response = await request(app).post('/regions').send(regionData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'Região criada com sucesso',
      status: 201,
    })
    expect(mockedPostRegionService).toHaveBeenCalledWith(regionData)
  })

  it('Should return 400 and an error message when the service throws a user error', async () => {
    mockedPostRegionService.mockRejectedValueOnce(
      new Error('Usuário não encontrado'),
    )

    const regionData = {
      name: 'Região Centro',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.633308, -23.55052],
            [-46.629308, -23.54852],
            [-46.624308, -23.55252],
            [-46.633308, -23.55052],
          ],
        ],
      },
      userId: '64f2c5e2b12345678a9bcdef',
    }

    const response = await request(app).post('/regions').send(regionData)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Usuário não encontrado',
      status: 400,
    })
    expect(mockedPostRegionService).toHaveBeenCalledWith(regionData)
  })
})

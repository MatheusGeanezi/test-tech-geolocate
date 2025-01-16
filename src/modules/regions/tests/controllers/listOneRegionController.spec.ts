import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { listOneRegionController } from '../../controllers/listOneRegionController'
import { listOneRegionService } from '../../services/listOneRegionService'

jest.mock('../../services/listOneRegionService')

const mockedListOneRegionService = listOneRegionService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.get('/regions/:id', listOneRegionController)

describe('listOneRegionController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 400 if region does not exist', async () => {
    mockedListOneRegionService.mockRejectedValue(
      new Error('Região não encontrada'),
    )

    const response = await request(app).get('/regions/invalidRegionId')

    expect(mockedListOneRegionService).toHaveBeenCalledWith('invalidRegionId')
    expect(mockedListOneRegionService).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Região não encontrada',
      status: 400,
    })
  })

  it('Should return region data with status 200', async () => {
    const mockRegion = {
      name: 'Região Central',
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
      userId: 'validUserId',
    }

    mockedListOneRegionService.mockResolvedValue(mockRegion)

    const response = await request(app).get('/regions/validRegionId')

    expect(mockedListOneRegionService).toHaveBeenCalledWith('validRegionId')
    expect(mockedListOneRegionService).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: mockRegion,
      status: 200,
    })
  })
})

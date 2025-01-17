import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { listRegionsController } from '../../controllers/listRegionsController'
import { listRegionsService } from '../../services/listRegionsService'

jest.mock('../../services/listRegionsService')

const mockedListRegionsService = listRegionsService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.get('/regions', listRegionsController)

describe('listRegionsController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 200 and regions data when the service resolves successfully', async () => {
    const mockRegions = [
      { id: 1, name: 'Region 1' },
      { id: 2, name: 'Region 2' },
    ]
    mockedListRegionsService.mockResolvedValueOnce(mockRegions)

    const query = {
      lat: '-23.55052',
      lng: '-46.633308',
      distance: '5000',
      excludeUser: 'false',
      userId: '6788fbaff71308ab57b734cc',
    }

    const response = await request(app).get('/regions').query(query)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: mockRegions,
      status: 200,
    })
    expect(mockedListRegionsService).toHaveBeenCalledWith({
      lat: -23.55052,
      lng: -46.633308,
      distance: 5000,
      excludeUser: false,
      userId: '6788fbaff71308ab57b734cc',
    })
  })

  it('Should return 400 and an error message when lat and lng not conteins', async () => {
    mockedListRegionsService.mockRejectedValueOnce(
      new Error('Parâmetros lat e lng são obrigatórios'),
    )

    const query = {
      distance: '5000',
      excludeUser: 'false',
      userId: '6788fbaff71308ab57b734cc',
    }

    const response = await request(app).get('/regions').query(query)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Parâmetros lat e lng são obrigatórios',
      status: 400,
    })
    expect(mockedListRegionsService).toHaveBeenCalled()
  })
})

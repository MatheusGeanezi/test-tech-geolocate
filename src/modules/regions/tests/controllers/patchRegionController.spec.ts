import request from 'supertest'
import express, { Application } from 'express'
import { patchRegionController } from '../../controllers/patchRegionController'
import { patchRegionService } from '../../services/patchRegionService'
import bodyParser from 'body-parser'

jest.mock('../../services/patchRegionService')

const mockedPatchRegionService = patchRegionService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.patch('/regions', patchRegionController)

describe('PATCH regions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update a region successfully and return 201', async () => {
    mockedPatchRegionService.mockResolvedValueOnce(undefined)

    const regionData = {
      _id: '64b2f6d8a2f4cabc12345678',
      name: 'Updated Region',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [123.45, 67.89],
          [123.46, 67.88],
          [123.47, 67.87],
        ],
      },
      userId: '64b2e6d8a2f4cabc12345678',
    }

    const response = await request(app).patch('/regions').send(regionData)

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Região atualizada')
    expect(mockedPatchRegionService).toHaveBeenCalledWith(regionData)
    expect(mockedPatchRegionService).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if the region data is invalid', async () => {
    mockedPatchRegionService.mockRejectedValueOnce(
      new Error('A região deve ser um polígono válido'),
    )

    const regionData = {
      _id: '64b2f6d8a2f4cabc12345678',
      name: 'Updated Region',
      geometry: { type: 'Point', coordinates: [123.45, 67.89] },
      userId: '64b2e6d8a2f4cabc12345678',
    }

    const response = await request(app).patch('/regions').send(regionData)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('A região deve ser um polígono válido')
    expect(mockedPatchRegionService).toHaveBeenCalledWith(regionData)
    expect(mockedPatchRegionService).toHaveBeenCalledTimes(1)
  })
})

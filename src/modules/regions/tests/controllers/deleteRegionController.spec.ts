import request from 'supertest'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { deleteRegionController } from '../../controllers/deleteRegionController'
import { deleteRegionService } from '../../services/deleteRegionService'

jest.mock('../../services/deleteRegionService')

const mockedDeleteUserService = deleteRegionService as jest.Mock

const app: Application = express()
app.use(bodyParser.json())
app.delete('/regions/:id', deleteRegionController)

describe('deleteRegionController Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 200 when region is successfully deleted', async () => {
    mockedDeleteUserService.mockResolvedValue(null)

    const response = await request(app).delete('/regions/123').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Região removida',
      status: 200,
    })
  })

  it('Should return 400 if region is not found', async () => {
    mockedDeleteUserService.mockRejectedValue(
      new Error('Região não encontrada'),
    )

    const response = await request(app).delete('/regions/123').send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Região não encontrada',
      status: 400,
    })
  })
})

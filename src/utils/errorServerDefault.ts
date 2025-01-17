import { Response } from 'express'
import { STATUS } from './responseStatus'

export const errorServerDefault = {
  error: 'Erro interno do servidor',
  status: STATUS.INTERNAL_SERVER_ERROR,
}

export const errorServiceDefault = (
  res: Response<any, Record<string, any>>,
  error: unknown,
) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message, status: STATUS.BAD_REQUEST })
  } else {
    res.status(500).json(errorServerDefault)
  }
}

import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { listUsersService } from '../services/listUsersService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

export const listUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const response = await listUsersService()
    res.status(200).json({ data: response, status: STATUS.OK })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

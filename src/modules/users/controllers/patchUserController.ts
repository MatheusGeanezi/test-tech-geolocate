import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { patchUserService } from '../services/patchUserService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

export const patchUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await patchUserService(req.body)
    res
      .status(201)
      .json({ message: 'Usuário atualizado', status: STATUS.UPDATED })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

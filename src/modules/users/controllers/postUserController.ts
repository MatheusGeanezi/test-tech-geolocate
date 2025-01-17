import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { postUserService } from '../services/postUserService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

export const postUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await postUserService(req.body)
    res
      .status(200)
      .json({ message: 'Usuário adicionado', status: STATUS.CREATED })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

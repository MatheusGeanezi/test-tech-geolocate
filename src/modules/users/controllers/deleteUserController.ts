import { Request, Response } from 'express'
import { STATUS } from '../../../utils/responseStatus'
import { deleteUserService } from '../services/deleteUserService'
import { errorServiceDefault } from '../../../utils/errorServerDefault'

export const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id
    await deleteUserService(id)
    res.status(200).json({ message: 'Usuário removido', status: STATUS.OK })
  } catch (error) {
    errorServiceDefault(res, error)
  }
}

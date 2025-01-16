import { IUsers } from '../schema/usersSchema'

export const postUserService = async (body: IUsers): Promise<void> => {
  const { name, email, address, coordinates } = body

  if (!name || !email) {
    throw new Error('Nome e email são obrigatórios')
  }

  const hasAddress = !!address
  const hasCoordinates = !!coordinates

  if ((hasAddress && hasCoordinates) || (!hasAddress && !hasCoordinates)) {
    throw new Error(
      'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
    )
  }
}

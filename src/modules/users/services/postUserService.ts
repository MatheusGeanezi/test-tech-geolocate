import { geoLocateCoordToAdress } from '../../../utils/geoLocate'
import { postUserRepository } from '../repository/postUserRepository'
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

  const location = hasCoordinates
    ? `${coordinates.lat}, ${coordinates.lng}`
    : address

  const geoLocate = await geoLocateCoordToAdress(location)
  await postUserRepository({
    name,
    email,
    address: geoLocate.address,
    coordinates: geoLocate.geometry,
  } as IUsers)
}

import { geoLocateCoordToAdress } from '../../../utils/geoLocate'
import { listOneUserRepository } from '../repository/listOneUserRepository'
import { patchUserRepository } from '../repository/patchUserRepository'
import { IUsers } from '../schema/usersSchema'
import { Types } from 'mongoose'

export const patchUserService = async (
  body: Partial<IUsers>,
): Promise<void> => {
  const { _id, name, email, address, coordinates } = body

  if (!_id) {
    throw new Error('ID do usuário é obrigatório')
  }

  const existingUser = await listOneUserRepository({
    _id: new Types.ObjectId(_id),
  })
  if (!existingUser) {
    throw new Error('Usuário não encontrado')
  }

  const updatedData = { ...existingUser }

  if (name) updatedData.name = name
  if (email) updatedData.email = email

  const hasAddress = !!address
  const hasCoordinates = !!coordinates

  if (hasAddress || hasCoordinates) {
    if ((hasAddress && hasCoordinates) || (!hasAddress && !hasCoordinates)) {
      throw new Error(
        'Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum.',
      )
    }
    const location = hasCoordinates
      ? `${coordinates.lat}, ${coordinates.lng}`
      : address

    const geoLocate = await geoLocateCoordToAdress(location)

    updatedData.address = geoLocate.address
    updatedData.coordinates = geoLocate.geometry
  }

  await patchUserRepository({ _id }, updatedData)
}

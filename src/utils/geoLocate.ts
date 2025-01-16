import opencage from 'opencage-api-client'

export const geoLocateCoordToAdress = async (location: any): Promise<any> => {
  try {
    const geoLocate = await opencage.geocode({ q: location })

    if (geoLocate.status.code !== 200) {
      throw new Error('Não foi possivel converter coordenadas para endereço')
    }

    return {
      address: geoLocate.results[0].formatted,
      geometry: geoLocate.results[0].geometry,
    }
  } catch (error) {
    throw new Error('Erro API opencage')
  }
}

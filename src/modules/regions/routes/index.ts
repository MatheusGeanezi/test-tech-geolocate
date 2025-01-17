import { Router } from 'express'
import { deleteRegionController } from '../controllers/deleteRegionController'
import { listOneRegionController } from '../controllers/listOneRegionController'
import { listRegionsController } from '../controllers/listRegionsController'
import { postRegionController } from '../controllers/postRegionController'
import { patchRegionController } from '../controllers/patchRegionController'

const regionsRouter = Router()

regionsRouter

  /**
   * @swagger
   * /api/regions:
   *   post:
   *     summary: Cria uma nova região
   *     description: Cria uma nova região com base nos dados enviados no payload.
   *     tags: [Regiões]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nome da região.
   *                 example: "Região Centro"
   *               geometry:
   *                 type: object
   *                 properties:
   *                   type:
   *                     type: string
   *                     enum: [Polygon]
   *                     description: O tipo da geometria (deve ser sempre "Polygon").
   *                     example: "Polygon"
   *                   coordinates:
   *                     type: array
   *                     items:
   *                       type: array
   *                       items:
   *                         type: number
   *                         description: Coordenadas do ponto [longitude, latitude].
   *                     example: [
   *                       [
   *                         [-46.633308, -23.55052],
   *                         [-46.629308, -23.54852],
   *                         [-46.624308, -23.55252],
   *                         [-46.633308, -23.55052]
   *                       ]
   *                     ]
   *               userId:
   *                 type: string
   *                 description: ID do usuário associado à região.
   *                 example: "64f2c5e2b12345678a9bcdef"
   *     responses:
   *       201:
   *         description: Região criada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Região criada com sucesso"
   *                 data:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                       description: ID da nova região.
   *                     name:
   *                       type: string
   *                       description: Nome da região.
   *                     geometry:
   *                       type: object
   *                       properties:
   *                         type:
   *                           type: string
   *                           description: Tipo da geometria (sempre "Polygon").
   *                         coordinates:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *                               description: Coordenadas do ponto [longitude, latitude].
   *                     userId:
   *                       type: string
   *                       description: ID do usuário associado à região.
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *       400:
   *         description: Dados inválidos enviados no payload.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Erro na validação dos campos"
   *       500:
   *         description: Erro interno do servidor.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Erro no servidor"
   */
  .post('/', postRegionController)

  /**
   * @swagger
   * /api/regions/{id}:
   *   get:
   *     tags:
   *       - Regiões
   *     summary: Obter detalhes de uma região específica
   *     description: Busca os detalhes de uma região pelo seu ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: O ID da região a ser buscada.
   *         schema:
   *           type: string
   *           example: 64f2c5e2b12345678a9bcdef
   *     responses:
   *       200:
   *         description: Detalhes da região retornados com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   example: 64f2c5e2b12345678a9bcdef
   *                 name:
   *                   type: string
   *                   example: Região Centro
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: Polygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example:
   *                         -
   *                           - [-46.633308, -23.55052]
   *                           - [-46.629308, -23.54852]
   *                           - [-46.624308, -23.55252]
   *                           - [-46.633308, -23.55052]
   *                 userId:
   *                   type: string
   *                   example: 64f2c5e2b12345678a9bcdef
   *       400:
   *         description: Erro na requisição (ID inválido ou outros erros de validação).
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: ID inválido ou não encontrado.
   *                 status:
   *                   type: string
   *                   example: BAD_REQUEST
   *       404:
   *         description: Região não encontrada.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Região não encontrada.
   *                 status:
   *                   type: string
   *                   example: NOT_FOUND
   *       500:
   *         description: Erro interno do servidor.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Erro interno do servidor.
   */
  .get('/:id', listOneRegionController)

  /**
   * @swagger
   * /api/regions:
   *   get:
   *     tags:
   *       - Regiões
   *     summary: "Listar regiões com base em um ponto geográfico"
   *     description: |
   *       Este endpoint retorna uma lista de regiões que estão dentro de um ponto geográfico específico ou a uma certa distância de um ponto,
   *       com a opção de excluir regiões associadas ao usuário que está fazendo a requisição.
   *     parameters:
   *       - in: query
   *         name: lat
   *         description: "Latitude do ponto de referência."
   *         required: true
   *         type: number
   *         format: float
   *       - in: query
   *         name: lng
   *         description: "Longitude do ponto de referência."
   *         required: true
   *         type: number
   *         format: float
   *       - in: query
   *         name: distance
   *         description: "Distância máxima em metros para filtrar as regiões próximas ao ponto."
   *         required: false
   *         type: number
   *         format: float
   *       - in: query
   *         name: excludeUser
   *         description: "Se true, excluir regiões pertencentes ao usuário fornecido."
   *         required: false
   *         type: boolean
   *         default: false
   *       - in: query
   *         name: userId
   *         description: "ID do usuário, usado quando `excludeUser` é false para excluir regiões do próprio usuário."
   *         required: false
   *         type: string
   *         example: "6788fbaff71308ab57b734cc"
   *     responses:
   *       '200':
   *         description: "Regiões encontradas com base nos critérios fornecidos."
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               _id:
   *                 type: string
   *                 description: "ID único da região."
   *               name:
   *                 type: string
   *                 description: "Nome da região."
   *               geometry:
   *                 type: object
   *                 properties:
   *                   type:
   *                     type: string
   *                     description: "Tipo de geometria (Point, Polygon, etc)."
   *                   coordinates:
   *                     type: array
   *                     items:
   *                       type: number
   *                     description: "Coordenadas geográficas (longitude, latitude)."
   *               userId:
   *                 type: string
   *                 description: "ID do usuário associado à região."
   *               createdAt:
   *                 type: string
   *                 format: date-time
   *                 description: "Data e hora de criação da região."
   *               updatedAt:
   *                 type: string
   *                 format: date-time
   *                 description: "Data e hora de última atualização da região."
   *       '400':
   *         description: "Erro na requisição, parâmetros inválidos."
   *       '500':
   *         description: "Erro interno no servidor."
   */
  .get('/', listRegionsController)

  /**
   * @swagger
   * /api/regions:
   *   patch:
   *     tags:
   *       - Regiões
   *     summary: Atualizar dados de uma região
   *     description: Atualiza informações específicas de uma região. Apenas os campos enviados no corpo da requisição serão atualizados.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               _id:
   *                 type: string
   *                 format: uuid
   *                 description: ID da região a ser atualizada.
   *                 example: "64b2f6d8a2f4cabc12345678"
   *               name:
   *                 type: string
   *                 description: Nome da região.
   *                 example: "Nova Região"
   *               geometry:
   *                 type: object
   *                 description: Coordenadas geométricas da região.
   *                 properties:
   *                   type:
   *                     type: string
   *                     enum: [Polygon]
   *                     description: Tipo de geometria.
   *                     example: "Polygon"
   *                   coordinates:
   *                     type: array
   *                     description: Coordenadas da região no formato de array.
   *                     items:
   *                       type: array
   *                       items:
   *                         type: number
   *                     example: [[[123.45, 67.89], [123.46, 67.88], [123.47, 67.87]]]
   *               userId:
   *                 type: string
   *                 format: uuid
   *                 description: ID do usuário associado à região.
   *                 example: "64b2e6d8a2f4cabc12345678"
   *               createdAt:
   *                 type: string
   *                 format: date-time
   *                 description: Data e hora de criação da região.
   *                 example: "2025-01-16T12:34:56Z"
   *               updatedAt:
   *                 type: string
   *                 format: date-time
   *                 description: Data e hora de última atualização da região.
   *                 example: "2025-01-17T15:45:00Z"
   *     responses:
   *       200:
   *         description: Região atualizada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: "Região atualizada com sucesso."
   *       400:
   *         description: Erro de validação ou região não encontrada.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 error:
   *                   type: string
   *                   example: "O nome da região é obrigatório"
   *       500:
   *         description: Erro interno do servidor.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 error:
   *                   type: string
   *                   example: "Erro interno do servidor"
   */
  .patch('/', patchRegionController)
  /**
   * @swagger
   * /api/regions/{id}:
   *   delete:
   *     tags:
   *       - Regiões
   *     summary: Deletar uma região
   *     description: Remove uma região específica com base no ID fornecido.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: O ID da região que será deletada.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Região deletada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Região deletada com sucesso.
   *       404:
   *         description: Região não encontrada.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Região não encontrada.
   *       500:
   *         description: Erro no servidor.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Erro ao deletar região.
   */
  .delete('/:id', deleteRegionController)
export default regionsRouter

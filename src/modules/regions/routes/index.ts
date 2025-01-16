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
  .get('/', listRegionsController)
  .patch('/', patchRegionController)
  .delete('/:id', deleteRegionController)
export default regionsRouter

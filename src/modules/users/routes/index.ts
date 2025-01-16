import { Router } from 'express'
import { postUserController } from '../controllers/postUserController'

const usersRouter = Router()

usersRouter

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Adiciona um novo usuário
   *     description: Endpoint para criar um novo usuário, fornecendo endereço ou coordenadas.
   *     tags:
   *       - Usuários
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: Roberto
   *               email:
   *                 type: string
   *                 example: roberto@email.com
   *               address:
   *                 type: string
   *                 example: Barão de Itapura, 800 - Campinas, SP
   *               coordinates:
   *                 type: object
   *                 properties:
   *                   lat:
   *                     type: number
   *                     example: -23.558588
   *                   lng:
   *                     type: number
   *                     example: -46.661511
   *     responses:
   *       200:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Usuario adicionado
   *                 status:
   *                   type: string
   *                   example: 201
   *       409:
   *         description: Erro de validação ou conflito
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Nome e email são obrigatórios
   *                 status:
   *                   type: string
   *                   example: 400
   *       500:
   *         description: Erro interno no servidor
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Erro desconhecido
   */
  .post('/', postUserController)
// .get('/', listUserController)

export default usersRouter

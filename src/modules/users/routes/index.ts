import { Router } from 'express'
import { postUserController } from '../controllers/postUserController'
import { listUsersController } from '../controllers/listUsersController'
import { listOneUserController } from '../controllers/listOneUserController'

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

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Retorna a lista de usuários
   *     description: Esta rota retorna todos os usuários cadastrados no sistema.
   *     tags:
   *       - Usuários
   *     responses:
   *       200:
   *         description: Lista de usuários encontrada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       name:
   *                         type: string
   *                       email:
   *                         type: string
   *                       address:
   *                         type: string
   *                       coordinates:
   *                         type: object
   *                         properties:
   *                           lat:
   *                             type: number
   *                           lng:
   *                             type: number
   *       409:
   *         description: Erro ao tentar buscar os usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Erro ao buscar usuários"
   *                 status:
   *                   type: string
   *                   example: "409"
   */
  .get('/', listUsersController)

  /**
   * @swagger
   * tags:
   *   - name: Usuarios
   *     description: Gerenciamento de usuários
   *
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - Usuários
   *     summary: Retorna um usuário pelo ID
   *     description: Recupera os detalhes de um usuário com base no ID fornecido.
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID do usuário a ser buscado
   *         schema:
   *           type: string
   *           example: "609d1a9f4f5c8e2f1a6d4e6b"
   *     responses:
   *       200:
   *         description: Usuário encontrado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     address:
   *                       type: string
   *                     coordinates:
   *                       type: object
   *                       properties:
   *                         lat:
   *                           type: number
   *                         lng:
   *                           type: number
   *       409:
   *         description: Usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Usuário não encontrado"
   *                 status:
   *                   type: string
   *                   example: "bad_request"
   *       500:
   *         description: Erro desconhecido
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Erro desconhecido"
   *                 status:
   *                   type: string
   *                   example: "internal_server_error"
   */

  .get('/:id', listOneUserController)

export default usersRouter

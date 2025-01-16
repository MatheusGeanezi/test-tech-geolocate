import { Router } from 'express'
import { postUserController } from '../controllers/postUserController'
import { listUsersController } from '../controllers/listUsersController'
import { listOneUserController } from '../controllers/listOneUserController'
import { patchUserController } from '../controllers/patchUserController'
import { deleteUserController } from '../controllers/deleteUserController'

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
   *                   example: Erro de Servidor
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
   *         description: Erro de Servidor
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Erro de Servidor"
   *                 status:
   *                   type: string
   *                   example: "internal_server_error"
   */

  .get('/:id', listOneUserController)

  /**
   * @swagger
   * /api/users:
   *   patch:
   *     tags:
   *       - Usuários
   *     summary: Atualizar informações de um usuário
   *     description: >
   *       Atualiza os dados de um usuário existente. Você pode alterar o nome, email, endereço ou coordenadas.
   *       Apenas um entre endereço e coordenadas deve ser fornecido por vez.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               _id:
   *                 type: string
   *                 description: ID do usuário a ser atualizado
   *                 example: "64e76c5f81c8c2b5fcbe5d30"
   *               name:
   *                 type: string
   *                 description: Nome do usuário
   *                 example: "John Doe"
   *               email:
   *                 type: string
   *                 description: Email do usuário
   *                 example: "johndoe@example.com"
   *               address:
   *                 type: string
   *                 description: Endereço do usuário (sobrescreve coordenadas se fornecido)
   *                 example: "123 Main St, Cityville"
   *               coordinates:
   *                 type: object
   *                 description: >
   *                   Coordenadas geográficas do usuário (sobrescreve o endereço se fornecido)
   *                 properties:
   *                   lat:
   *                     type: number
   *                     description: Latitude
   *                     example: -23.55052
   *                   lng:
   *                     type: number
   *                     description: Longitude
   *                     example: -46.633308
   *             required:
   *               - _id
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Usuário atualizado com sucesso."
   *       400:
   *         description: Requisição inválida
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Você deve fornecer apenas endereço ou coordenadas, não ambos ou nenhum."
   *       404:
   *         description: Usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Usuário não encontrado."
   *       500:
   *         description: Erro interno no servidor
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Erro ao localizar o endereço ou as coordenadas fornecidas."
   */

  .patch('/', patchUserController)

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - "Usuários"
   *     summary: "Excluir um usuário"
   *     description: "Deleta um usuário com o ID fornecido."
   *     operationId: "deleteUser"
   *     parameters:
   *       - name: "id"
   *         in: "path"
   *         description: "ID do usuário a ser deletado"
   *         required: true
   *         type: "string"
   *         format: "uuid"
   *     responses:
   *       200:
   *         description: "Usuário deletado com sucesso"
   *         schema:
   *           type: "object"
   *           properties:
   *             message:
   *               type: "string"
   *               example: "Usuário deletado com sucesso"
   *       400:
   *         description: "ID inválido"
   *         schema:
   *           type: "object"
   *           properties:
   *             error:
   *               type: "string"
   *               example: "ID inválido"
   *       404:
   *         description: "Usuário não encontrado"
   *         schema:
   *           type: "object"
   *           properties:
   *             error:
   *               type: "string"
   *               example: "Usuário não encontrado"
   *       500:
   *         description: "Erro interno do servidor"
   *         schema:
   *           type: "object"
   *           properties:
   *             error:
   *               type: "string"
   *               example: "Erro ao tentar deletar o usuário"
   */

  .delete('/:id', deleteUserController)

export default usersRouter

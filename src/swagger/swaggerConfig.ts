import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Geral',
      version: '1.0.0',
      description: 'Documentação para as APIs do sistema.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)

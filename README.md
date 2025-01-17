🌟 Projeto Teste tech-OZmap

Este projeto é uma API RESTful construída para gerenciar usuários e localizações, com suporte para geocodificação via API OpenCage.

---

## 🛠 **Especificações Técnicas**

- **Node.js**: Versão 20 ou superior.
- **Gerenciador de Pacotes**: Yarn.
- **Banco de Dados**: MongoDB 7+.
- **ODM**: Mongoose.
- **Linguagem**: TypeScript.
- **Formatação e Linting**: ESLint + Prettier.
- **Testes**: Jest.
- **Documentação da API**: Swagger.
- **Geocodificação**: API OpenCage.
- **Containerização**: Docker.
- **Arquitetura em Camadas**

---

## 📋 **Pré-requisitos**

Antes de começar, certifique-se de ter os seguintes itens instalados na sua máquina:

1. **Node.js** (v20 ou superior): [Instalar Node.js](https://nodejs.org/)
2. **Yarn**: [Instalar Yarn](https://yarnpkg.com/getting-started/install)
3. **Docker** (caso opte por usar containers): [Instalar Docker](https://www.docker.com/)
4. **MongoDB**: Caso não use Docker, você precisará do MongoDB instalado localmente. [Instalar MongoDB](https://www.mongodb.com/)

---

## 🚀 **Como Rodar o Projeto**

```bash
1- git clone https://github.com/MatheusGeanezi/test-tech-geolocate.git
2- Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
       PORT=3000 MONGO_URI=mongodb://localhost:27017/oz-tech-test
       OPENCAGE_API_KEY=0768e57206db4935975a585de7e9c790
   ou renomeie o arquivo .env.example
3- Instalar dependências:
       yarn install
4- Rodar projeto com Docker:
       docker-compose up
5- Rodar localmente :
       yarn dev
6- Rodar os testes
       yarn test
7- documentação da API:
       http://localhost:3000/api-docs


```

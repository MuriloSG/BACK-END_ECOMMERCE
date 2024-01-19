# API RESTFUL ECOMMERCE


## Dependências de desenvolvimento:
1. **@types/cors:** v2.8.17
2. **@types/express:** v4.17.21
3. **@types/node:** v20.9.2
4. **@typescript-eslint/eslint-plugin:** v6.13.1
5. **@typescript-eslint/parser:** v6.13.1
6. **eslint:** v8.54.0
7. **prettier:** v3.1.0
8. **ts-node-dev:** v2.0.0
9. **tsconfig-paths:** v4.2.0
10. **typescript:** v5.3.2

## Dependências:
1. **cors:** v2.8.5
2. **express:** v4.18.2
3. **express-async-errors:** v3.1.1
4. **pg:** v8.11.3
5. **reflect-metadata:** v0.1.13
6. **typeorm:** v0.3.17

## Tabela Produtos
| Atributo    | Tipo       |
|-------------|------------|
| id (uuid)   | string     |
| name        | string     |
| price       | number     |
| quantity    | number     |
| category    | string     |
| description | string     |
| createdAt   | Date       |
| updatedAt   | Date       |

## Rotas validadas com Celebrate/Joi
- **GET /products:**
  - Lista todos os produtos.
  
- **GET /products/:id:**
  - Obtém detalhes de um produto específico.
  - Validação de parâmetros de caminho usando Joi.

- **POST /products:**
  - Cria um novo produto.
  - Validação de dados no corpo da solicitação usando Joi.

- **PUT /products/:id:**
  - Atualiza informações de um produto existente.
  - Validação de parâmetros de caminho e dados no corpo da solicitação usando Joi.

- **DELETE /products/:id:**
  - Exclui um produto existente.
  - Validação de parâmetros de caminho usando Joi.
## Entidade Usuários
| Atributo    | Tipo       |
|-------------|------------|
| id (uuid)   | string     |
| name        | string     |
| email       | string     |
| passaord    | string     |
| isAdmin     | boolean    |

## Rotas com verificação de autenticação validadas com o Celebrate/Joi

- **GET/users:**
  - **Descrição:** Retorna informações sobre o usuário autenticado.
  - **Middleware:** Utiliza o middleware `isAuthenticated` para garantir que o usuário esteja autenticado antes de acessar as informações.

- **GET/users/:id:**
  - **Descrição:** Retorna informações sobre um usuário específico com base no ID fornecido.
  - **Validação:** Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id".
  - **Middleware:** Utiliza o middleware `isAuthenticated` para garantir que o usuário esteja autenticado antes de acessar as informações.

- **Post/users:**:
  - **Descrição:** Cria um novo usuário.
  - **Validação:** Utiliza o Celebrate com o Joi para validar os dados fornecidos no corpo da solicitação.

- **Delete/users/:id:**
  - **Descrição:** Exclui um usuário existente com base no ID fornecido.
  - **Validação:** Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id".
  - **Middleware:** Utiliza o middleware `isAuthenticated` para garantir que o usuário esteja autenticado antes de acessar as informações.

- **PATCH /avatar**
  - **Descrição:** Atualiza o avatar do usuário autenticado.
  - **Middleware:** Utiliza o middleware `isAuthenticated` para garantir que o usuário esteja autenticado antes de realizar a atualização.
  - **Middleware:** Utiliza o multer para lidar com o upload do avatar.

## Encriptação de senha com bcryptjs: 
A encriptação de senha é uma prática crucial para garantir a segurança das senhas armazenadas em bancos de dados. O pacote bcryptjs desempenha um papel fundamental nesse processo, utilizando o algoritmo bcrypt para gerar hashes irreversíveis, tornando-os mais seguros contra ataques de força bruta.

**Instalação:**
```bash
    yarn add bcryptjs
    yarn add -D @types/bcryptjs
```

## Multer
O multer sera usado para o usuário conseguir fazer um upload de uma imagem que será seu avatar e serviços oferecidos. 

**Instalação:**
```bash
    Yarn add multer
    Yarn add -D @types/multer
```
## Autenticação JWT:
Esse tipo de autenticação retorna um token em formado JSON, com esse token é possível iniciar uma seção, esse token autoriza o usuário navegar entre as rotas protegidas da aplicação. Ademais, o token é composto por 3 partes, senda elas:

  **Primaeira Parte:** Header(cabeçalho) que informa o tipo do token e qual algoritmo de hash está sendo usado.

  **Segunda Parte:** Payloader que são os dados que você envia para o token, em hipótese alguma colocar dados sensíveis.

  **Terceira Parte:** É a verificação de assinatura do token, essa parte garante a integridade de um token JWT.

**Instalação:**
```bash
    Yarn add jsonwebtoken
    Yarn add -D jsonwebtoken
```

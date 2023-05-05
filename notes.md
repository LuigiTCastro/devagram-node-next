# PROJECT ENVIRONMENTS
> DEVELOPMENT Environment 
> TEST Environment
> HOMOLOGATION Environment
> PRODUCTION Environment 


# ENVS [EnvironmentVariables] <!-- variaveis de ambiente -->
.env.example <!-- indica as variaveis de ambiente que precisa preencher o valor | file not executed -->
    DB_CONEXAO_STRING

.env.local
.env.development.local
.env.test.local
.env.production.local


# MIDDLEWARE
No [Endpoint], recebe-se a REQ e a RES, e ainda processa tudo que é preciso fazer com a REQ/RES.
Já no [Middleware], recebe-se um HANDLER e este recebe uma função que tem um REQ/RES.

Faz as trativas e se necessário chama o Endpoint.


# SCHEMA
Schema: esquema.
Uma forma de se fazer algo. Passo a passo de execuçao.


# MONGOOSE
O Mongoose é uma biblioteca do Node.js que fornece uma solução baseada em esquemas para modelar os dados da aplicação e interagir com o MongoDB, um banco de dados NoSQL. Ele fornece uma maneira fácil de definir e validar a estrutura dos dados, bem como suporte para consultas e operações CRUD. O Mongoose é frequentemente usado em aplicativos Node.js que precisam de um banco de dados flexível e escalável para armazenar dados complexos.


`export type`
_se você tem uma interface User definida em um arquivo types.ts e deseja usá-la em outro arquivo, você pode exportar essa interface usando export type User no arquivo types.ts. Em seguida, você pode importar essa interface no outro arquivo com import { User } from './types'. Isso ajuda a manter suas definições de tipos organizadas e reutilizáveis em todo o seu projeto._


__IMPORTANTS LIBS__
> npm i moment -> lib to format date.
> npm i mongoose -> lib to work with schemas and mongoDB.
> npm i md5 (npm i --save-dev@typesmd5) -> lib to encrypt passwords.
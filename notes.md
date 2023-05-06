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


# JWT [JsonWebToken] AUTHENTICATION
Lib que valida a camada de seguranca.
Declaracoes seguras JWT entre duas partes.
Padrao da internet para criacao de dados com assinatura/criptografia. <!-- your payload contains a JSON -->
Os tokens sao assinado utilizando um 'segredo'.
Autentica um usuario entre um provedor de identidade e um provedor de servicos.
Os tokens sao muito usados em contexto de SSO[SingleSignOn]: Login unico que da acessos a diversos sistemas de uma rede.

Client[HttpRequest] > Authentication Endpoint API > Authentication > JWT Token signed with intern secret [Response]
<!-- inform token in the AUTHORIZATION HEADER and the client have access to application endpoints -->
<Bearer token>


>> JWT components
    > Header <!-- cabeçalho do token -->
    > Payload <!-- datas of a own authentication -->
    > Signature <!-- only signature of each token (generated through of a encrypt algorithm) -->


# HANDLER
Is a function that processes the received `requests` by web server and sends the `response` to the client.
Its usually defined as a middleware in some Frameworks, receiving the request/response as paramethers.
Operations realizeds: validation, authentication, database queries, sending the reply.






__Take Note__
`export type`
_se você tem uma interface User definida em um arquivo types.ts e deseja usá-la em outro arquivo, você pode exportar essa interface usando export type User no arquivo types.ts. Em seguida, você pode importar essa interface no outro arquivo com import { User } from './types'. Isso ajuda a manter suas definições de tipos organizadas e reutilizáveis em todo o seu projeto._

__IMPORTANTS LIBS__
> npm i moment -> lib to format date.
> npm i mongoose -> lib to work with schemas and mongoDB.
> npm i md5 (npm i --save-dev @types/md5) -> lib to encrypt passwords.
> npm i jsonwebtoken -> lib to generate token.

__Global Token to Postamn__
Syntax (in TESTS): 
<var jsonData = JSON.parse(responseBody)>
<postman.setGlobalVariable('nameToken', jsonData.token)>

Syntax (in a header AUTHORIZATON):
`{{nameToken}}`
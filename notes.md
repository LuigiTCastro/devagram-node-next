# PROJECT ENVIRONMENTS
> DEVELOPMENT Environment 
> TEST Environment
> HOMOLOGATION Environment
> PRODUCTION Environment 


# ENVS [EnvironmentVariables] <!-- variaveis de ambiente -->
.env.example <!-- indica as variaveis de ambiente que precisa preencher o valor | file not executable -->
    DB_CONEXAO_STRING

.env.local
.env.development.local
.env.test.local
.env.production.local


# MIDDLEWARE
No [Endpoint], recebe-se a REQ e a RES, e ainda processa tudo que é preciso fazer com a REQ/RES.
Já no [Middleware], recebe-se um HANDLER e este recebe uma função que tem um REQ/RES.
Faz as trativas e se necessário chama o Endpoint.

Em uma aplicação web, um middleware é um software que se encontra entre a camada de aplicação e a camada de servidor, e tem como objetivo executar ações intermediárias em uma requisição antes que ela chegue ao destino final. <!-- validação de dados, autenticação, manipulação de cabeçalhos HTTP, politicas de segurança (CORS) -->

<!-- Comumente usados em frameworks e bibliotecas de desenvolvimento web -->


# SCHEMA
Schema: esquema.
Uma forma de se fazer algo. Passo a passo de execuçao.

The Schemas are responsible for defining the basic structure of a collection in MongoDB, such as the accepted fields and data types.
The Schema allows defining validation rules for the data that will be inserted in the collection.


# MONGOOSE
O Mongoose é uma biblioteca do Node.js que fornece uma solução baseada em esquemas para modelar os dados da aplicação e interagir com o MongoDB, um banco de dados NoSQL. Ele fornece uma maneira fácil de definir e validar a estrutura dos dados, bem como suporte para consultas e operações CRUD. O Mongoose é frequentemente usado em aplicativos Node.js que precisam de um banco de dados flexível e escalável para armazenar dados complexos.

__To use the Mongoose in a Node.js project:__
    _Install the mongoose as a project dependecy using a packages generate (Npm, Yarn);_
    _Connect the mongoose to the MongoDB using the connection URL and some options of configurations;_
    _Create the Schemas, which are the data representation that will be stored in MongoDB (defining the properties and types of each field);_
    _Create the Models, which are the classes that allow to realize operations on the databse (insert, read, update, delete records)_
    _Use the Models to do queries and manipulate datas in MongoDB._


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

_A configuração do JWT (JSON Web Tokens) em um projeto geralmente envolve a criação de um Middleware de validação, que verifica se o token é válido e autoriza o acesso a determinadas rotas, a geração do token no login do usuário e a adição da dependência jsonwebtoken_


# HANDLER
Is a function that processes the received `requests` by web server and sends the `response` to the client.
Its usually defined as a middleware in some Frameworks, receiving the request/response as paramethers.
Operations realizeds: validation, authentication, database queries, sending the reply.


# CORS [CrossOriginResourceSharing]
mecanismo de segurança utilizado pelos navegadores para limitar as solicitações de recursos (como imagens, scripts e dados) que são feitas a partir de um determinado domínio, para outro domínio. Essa política de segurança ajuda a proteger o navegador e o servidor contra possíveis ataques que possam explorar vulnerabilidades de segurança, como ataques de injeção de scripts maliciosos (XSS) e roubo de informações confidenciais. Portanto, para permitir que os recursos sejam compartilhados entre diferentes domínios, é necessário configurar as configurações de CORS no servidor.



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
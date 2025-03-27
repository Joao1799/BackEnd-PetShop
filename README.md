# 🐾 Petshop API

## 📌 Descrição

Este projeto é uma API desenvolvida com Node.js e Express, projetada para gerenciar um sistema de petshop. O objetivo principal é facilitar o cadastro e a realização de atendimentos para animais de estimação.

## 🚀 Tecnologias Utilizadas

- 🟢 **Node.js** - Runtime para execução de JavaScript no servidor.
- ⚡ **Express** - Framework para construção da API.
- 🗄 **Prisma** - ORM para interação com banco de dados SQL.
- 🍃 **Mongoose** - ODM para interação com banco de dados MongoDB.
- 🔐 **JWT (Json Web Token)** - Autenticação e segurança.
- 🔑 **Bcrypt.js** - Criptografia de senhas.
- 🌍 **Cors** - Controle de acesso entre domínios diferentes.
- 📦 **Body-Parser** - Manipulação de requisições JSON.
- 🛠 **Dotenv** - Gerenciamento de variáveis de ambiente.

## 📥 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/petshop-api.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd petshop-api
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, como conexão com banco de dados e chave JWT.

5. Inicie a API:
   ```bash
   npm start
   ```

## 📂 Estrutura do Projeto

```
📁 petshop-api/
├── 📂 prisma/              
│   ├── 📝 schema.prisma
├── 📂 models/              # Modelos do Prisma e Mongoose
│   ├── 📝 Atendimento.js
│   ├── 🐶 Pet.js
│   ├── 👩‍⚕️ UsuarioFuncionario.js
│   ├── 👤 UsuarioCliente.js
├── 📂 routes/              # Rotas da API
│   ├── 🛠 atendimentoRoutes.js
│   ├── 🐕 petRoutes.js
│   ├── 👩‍💼 usuarioFuncionarioRoutes.js
│   ├── 👥 usuarioClienteRoutes.js
├── 📂 controllers/         # Lógica de negócio
├── 📂 config/              # Configuração de conexão com banco de dados
├── 📂 middleware/          # Middlewares de segurança e autenticação
├── 📄 .env                 # Variáveis de ambiente
├── 🚀 server.js            # Arquivo principal do servidor
├── 📦 package.json         # Dependências e scripts
```

## ✅ Funcionalidades

- 📌 **Cadastro de pets**
- 👥 **Cadastro de clientes e funcionários**
- 🔐 **Autenticação de usuários via JWT**
- 📅 **Agendamento e gestão de atendimentos**


## 📜 Licença

Este projeto está licenciado sob a **MIT License**.


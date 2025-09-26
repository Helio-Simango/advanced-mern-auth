# Advanced MERN Auth 🔐

Um projeto avançado de autenticação construído com a stack **MERN** (MongoDB, Express, React e Node.js), focado em boas práticas de segurança, escalabilidade e flexibilidade no fluxo de autenticação de usuários.  

Este projeto foi estruturado em **backend** e **frontend**, permitindo separação de responsabilidades e facilidade de manutenção.

---

## 📂 Estrutura do Projeto

```
advanced-mern-auth/
    backend/        # Servidor Express + API de autenticação
    frontend/       # Aplicação cliente (React)
    .env            # Variáveis de ambiente
```

---

## 🚀 Tecnologias Usadas

### Backend
- **Node.js** – Ambiente de execução JavaScript.
- **Express.js** – Framework minimalista para criação de APIs.
- **MongoDB + Mongoose** – Banco de dados NoSQL para persistência de usuários.
- **JWT (JSON Web Tokens)** – Autenticação baseada em tokens.
- **Bcrypt.js** – Criptografia de senhas.
- **Nodemailer + Mailtrap** – Envio e teste de emails transacionais (verificação de email, redefinição de senha).
- **dotenv** – Gerenciamento seguro de variáveis de ambiente.

### Frontend
- **React.js** – Interface de usuário.
- **Axios** – Comunicação com o backend.
- **zustend** – Gerenciamento de estado global.
- **React Router** – Navegação entre rotas protegidas e públicas.

---

## 📌 Funcionalidades Implementadas

### 🔑 Autenticação
- **Cadastro (Signup)** – Criação de conta com email e senha.
- **Login** – Autenticação de usuário com geração de JWT.
- **Logout** – Finalização de sessão e invalidação do token.
- **Check Auth** – Verificação da validade do token JWT para proteger rotas.

### 📧 Emails e Recuperação de Conta
- **Verificação de Email** – Envio de link seguro para ativar a conta.
- **Esqueci minha senha** – Envio de email com link de redefinição.
- **Reset de Senha** – Redefinição segura de senha a partir de token único.

### 🛡️ Segurança
- Hash de senhas com **bcrypt**.
- Tokens de sessão curtos com **JWT**.
- **Middleware verifyToken** para proteger rotas privadas.
- Separação entre **acesso público e rotas autenticadas**.

---

## ⚙️ Configuração

### 1. Clonar o Repositório
```bash
git clone https://github.com/Helio-Simango/advanced-mern-auth.git
cd advanced-mern-auth
```

### 2. Backend
Entrar no diretório `backend`:
```bash
cd backend
npm install
```

Criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://<usuario>:<senha>@<cluster>/<db>
MAILTRAP_TOKEN=seu_token_mailtrap
MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
MAIL_TRAP_API_KEY=seu_api_key_mailtrap
SENDER_EMAIL=seu-email@dominio.com
CLIENT_URL=http://localhost:5173
```

Rodar o servidor:
```bash
npm run dev
```

### 3. Frontend
Entrar no diretório `frontend`:
```bash
cd ../frontend
npm install
```

Rodar a aplicação React:
```bash
npm start
```

O frontend estará disponível em:  
👉 `http://localhost:5173`  
O backend estará disponível em:  
👉 `http://localhost:5000`

---

## 📡 Rotas do Backend

| Método | Rota                       | Descrição |
|--------|-----------------------------|-----------|
| GET    | `/check-auth`               | Verifica se o token JWT é válido |
| POST   | `/signup`                   | Cadastro de usuário |
| POST   | `/login`                    | Login de usuário |
| POST   | `/logout`                   | Logout de usuário |
| POST   | `/verify-email`             | Verificação de email |
| POST   | `/forgot-password`          | Solicitação de redefinição de senha |
| POST   | `/reset-password/:token`    | Redefinição de senha |

---

## 📖 Descrição do Projeto

O **Advanced MERN Auth** é um sistema completo de autenticação que pode servir como **boilerplate** para projetos modernos que precisam de segurança avançada no processo de login e registro de usuários.  

Este projeto cobre desde o fluxo básico de **cadastro e login** até recursos mais sofisticados como **verificação de email** e **recuperação de senha via token**, permitindo que o desenvolvedor foque nas funcionalidades principais da sua aplicação sem se preocupar em reimplementar autenticação do zero.

Ideal para:
- Aplicações SaaS.
- Plataformas que exigem segurança elevada no login.
- Projetos que precisam de **fluxos modernos de autenticação**.

---

## 📌 Próximos Passos (Possíveis Extensões)

- Login Social (Google, GitHub, etc).
- Refresh Tokens + Cookies HttpOnly.
- 2FA (Two-Factor Authentication).
- Rate limiting para rotas de login/signup.
- Logs e monitoramento.

---

## 📝 Licença
Este projeto é open-source e pode ser usado livremente para aprendizado e desenvolvimento de aplicações pessoais ou comerciais.

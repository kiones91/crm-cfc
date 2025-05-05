
# AutoEscola CRM API

API RESTful para gerenciamento de autoescola com Node.js, Express, Prisma e autenticação JWT.

---

## 🚀 Tecnologias

- Node.js + Express
- TypeScript
- Prisma ORM (SQLite)
- JWT para autenticação
- Estrutura modular com Controllers, Routes e Middlewares

---

## 📦 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/autoescola-api.git
cd autoescola-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo .env

Crie um arquivo `.env` com:

```env
PORT=3333
JWT_SECRET=sua_chave_segura
database_url="file:./dev.db"
```

### 4. Gere o banco e cliente Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Rode o seed para criar um usuário

```bash
npm run seed
```

### 6. Inicie o servidor

```bash
npm run dev
```

---

## 🔐 Login (JWT)

### Endpoint

```http
POST /auth/login
```

### Body

```json
{
  "email": "admin@autoescola.com",
  "password": "admin123"
}
```

### Retorno

```json
{
  "token": "JWT_TOKEN_AQUI",
  "user": {
    "id": "...",
    "name": "Administrador",
    "email": "admin@autoescola.com",
    "role": "admin"
  }
}
```

---

## 📚 Endpoints protegidos (usar token no header)

Header:
```
Authorization: Bearer SEU_TOKEN
```

---

## 👨‍🎓 Alunos (Students)

| Método | Rota             | Descrição        |
|--------|------------------|------------------|
| GET    | /students        | Listar alunos    |
| GET    | /students/:id    | Buscar por ID    |
| POST   | /students        | Criar aluno      |
| PUT    | /students/:id    | Atualizar aluno  |
| DELETE | /students/:id    | Remover aluno    |

---

## 🧑‍🏫 Instrutores (Instructors)

| Método | Rota                | Descrição            |
|--------|---------------------|-----------------------|
| GET    | /instructors        | Listar instrutores    |
| GET    | /instructors/:id    | Buscar por ID         |
| POST   | /instructors        | Criar instrutor       |
| PUT    | /instructors/:id    | Atualizar instrutor   |
| DELETE | /instructors/:id    | Remover instrutor     |

---

## 🚗 Veículos (Vehicles)

| Método | Rota              | Descrição         |
|--------|-------------------|-------------------|
| GET    | /vehicles         | Listar veículos   |
| GET    | /vehicles/:id     | Buscar por ID     |
| POST   | /vehicles         | Criar veículo     |
| PUT    | /vehicles/:id     | Atualizar veículo |
| DELETE | /vehicles/:id     | Remover veículo   |

---

## 📝 Aulas (Lessons)

| Método | Rota             | Descrição        |
|--------|------------------|------------------|
| GET    | /lessons         | Listar aulas     |
| GET    | /lessons/:id     | Buscar por ID    |
| POST   | /lessons         | Criar aula       |
| PUT    | /lessons/:id     | Atualizar aula   |
| DELETE | /lessons/:id     | Remover aula     |

---

## 📋 Exames (Exams)

| Método | Rota            | Descrição         |
|--------|-----------------|-------------------|
| GET    | /exams          | Listar exames     |
| GET    | /exams/:id      | Buscar por ID     |
| POST   | /exams          | Criar exame       |
| PUT    | /exams/:id      | Atualizar exame   |
| DELETE | /exams/:id      | Remover exame     |

---

## 📂 Estrutura do projeto

```
api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

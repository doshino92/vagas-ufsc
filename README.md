# Vagas UFSC

Plataforma web de divulgação e candidatura a vagas de emprego voltada à comunidade da UFSC. O sistema permite que recrutadores publiquem e gerenciem vagas, enquanto candidatos podem buscar, visualizar e se candidatar a oportunidades. Usuários recebem notificações sobre atualizações em suas candidaturas.

## Funcionalidades

- Cadastro e autenticação de usuários com papéis distintos (candidato e recrutador)
- Publicação, edição e exclusão de vagas pelos recrutadores
- Feed de vagas com busca e filtros
- Candidatura a vagas e acompanhamento das candidaturas
- Painel do recrutador com listagem de candidatos por vaga
- Sistema de notificações

## Tecnologias

- **Front-end:** React, Vite, React Router
- **Back-end:** Node.js, Express
- **Banco de dados:** MongoDB (Mongoose)
- **Autenticação:** JWT, bcryptjs
- **Deploy:** Google Cloud Run

## Membros do Grupo

| Nome | Matrícula |
|---|---|
| Pedro Henrique Espezim da Silva | 19200651 |
| Guilherme dos Santos Hino | 21201192 |
| Victor Seabra | 21204306 |

## Repositório

https://github.com/doshino92/vagas-ufsc

## Aplicação em Produção

https://vagas-ufsc-frontend-962571578704.southamerica-east1.run.app/login

## Como executar localmente

**Back-end:**
```bash
cd backend
npm install
npm run dev
```

**Front-end:**
```bash
cd frontend
npm install
npm run dev
```

> Crie um arquivo `.env` no diretório `backend` com as variáveis `MONGO_URI`, `JWT_SECRET` e `PORT` antes de iniciar o servidor.

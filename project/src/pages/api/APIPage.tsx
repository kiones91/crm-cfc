// src/pages/api/APIPage.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../../components/ui/Card';

const APIPage: React.FC = () => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
    <pre className="bg-slate-800 text-slate-100 font-mono text-sm p-4 rounded-lg overflow-auto">
      <code>{children}</code>
    </pre>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-primary-600 text-center">
        📘 Documentação da API
      </h1>

      {/* Autenticação */}
      <Card>
        <CardHeader>
          <CardTitle>🔐 Autenticação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Obtenha um JWT para proteger suas requisições:</p>
          <CodeBlock>
{`POST ${baseURL}/auth/login
Content-Type: application/json

{
  "email": "admin@autoescola.com",
  "password": "admin123"
}`}
          </CodeBlock>
          <p>Resposta de sucesso:</p>
          <CodeBlock>
{`{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "cuid...",
    "name": "Administrador",
    "email": "admin@autoescola.com",
    "role": "admin"
  }
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Endpoints Students */}
      <Card>
        <CardHeader>
          <CardTitle>👨‍🎓 Alunos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="grid grid-cols-2 gap-2 list-none">
            {[
              ['GET',    '/students'],
              ['GET',    '/students/:id'],
              ['POST',   '/students'],
              ['PUT',    '/students/:id'],
              ['DELETE', '/students/:id']
            ].map(([m, p]) => (
              <li key={p} className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded font-mono">
                  {m}
                </span>
                <span className="font-mono text-sm">{p}</span>
              </li>
            ))}
          </ul>
          <p>Criar um novo aluno:</p>
          <CodeBlock>
{`curl -X POST "${baseURL}/students" \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "João Silva",
    "cpf": "12345678900",
    "phone": "(11)99999-9999"
  }'`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Endpoints Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>🚗 Aulas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="grid grid-cols-2 gap-2">
            {[
              ['GET',    '/lessons'],
              ['GET',    '/lessons/:id'],
              ['POST',   '/lessons'],
              ['PUT',    '/lessons/:id'],
              ['DELETE', '/lessons/:id']
            ].map(([m, p]) => (
              <li key={p} className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded font-mono">
                  {m}
                </span>
                <span className="font-mono text-sm">{p}</span>
              </li>
            ))}
          </ul>
          <p>Exemplo de filtro por data:</p>
          <CodeBlock>
{`curl "${baseURL}/lessons?date=2025-05-01" \\
  -H "Authorization: Bearer <JWT_TOKEN>"`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle>📣 Webhooks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Inscreva um endpoint para receber eventos:</p>
          <CodeBlock>
{`curl -X POST "${baseURL}/webhooks/subscribe" \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://seuservidor.com/webhook",
    "events": ["student.created","lesson.completed","exam.updated"]
  }'`}
          </CodeBlock>
          <p>Exemplo de payload enviado:</p>
          <CodeBlock>
{`{
  "event": "student.created",
  "data": {
    "id": "cuid123",
    "name": "Maria Souza",
    "cpf": "98765432100",
    "createdAt": "2025-05-02T14:30:00.000Z"
  }
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Variáveis de Ambiente */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Defina no seu <code className="font-mono bg-gray-100 px-1 rounded">.env</code>:</p>
          <CodeBlock>
{`VITE_API_URL=https://api.seudominio.com
# ou http://localhost:3333`}
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIPage;

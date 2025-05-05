// src/pages/support/SupportPage.tsx
import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    question: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Suporte:', formData)
    alert('Obrigado! Em breve entraremos em contato.')
    setFormData({ name: '', email: '', whatsapp: '', question: '' })
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 bg-gradient-to-b from-white to-primary-50 animate-fadeIn">
      <h1 className="text-5xl font-serif text-primary-700 text-center underline decoration-secondary-300 decoration-4">
        Suporte & Manual
      </h1>

      {/* Contato Rápido */}
      <Card className="border-2 border-primary-200 bg-primary-50">
        <CardHeader className="bg-primary-200">
          <CardTitle className="text-primary-800">Contato Rápido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-primary-700">
          <p>
            <strong>E-mail:</strong>{' '}
            <a
              href="mailto:suporte@autoescola.com"
              className="text-secondary-600 hover:underline"
            >
              suporte@autoescola.com
            </a>
          </p>
          <p>
            <strong>WhatsApp:</strong>{' '}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 hover:underline"
            >
              (11) 99999-9999
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Formulário de Perguntas */}
      <Card className="border-2 border-secondary-200 bg-secondary-50">
        <CardHeader className="bg-secondary-200">
          <CardTitle className="text-secondary-800">Faça sua Pergunta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Seu nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <Input
              label="Seu e-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <Input
              label="WhatsApp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              fullWidth
            />
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pergunta / Comentário
              </label>
              <textarea
                id="question"
                name="question"
                rows={4}
                value={formData.question}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-secondary-500 focus:border-secondary-500"
                required
              />
            </div>
            <Button type="submit" variant="secondary" size="lg" fullWidth>
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Manual de Uso Rápido */}
      <Card className="border-2 border-accent-200 bg-accent-50">
        <CardHeader className="bg-accent-200">
          <CardTitle className="text-accent-800">Guia Rápido</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-gray-800">
          {/* Seção: Cadastrar Alunos */}
          <h2 className="font-serif text-primary-700">Cadastrar Alunos</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Menu <strong>Alunos</strong> → <em>Novo Aluno</em>.</li>
            <li>Preencha dados (nome, CPF, etc.).</li>
            <li>Salvar.</li>
          </ol>

          <hr className="my-6 border-primary-300" />

          {/* Seção: Agendar Aulas */}
          <h2 className="font-serif text-primary-700">Agendar Aulas</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Menu <strong>Agenda</strong> → <em>Nova Aula</em>.</li>
            <li>Selecione aluno, instrutor, veículo e horário.</li>
            <li>Confirmar.</li>
          </ol>

          <hr className="my-6 border-primary-300" />

          {/* Outros tópicos */}
          <h2 className="font-serif text-primary-700">Cadastrar Veículos</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Menu <strong>Veículos</strong> → <em>Adicionar Veículo</em>.</li>
            <li>Informe placa, modelo, ano, etc.</li>
            <li>Salvar.</li>
          </ol>

          <hr className="my-6 border-primary-300" />

          <h2 className="font-serif text-primary-700">Cadastrar Instrutores</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Menu <strong>Instrutores</strong> → <em>Novo Instrutor</em>.</li>
            <li>Preencha nome, CPF, telefone e e-mail.</li>
            <li>Salvar.</li>
          </ol>

          <hr className="my-6 border-primary-300" />

          <h2 className="font-serif text-primary-700">Outras Funcionalidades</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Exames:</strong> agendar e registrar resultados.</li>
            <li><strong>Financeiro:</strong> controlar pagamentos e parcelas.</li>
            <li><strong>Configurações:</strong> gerenciar conta e preferências.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default SupportPage

import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/Card'

// Se ainda não tiver seus charts:
// import { BarChart, LineChart } from '../../components/charts'

export default function DashboardPage() {
  // dummy data
  const lessonsPerDay = [
    { date: '2025-05-12', count: 5 },
    { date: '2025-05-13', count: 8 },
    { date: '2025-05-14', count: 3 },
    { date: '2025-05-15', count: 7 },
  ]
  const newStudentsPerWeek = [
    { week: 'W1', count: 10 },
    { week: 'W2', count: 15 },
    { week: 'W3', count: 8 },
    { week: 'W4', count: 12 },
  ]

  return (
    <div className="space-y-8 p-6">
      {/* Hero Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent>👥<strong>234</strong><br/>Alunos</CardContent></Card>
        <Card><CardContent>🧑‍🏫<strong>12</strong><br/>Instrutores</CardContent></Card>
        <Card><CardContent>🚗<strong>8</strong><br/>Veículos</CardContent></Card>
        <Card><CardContent>📅<strong>15</strong><br/>Aulas Hoje</CardContent></Card>
        <Card><CardContent>💰<strong>R$12.345</strong><br/>Receita Mês</CardContent></Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Aulas por Dia</CardTitle></CardHeader>
          <CardContent>
            {/* substitua pelo seu componente de gráfico */}
            <div className="h-40 flex items-center justify-center text-gray-400">
              Gráfico Aulas por Dia
            </div>
            {/* <BarChart data={lessonsPerDay} /> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Novos Cadastros</CardTitle></CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center text-gray-400">
              Gráfico Novos Cadastros
            </div>
            {/* <LineChart data={newStudentsPerWeek} /> */}
          </CardContent>
        </Card>
      </div>

      {/* Próximos Eventos */}
      <Card>
        <CardHeader><CardTitle>Próximas Aulas / Exames</CardTitle></CardHeader>
        <CardContent>
          <ul className="divide-y">
            <li className="py-2 flex justify-between">
              <span>12/05/2025 – 14:00</span>
              <span>João Silva</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>13/05/2025 – 10:00</span>
              <span>Maria Souza</span>
            </li>
            {/* … */}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

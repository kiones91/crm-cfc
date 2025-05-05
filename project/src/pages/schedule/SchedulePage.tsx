// src/pages/schedule/SchedulePage.tsx
import { useState, useEffect } from 'react'
import { Eye, FileEdit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../services/api'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Menu, MenuItem } from '../../components/ui/Menu'

interface Lesson {
  id: string
  date: string
  startTime: string
  endTime: string
  number: number
  student: {
    name: string
    whatsapp?: string
  }
  instructor: {
    name: string
  }
  vehicle: {
    plate: string
    model: string
  }
}

const SchedulePage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.get('/lessons').then(res => {
      // adaptando os campos de data/hora
      const data: Lesson[] = res.data.map((l: any) => ({
        ...l,
        date: new Date(l.date).toLocaleDateString(),
        startTime: new Date(l.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date(new Date(l.date).getTime() + l.duration * 60000)
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }))
      setLessons(data)
    })
  }, [])

  const perPage = 10
  const totalPages = Math.ceil(lessons.length / perPage)
  const paginated = lessons.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600">Gerencie as aulas agendadas</p>
        </div>
        <Button variant="primary">Nova Aula</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'ID',
                  'Aluno',
                  'WhatsApp',
                  'Data',
                  'Início',
                  'Fim',
                  'Aula Nº',
                  'Instrutor',
                  'Veículo',
                  'Ações'
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-700">{l.id}</td>
                  <td className="px-3 py-2 text-xs text-gray-900">{l.student.name}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{l.student.whatsapp}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{l.date}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{l.startTime}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{l.endTime}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{l.number}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{l.instructor.name}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">
                    {l.vehicle.plate} • {l.vehicle.model}
                  </td>
                  <td className="px-3 py-2 text-xs text-right">
                    <Menu
                      trigger={
                        <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full">
                          <MoreVertical size={16} />
                        </button>
                      }
                      align="right"
                      width={140}
                    >
                      <MenuItem icon={<Eye size={16} />}>Ver</MenuItem>
                      <MenuItem icon={<FileEdit size={16} />}>Editar</MenuItem>
                      <MenuItem icon={<Trash2 size={16} />} className="text-error-600 hover:bg-error-50">
                        Excluir
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-6 text-center text-gray-500 text-xs">
                    Nenhuma aula agendada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* paginação */}
        {lessons.length > perPage && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default SchedulePage

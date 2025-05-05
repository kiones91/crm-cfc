// src/pages/instructors/InstructorsPage.tsx
import { useState, useEffect } from 'react'
import { Eye, FileEdit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../services/api'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Menu, MenuItem } from '../../components/ui/Menu'

interface Instructor {
  id: string
  name: string
  cpf?: string
  rg?: string
  whatsapp?: string
  address?: string
  email: string
}

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.get('/instructors').then(res => {
      setInstructors(res.data)
    })
  }, [])

  const perPage = 10
  const totalPages = Math.ceil(instructors.length / perPage)
  const paginated = instructors.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instrutores</h1>
          <p className="text-gray-600">Gerencie os instrutores cadastrados</p>
        </div>
        <Button variant="primary">Novo Instrutor</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Nome', 'CPF', 'RG', 'WhatsApp', 'Endereço', 'E-mail', 'Ações'].map(header => (
                  <th
                    key={header}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map(inst => (
                <tr key={inst.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-900">{inst.name}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{inst.cpf || '—'}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{inst.rg || '—'}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{inst.whatsapp || '—'}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{inst.address || '—'}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{inst.email}</td>
                  <td className="px-3 py-2 text-xs text-right">
                    <Menu
                      trigger={
                        <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full">
                          <MoreVertical size={16} />
                        </button>
                      }
                      align="right"
                      width={120}
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
                  <td colSpan={7} className="px-3 py-6 text-center text-gray-500 text-xs">
                    Nenhum instrutor encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {instructors.length > perPage && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
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

export default InstructorsPage

// src/pages/students/StudentsPage.tsx
import { useState, useEffect } from 'react'
import {
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  FileEdit,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Menu, MenuItem } from '../../components/ui/Menu'
import StatusBadge from '../../components/ui/StatusBadge'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

interface Student {
  id: string
  name: string
  cpf?: string
  rg?: string
  phone?: string
  whatsapp?: string
  category?: string
  status?: string
  progress?: number
  registrationDate?: string
  medicalExamDate?: string
  psychotechnicalExamDate?: string
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    api.get<Student[]>('/students').then(res => setStudents(res.data))
  }, [])

  const filtered = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cpf?.includes(searchTerm) ||
      s.rg?.includes(searchTerm)
    const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory
    return matchesSearch && matchesStatus && matchesCat
  })

  const perPage = 10
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="space-y-6 animate-fadeIn p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
          <p className="text-gray-600">Gerencie os alunos cadastrados</p>
        </div>
        <Link to="/dashboard/students/new">
          <Button variant="primary" leftIcon={<UserPlus size={16} />}>
            Novo Aluno
          </Button>
        </Link>
      </div>

      {/* filtros */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou RG..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-xs focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 bg-gray-50 rounded-md text-xs focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="completed">Concluído</option>
              <option value="inactive">Inativo</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 bg-gray-50 rounded-md text-xs focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="all">Todas as categorias</option>
              <option value="A">Categoria A</option>
              <option value="B">Categoria B</option>
              <option value="AB">Categoria AB</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* tabela */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Nome',
                  'CPF',
                  'RG',
                  'Telefone',
                  'WhatsApp',
                  'Categoria',
                  'Status',
                  'Exame Médico',
                  'Exame Psicotécnico',
                  'Progresso',
                  'Data Cadastro',
                  'Ações',
                ].map(heading => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center cursor-pointer hover:text-gray-700">
                      {heading}
                      {heading === 'Nome' && <ArrowUpDown size={12} className="ml-1" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{s.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{s.cpf}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{s.rg}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{s.phone}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{s.whatsapp}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">{s.category}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs">
                    <StatusBadge status={s.status || 'inactive'} />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {s.medicalExamDate?.slice(0, 10)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {s.psychotechnicalExamDate?.slice(0, 10)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs">
                    <div className="flex items-center">
                      <div className="flex-1 w-20 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-success-500 h-2.5 rounded-full"
                          style={{ width: `${s.progress ?? 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {s.registrationDate?.slice(0, 10)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right text-xs font-medium">
                    <Menu
                      trigger={
                        <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full">
                          <MoreVertical size={16} />
                        </button>
                      }
                      align="right"
                      width={150}
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
                  <td colSpan={12} className="px-3 py-6 text-center text-gray-500 text-xs">
                    Nenhum aluno encontrado com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* paginação */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              Exibindo <span className="font-medium">{paginated.length}</span> de{' '}
              <span className="font-medium">{filtered.length}</span> alunos
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs text-gray-700">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default StudentsPage

// src/pages/finance/FinancePage.tsx
import { useState, useEffect } from 'react'
import {
  Eye,
  FileEdit,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import api from '../../services/api'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Menu, MenuItem } from '../../components/ui/Menu'

interface FinanceRecord {
  id: string
  name: string
  cpf?: string
  rg?: string
  whatsapp?: string
  product: string
  totalValue: number
  paidValue: number
  installmentValue: number
  installmentDate: string
  installmentWithInterest: number
  daysLate: number
}

const FinancePage = () => {
  const [records, setRecords] = useState<FinanceRecord[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.get<FinanceRecord[]>('/finance').then(res => {
      setRecords(res.data)
    })
  }, [])

  const perPage = 10
  const totalPages = Math.ceil(records.length / perPage)
  const paginated = records.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">Controle de pagamentos e parcelas</p>
        </div>
        <Button variant="primary">Novo Registro</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Nome',
                  'CPF',
                  'RG',
                  'WhatsApp',
                  'Produto',
                  'Valor Total',
                  'Valor Pago',
                  'Valor Parcela',
                  'Data Parcela',
                  'Parc. c/ Juros',
                  'Dias Atraso',
                  'Ações'
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">{r.cpf ?? '—'}</td>
                  <td className="px-3 py-2">{r.rg ?? '—'}</td>
                  <td className="px-3 py-2">{r.whatsapp ?? '—'}</td>
                  <td className="px-3 py-2">{r.product}</td>
                  <td className="px-3 py-2">{fmt(r.totalValue)}</td>
                  <td className="px-3 py-2">{fmt(r.paidValue)}</td>
                  <td className="px-3 py-2">{fmt(r.installmentValue)}</td>
                  <td className="px-3 py-2">{new Date(r.installmentDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{fmt(r.installmentWithInterest)}</td>
                  <td className="px-3 py-2">{r.daysLate}</td>
                  <td className="px-3 py-2 text-right">
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
                      <MenuItem
                        icon={<Trash2 size={16} />}
                        className="text-error-600 hover:bg-error-50"
                      >
                        Excluir
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="px-3 py-6 text-center text-gray-500"
                  >
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {records.length > perPage && (
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
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
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

export default FinancePage

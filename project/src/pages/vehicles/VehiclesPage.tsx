// src/pages/vehicles/VehiclesPage.tsx
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

interface Vehicle {
  id: string
  model: string
  year: number
  consumption?: number
  plate: string
  renavan?: string
  ipvaDue?: string
  dpvatDue?: string
  maintenance?: string
  oilChange?: string
  filterChange?: string
}

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.get<Vehicle[]>('/vehicles').then(res => {
      setVehicles(res.data)
    })
  }, [])

  const perPage = 10
  const totalPages = Math.ceil(vehicles.length / perPage)
  const paginated = vehicles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Veículos</h1>
          <p className="text-gray-600">Gerencie os veículos cadastrados</p>
        </div>
        <Button variant="primary">Novo Veículo</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Modelo',
                  'Ano',
                  'Consumo',
                  'Placa',
                  'Renavam',
                  'IPVA Venc.',
                  'DPVAT Venc.',
                  'Manutenção',
                  'Troca de Óleo',
                  'Troca de Filtros',
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
              {paginated.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{v.model}</td>
                  <td className="px-3 py-2">{v.year}</td>
                  <td className="px-3 py-2">{v.consumption ?? '—'}</td>
                  <td className="px-3 py-2">{v.plate}</td>
                  <td className="px-3 py-2">{v.renavan ?? '—'}</td>
                  <td className="px-3 py-2">{v.ipvaDue ?? '—'}</td>
                  <td className="px-3 py-2">{v.dpvatDue ?? '—'}</td>
                  <td className="px-3 py-2">{v.maintenance ?? '—'}</td>
                  <td className="px-3 py-2">{v.oilChange ?? '—'}</td>
                  <td className="px-3 py-2">{v.filterChange ?? '—'}</td>
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
                    colSpan={11}
                    className="px-3 py-6 text-center text-gray-500"
                  >
                    Nenhum veículo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {vehicles.length > perPage && (
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

export default VehiclesPage

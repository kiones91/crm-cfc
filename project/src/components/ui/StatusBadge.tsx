// src/components/ui/StatusBadge.tsx
import React from 'react'

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'completed' | 'inactive' | string
}

const statusStyles: Record<string, string> = {
  active:   'bg-success-50 text-success-700',
  pending:  'bg-warning-50 text-warning-700',
  completed:'bg-primary-50 text-primary-700',
  inactive: 'bg-gray-100 text-gray-600',
}

const statusLabels: Record<string, string> = {
  active:   'Ativo',
  pending:  'Pendente',
  completed:'Concluído',
  inactive: 'Inativo',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.inactive
  const label = statusLabels[status] || 'Desconhecido'

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}

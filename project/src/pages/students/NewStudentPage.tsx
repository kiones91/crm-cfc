// src/pages/students/NewStudentPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function NewStudentPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    rg: '',
    city: '',
    birthDate: '',
    desiredCategory: '',
    renachNumber: '',
    whatsapp: '',
    // … outros campos …
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/students', {
      ...form,
      birthDate: form.birthDate ? new Date(form.birthDate) : undefined,
    })
    navigate('/dashboard/students')
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Cadastrar Novo Aluno</h2>
      <Input label="Nome" name="name" value={form.name} onChange={handleChange} fullWidth />
      <Input label="CPF"  name="cpf"  value={form.cpf}  onChange={handleChange} fullWidth />
      <Input label="RG"   name="rg"   value={form.rg}   onChange={handleChange} fullWidth />
      <Input label="Cidade"   name="city"   value={form.city}   onChange={handleChange} fullWidth />
      <Input label="Data de Nasc." type="date" name="birthDate" value={form.birthDate} onChange={handleChange} fullWidth />
      <Input label="Categoria Pretendida" name="desiredCategory" value={form.desiredCategory} onChange={handleChange} fullWidth />
      <Input label="Nº RENACH" name="renachNumber" value={form.renachNumber} onChange={handleChange} fullWidth />
      <Input label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} fullWidth />
      {/* … demais campos … */}
      <div className="flex justify-end">
        <Button type="submit" variant="primary">Salvar Aluno</Button>
      </div>
    </form>
  )
}

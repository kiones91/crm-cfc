import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'        // usa o cliente Axios central
import { useAuthStore } from '../../stores/authStore'

interface Student {
  id: string
  name: string
  cpf?: string
  rg?: string
  birthDate?: string
  city?: string
  desiredCategory?: string
  renachNumber?: string
  whatsapp?: string
  cfca?: string
  theoryCourseStatus?: string
  medicalExamStatus?: string
  psychotechnicalExamStatus?: string
  enrollmentDate?: string
  medicalExamDate?: string
  psychotechnicalExamDate?: string
  firstContact?: string
}

const StudentDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [student, setStudent] = useState<Student | null>(null)
  const { token } = useAuthStore()  // caso queira checar se já tem token

  useEffect(() => {
    if (id) {
      api
        .get<Student>(`/students/${id}`)
        .then(res => setStudent(res.data))
        .catch(console.error)
    }
  }, [id])

  if (!student) {
    return <div className="p-6">Carregando dados do aluno...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do Aluno</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-2">
        <p><strong>Nome:</strong> {student.name}</p>
        <p><strong>CPF:</strong> {student.cpf}</p>
        <p><strong>RG:</strong> {student.rg}</p>
        <p><strong>Data de Nascimento:</strong> {student.birthDate?.slice(0, 10)}</p>
        <p><strong>Cidade:</strong> {student.city}</p>
        <p><strong>Categoria Pretendida:</strong> {student.desiredCategory}</p>
        <p><strong>Nº RENACH:</strong> {student.renachNumber}</p>
        <p><strong>WhatsApp:</strong> {student.whatsapp}</p>
        <p><strong>CFCA:</strong> {student.cfca}</p>
        <p><strong>Curso Teórico:</strong> {student.theoryCourseStatus}</p>
        <p><strong>Exame Médico:</strong> {student.medicalExamStatus}</p>
        <p><strong>Exame Psicotécnico:</strong> {student.psychotechnicalExamStatus}</p>
        <p><strong>Data da Matrícula:</strong> {student.enrollmentDate?.slice(0, 10)}</p>
        <p><strong>Data Exame Médico:</strong> {student.medicalExamDate?.slice(0, 10)}</p>
        <p><strong>Data Exame Psicotécnico:</strong> {student.psychotechnicalExamDate?.slice(0, 10)}</p>
        <p><strong>Contato Inicial:</strong> {student.firstContact}</p>
      </div>
    </div>
  )
}

export default StudentDetailsPage

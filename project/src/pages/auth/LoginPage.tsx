// src/pages/auth/LoginPage.tsx
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

interface LoginFormValues {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch {
      // o erro já foi setado no store, aqui só impedimos o formulário de navegar
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Entrar no Sistema</h2>

      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Erro ao fazer login</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          type="email"
          fullWidth
          leftIcon={<Mail size={18} className="text-gray-500" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          onClick={clearError}
        />

        <Input
          label="Senha"
          type="password"
          fullWidth
          leftIcon={<Lock size={18} className="text-gray-500" />}
          error={errors.password?.message}
          {...register('password', {
            required: 'Senha é obrigatória',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
          })}
          onClick={clearError}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          fullWidth
        >
          Entrar
        </Button>
      </form>
    </div>
  )
}

export default LoginPage

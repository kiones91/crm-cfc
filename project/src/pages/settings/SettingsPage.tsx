// src/pages/settings/SettingsPage.tsx
import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Switch from '../../components/ui/Switch'
import Select from '../../components/ui/Select'

const SettingsPage: React.FC = () => {
  // 1. Informações da Conta
  const [name, setName] = useState('Administrador')
  const [email, setEmail] = useState('admin@autoescola.com')
  const [password, setPassword] = useState('')
  const role = 'admin' as const  // ou busque de userStore
  const [avatar, setAvatar] = useState<File | null>(null)

  // 2. Personalização Visual
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [brandColor, setBrandColor] = useState<'blue' | 'green' | 'red'>('blue')
  const [compactLayout, setCompactLayout] = useState(false)

  // 3. Preferências do Sistema
  const [dateFormat, setDateFormat] = useState<'dd/MM/yyyy' | 'MM/dd/yyyy'>('dd/MM/yyyy')
  const [timeFormat, setTimeFormat] = useState<'24h' | '12h'>('24h')
  const [defaultCity, setDefaultCity] = useState('São Paulo')
  const [defaultCategory, setDefaultCategory] = useState<'A'|'AB'>('A')

  // 4. Notificações
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [inAppAlerts, setInAppAlerts] = useState(true)
  const [maintenanceReminder, setMaintenanceReminder] = useState(true)

  // 5. Segurança
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<Array<string>>([])
  // para "Encerrar todas", você chamaria API

  // 6. Dados e Backup
  const handleDownloadData = () => { /* chama API para download */ }
  const handleExportCSV = () => { /* chama API para CSV */ }
  const handleDeleteAccount = () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.')) {
      /* chama API de deleção */
    }
  }

  // 7. Recursos Avançados (Admin)
  const handleManagePermissions = () => { /* abre modal */ }
  const handleResetTestData = () => { if (confirm('Resetar dados de teste?')) { /* API */ } }
  const handleWebhooksConfig = () => { /* navega para /dashboard/api */ }

  const handleSave = () => {
    alert('Configurações salvas com sucesso!')
    // aqui você chamaria seu endpoint para persistir
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-primary-700 text-center">
        ⚙️ Configurações do Sistema
      </h1>

      {/* 1. Conta */}
      <Card>
        <CardHeader><CardTitle>1. Informações da Conta</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="👤 Nome" value={name} onChange={e => setName(e.target.value)} fullWidth />
          <Input label="📧 E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
          <Input label="🔐 Alterar Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
          <Input label="🧑‍💼 Função" value={role} disabled fullWidth />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">📷 Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setAvatar(e.target.files?.[0] || null)}
              className="block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Personalização Visual */}
      <Card>
        <CardHeader><CardTitle>2. Personalização Visual</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>🌗 Tema</span>
            <Switch checked={theme === 'dark'} onCheckedChange={val => setTheme(val ? 'dark' : 'light')} />
          </div>
          <Select
            label="🎨 Cor do sistema"
            value={brandColor}
            onChange={e => setBrandColor(e.target.value as any)}
            fullWidth
          >
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
            <option value="red">Vermelho</option>
          </Select>
          <div className="flex items-center justify-between">
            <span>📐 Layout compacto</span>
            <Switch checked={compactLayout} onCheckedChange={setCompactLayout} />
          </div>
        </CardContent>
      </Card>

      {/* 3. Preferências do Sistema */}
      <Card>
        <CardHeader><CardTitle>3. Preferências do Sistema</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Select
            label="📅 Formato de data"
            value={dateFormat}
            onChange={e => setDateFormat(e.target.value as any)}
            fullWidth
          >
            <option value="dd/MM/yyyy">DD/MM/YYYY</option>
            <option value="MM/dd/yyyy">MM/DD/YYYY</option>
          </Select>
          <Select
            label="⏰ Formato de hora"
            value={timeFormat}
            onChange={e => setTimeFormat(e.target.value as any)}
            fullWidth
          >
            <option value="24h">24h</option>
            <option value="12h">12h (AM/PM)</option>
          </Select>
          <Input label="🏙️ Cidade padrão" value={defaultCity} onChange={e => setDefaultCity(e.target.value)} fullWidth />
          <Select
            label="📋 Categoria padrão"
            value={defaultCategory}
            onChange={e => setDefaultCategory(e.target.value as any)}
            fullWidth
          >
            <option value="A">A</option>
            <option value="AB">AB</option>
          </Select>
        </CardContent>
      </Card>

      {/* 4. Notificações */}
      <Card>
        <CardHeader><CardTitle>4. Notificações</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>🔔 Receber avisos por e-mail</span>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <span>💬 Notificações no painel</span>
            <Switch checked={inAppAlerts} onCheckedChange={setInAppAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <span>📆 Lembrete de manutenção de veículos</span>
            <Switch checked={maintenanceReminder} onCheckedChange={setMaintenanceReminder} />
          </div>
        </CardContent>
      </Card>

      {/* 5. Segurança */}
      <Card>
        <CardHeader><CardTitle>5. Segurança</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>🧠 Autenticação em duas etapas</span>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} disabled />
          </div>
          <div>
            <p className="font-medium">📱 Histórico de sessões</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {sessionHistory.length === 0
                ? <li>Nenhuma sessão registrada</li>
                : sessionHistory.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSessionHistory([])}>
            Encerrar todas as sessões
          </Button>
        </CardContent>
      </Card>

      {/* 6. Dados e Backup */}
      <Card>
        <CardHeader><CardTitle>6. Dados e Backup</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Button variant="secondary" size="md" onClick={handleDownloadData}>
            💾 Fazer download dos dados
          </Button>
          <Button variant="secondary" size="md" onClick={handleExportCSV}>
            🔄 Exportar relatórios em CSV
          </Button>
          <Button variant="danger" size="md" onClick={handleDeleteAccount}>
            🗑️ Excluir minha conta
          </Button>
        </CardContent>
      </Card>

      {/* 7. Recursos Avançados (Admin) */}
      <Card>
        <CardHeader><CardTitle>7. Recursos Avançados</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Button variant="ghost" size="md" onClick={handleManagePermissions}>
            👥 Gerenciar permissões de usuários
          </Button>
          <Button variant="ghost" size="md" onClick={handleResetTestData}>
            🔄 Resetar dados de teste
          </Button>
          <Button variant="ghost" size="md" onClick={handleWebhooksConfig}>
            🔧 Configurar webhooks da API
          </Button>
        </CardContent>
      </Card>

      {/* Botão Geral de Salvar */}
      <div className="text-right">
        <Button variant="primary" size="lg" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage

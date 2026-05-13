'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Configuracoes() {
  const navigate = useNavigate()

  // 🔒 SENHA
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erroSenha, setErroSenha] = useState('')
  const [sucessoSenha, setSucessoSenha] = useState(false)

  // 📧 EMAIL
  const [email, setEmail] = useState('thiago@email.com')
  const [novoEmail, setNovoEmail] = useState('')
  const [erroEmail, setErroEmail] = useState('')
  const [sucessoEmail, setSucessoEmail] = useState(false)

  // 🔥 ALTERAR SENHA
  const handleSenha = () => {
    setErroSenha('')
    setSucessoSenha(false)

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErroSenha('Preencha todos os campos')
      return
    }

    if (novaSenha.length < 6) {
      setErroSenha('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    if (novaSenha !== confirmarSenha) {
      setErroSenha('As senhas não coincidem')
      return
    }

    // 🔥 FUTURO: API
    setSucessoSenha(true)

    setSenhaAtual('')
    setNovaSenha('')
    setConfirmarSenha('')
  }

  // 🔥 ALTERAR EMAIL
  const handleEmail = () => {
    setErroEmail('')
    setSucessoEmail(false)

    if (!novoEmail) {
      setErroEmail('Digite um novo email')
      return
    }

    // 🔥 FUTURO: API
    setEmail(novoEmail)
    setNovoEmail('')
    setSucessoEmail(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER COM VOLTAR */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold">Configurações</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* 🔒 SEGURANÇA */}
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>Altere sua senha</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            type="password"
            placeholder="Senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          {erroSenha && (
            <p className="text-red-500 text-sm">{erroSenha}</p>
          )}

          {sucessoSenha && (
            <p className="text-green-500 text-sm">
              ✅ Senha alterada com sucesso
            </p>
          )}

          <Button onClick={handleSenha}>
            <Save className="w-4 h-4 mr-2" />
            Alterar senha
          </Button>

        </CardContent>
      </Card>

      {/* 📧 CONTA */}
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
          <CardDescription>Altere seu email</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            disabled
            value={email}
          />

          <Input
            placeholder="Novo email"
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
          />

          {erroEmail && (
            <p className="text-red-500 text-sm">{erroEmail}</p>
          )}

          {sucessoEmail && (
            <p className="text-green-500 text-sm">
              ✅ Email atualizado com sucesso
            </p>
          )}

          <Button onClick={handleEmail}>
            <Save className="w-4 h-4 mr-2" />
            Alterar email
          </Button>

        </CardContent>
      </Card>

      </div>
    </div>
  )
}
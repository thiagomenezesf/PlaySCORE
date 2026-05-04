'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Configuracoes() {

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
    <div className="p-6 space-y-6">

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
  )
}
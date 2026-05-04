'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Perfil() {
  const [editando, setEditando] = useState(false)

  // 🔥 MOCK USUÁRIO
  const [user, setUser] = useState({
    nome: 'Thiago Menezes',
    username: 'thiagomz',
    email: 'thiago@email.com',
    time: 'PlayScore FC',
    avatar: '',
  })

  const [form, setForm] = useState(user)

  // 🔥 MOCK STATS MELHORADOS
  const stats = {
    melhorLiga: {
      nome: 'Liga dos Amigos',
      posicao: 3,
      logo: '',
    },
    pontos: 1245,
    melhorPosicao: 1,
    ligas: 5,
    titulos: 2,
  }

  const handleSave = () => {
    setUser(form)
    setEditando(false)
  }

  const handleCancel = () => {
    setForm(user)
    setEditando(false)
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.nome.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">{user.nome}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          {!editando ? (
            <Button onClick={() => setEditando(true)}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* INFORMAÇÕES */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">

          <Input
            disabled={!editando}
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Nome"
          />

          <Input
            disabled={!editando}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Username"
          />

          <Input
            disabled
            value={form.email}
            placeholder="Email"
          />

          <Input
            disabled={!editando}
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            placeholder="Nome do time"
          />

        </CardContent>
      </Card>

      {/* ESTATÍSTICAS */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-5 gap-4">

          {/* 🔥 MELHOR LIGA */}
          <div className="p-4 bg-muted rounded">
            <p className="text-sm text-muted-foreground mb-2">
              Minha melhor liga
            </p>

            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={stats.melhorLiga.logo} />
                <AvatarFallback>
                  {stats.melhorLiga.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{stats.melhorLiga.nome}</p>
                <p className="text-sm text-muted-foreground">
                  🏆 #{stats.melhorLiga.posicao}
                </p>
              </div>
            </div>
          </div>

          {/* PONTOS */}
          <div className="p-4 bg-muted rounded text-center">
            <p className="text-sm text-muted-foreground">Pontos</p>
            <p className="text-2xl font-bold text-primary">{stats.pontos}</p>
          </div>

          {/* MELHOR POSIÇÃO */}
          <div className="p-4 bg-muted rounded text-center">
            <p className="text-sm text-muted-foreground">Melhor posição</p>
            <p className="text-2xl font-bold">#{stats.melhorPosicao}</p>
          </div>

          {/* LIGAS */}
          <div className="p-4 bg-muted rounded text-center">
            <p className="text-sm text-muted-foreground">Ligas</p>
            <p className="text-2xl font-bold">{stats.ligas}</p>
          </div>

          {/* TÍTULOS */}
          <div className="p-4 bg-muted rounded text-center">
            <p className="text-sm text-muted-foreground">Títulos</p>
            <p className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
              {stats.titulos} 🏆
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
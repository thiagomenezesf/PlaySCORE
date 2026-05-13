'use client'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Shield, Settings, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { mockCampeonatos, mockEquipeLiga, mockEquipesFantasy, mockLigas } from '@/mocks/database'
import { useAuth } from '@/hooks/use-auth'
import type { Campeonato, EquipeFantasy, Liga } from '@/types'

export default function GerenciarLigaPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const liga = (mockLigas as Liga[]).find((item) => item.id === Number(id))

  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState(() => ({
    nome: liga?.nome ?? '',
    descricao: (liga as Liga | undefined)?.descricao ?? '',
    idCampeonato: liga?.idCampeonato.toString() ?? '',
    maxParticipantes: (liga as Liga | undefined)?.maxParticipantes?.toString() ?? '20',
  }))

  if (!liga) {
    return <div className="p-6">Liga não encontrada</div>
  }

  const campeonato = (mockCampeonatos as Campeonato[]).find((camp) => camp.id === liga.idCampeonato)
  const isOwner = liga.idUsuarioCriador === user?.id
  const participantes = mockEquipeLiga.filter((entry) => entry.idLiga === liga.id).length
  const equipes = (mockEquipesFantasy as EquipeFantasy[]).filter((equipe) =>
    mockEquipeLiga.some((entry) => entry.idEquipeFantasy === equipe.id && entry.idLiga === liga.id)
  )

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isOwner) return

    await new Promise((resolve) => setTimeout(resolve, 800))
    navigate(`/ligas/${liga.id}`)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(liga.codigoAcesso)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/ligas/${liga.id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold">Gerenciar Liga</h1>
          <p className="text-muted-foreground">
            Atualize as informações da liga e revise os dados de participação.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Dados da Liga
            </CardTitle>
            <CardDescription>Edite o nome, descrição e o campeonato vinculado.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nome">Nome da Liga</FieldLabel>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    disabled={!isOwner}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
                  <Textarea
                    id="descricao"
                    rows={4}
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    disabled={!isOwner}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="campeonato">Campeonato</FieldLabel>
                  <Select
                    value={formData.idCampeonato}
                    onValueChange={(value) => setFormData({ ...formData, idCampeonato: value })}
                    disabled={!isOwner}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um campeonato" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCampeonatos.map((camp) => (
                        <SelectItem key={camp.id} value={camp.id.toString()}>
                          {camp.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="maxParticipantes">Máximo de Participantes</FieldLabel>
                  <Input
                    id="maxParticipantes"
                    type="number"
                    min={2}
                    value={formData.maxParticipantes}
                    onChange={(e) => setFormData({ ...formData, maxParticipantes: e.target.value })}
                    disabled={!isOwner}
                  />
                </Field>
              </FieldGroup>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" onClick={() => navigate(`/ligas/${liga.id}`)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!isOwner} className="w-full sm:w-auto">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="space-y-3">
            <CardHeader>
              <CardTitle>Resumo da Liga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Código de Acesso</p>
                  <p className="font-medium">{liga.codigoAcesso}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleCopyCode}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copiado' : 'Copiar'}
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Campeonato</span>
                  <span>{campeonato?.nome ?? 'Não vinculado'}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Participantes</span>
                  <span>{participantes}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Equipes</span>
                  <span>{equipes.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Status</span>
                  <Badge variant="secondary">Ativa</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissão</CardTitle>
              <CardDescription>
                {isOwner ? 'Você é o criador desta liga.' : 'Apenas o criador pode editar os dados da liga.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>{isOwner ? 'Proprietário' : 'Somente leitura'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

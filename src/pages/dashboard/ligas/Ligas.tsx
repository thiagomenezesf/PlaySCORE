'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Trophy, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { LeagueCard } from '@/components/playscore/league-card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'

// Dados mockados
const mockLigasCriadas = [
  {
    id: 1,
    nome: 'Liga dos Amigos',
    logo: undefined,
    idCampeonato: 1,
    idUsuarioCriador: 1,
    codigoAcesso: 'ABC123',
    descricao: 'Liga para competir com os amigos do bairro',
    participantes: 8,
    campeonatoNome: 'Campeonato da Varzea 2024',

    // 🔥 NOVO
    detalhes: {
      rodadaAtual: 2,
      participantes: [
        {
          id: 1,
          nome: 'Joao Silva',
          equipe: 'Joao FC',
          pontuacoes: [100, 80],
          patrimonios: [100, 105],
          posicoes: [2, 3],
        },
        {
          id: 2,
          nome: 'Maria Santos',
          equipe: 'Maria United',
          pontuacoes: [90, 110],
          patrimonios: [100, 115],
          posicoes: [3, 1],
        },
        {
          id: 3,
          nome: 'Pedro Costa',
          equipe: 'Pedro City',
          pontuacoes: [95, 70],
          patrimonios: [100, 98],
          posicoes: [1, 2],
        },
      ],
    },
  },

  {
    id: 2,
    nome: 'Pelada FC',
    logo: undefined,
    idCampeonato: 1,
    idUsuarioCriador: 1,
    codigoAcesso: 'XYZ789',
    descricao: 'A liga mais disputada da pelada de domingo',
    participantes: 12,
    campeonatoNome: 'Campeonato da Varzea 2024',

    detalhes: {
      rodadaAtual: 2,
      participantes: [
        {
          id: 4,
          nome: 'Carlos Souza',
          equipe: 'Carlos XI',
          pontuacoes: [80, 95],
          patrimonios: [100, 110],
          posicoes: [5, 3],
        },
      ],
    },
  },
]

const mockLigasParticipo = [
  {
    id: 3,
    nome: 'Super Liga',
    logo: undefined,
    idCampeonato: 2,
    idUsuarioCriador: 3,
    codigoAcesso: 'SUP456',
    descricao: 'A liga mais competitiva da regiao',
    participantes: 20,
    campeonatoNome: 'Copa Universitaria',

    detalhes: {
      rodadaAtual: 2,
      participantes: [
        {
          id: 5,
          nome: 'Ana Oliveira',
          equipe: 'Ana FC',
          pontuacoes: [110, 105],
          patrimonios: [100, 120],
          posicoes: [1, 1],
        },
      ],
    },
  },
]

export const mockTodasLigas = [
  ...mockLigasCriadas,
  ...mockLigasParticipo,
  {
    id: 4,
    nome: 'Liga Master',
    logo: undefined,
    idCampeonato: 3,
    idUsuarioCriador: 4,
    codigoAcesso: 'MAS789',
    descricao: 'Liga para os mestres do fantasy',
    participantes: 16,
    campeonatoNome: 'Mundial de Fantasy',

    detalhes: {
      rodadaAtual: 2,
      participantes: [],
    },
  },
]

export default function LigasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [codigoAcesso, setCodigoAcesso] = useState('')

  const handleEntrarLiga = () => {
    // TODO: Integrar com Spring Boot
    console.log('Entrando na liga com codigo:', codigoAcesso)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Ligas</h1>
          <p className="text-muted-foreground">
            Gerencie suas ligas e encontre novas competicoes.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Entrar com Código
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Entrar em uma Liga</DialogTitle>
                <DialogDescription>
                  Digite o codigo de acesso fornecido pelo criador da liga.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="codigo">Codigo de Acesso</FieldLabel>
                  <Input
                    id="codigo"
                    placeholder="Ex: ABC123"
                    value={codigoAcesso}
                    onChange={(e) => setCodigoAcesso(e.target.value.toUpperCase())}
                    maxLength={10}
                  />
                </Field>
                <Button onClick={handleEntrarLiga} className="w-full">
                  Entrar na Liga
                </Button>
              </FieldGroup>
            </DialogContent>
          </Dialog>
          <Button asChild>
            <Link to="/ligas/criar">
              <Plus className="h-4 w-4 mr-2" />
              Criar Liga
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar ligas..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="todas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="todas" className="gap-2">
            <Search className="h-4 w-4" />
            Todas as Ligas
          </TabsTrigger>
          <TabsTrigger value="criadas" className="gap-2">
            <Trophy className="h-4 w-4" />
            Ligas Criadas
          </TabsTrigger>
          <TabsTrigger value="participo" className="gap-2">
            <Users className="h-4 w-4" />
            Ligas que Participo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTodasLigas
              .filter(liga => liga.nome.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((liga) => (
                <LeagueCard
                  key={liga.id}
                  liga={liga}
                  isOwner={liga.idUsuarioCriador === 1}
                  showJoinButton={true}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="criadas" className="space-y-6">
          {mockLigasCriadas.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockLigasCriadas
                .filter(liga => liga.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((liga) => (
                  <LeagueCard
                    key={liga.id}
                    liga={liga}
                    isOwner={true}
                  />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma liga criada</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Voce ainda nao criou nenhuma liga. Crie uma agora!
                </p>
                <Button asChild>
                  <Link to="/ligas/criar">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Liga
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="participo" className="space-y-6">
          {mockLigasParticipo.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockLigasParticipo
                .filter(liga => liga.nome.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((liga) => (
                  <LeagueCard
                    key={liga.id}
                    liga={liga}
                    isOwner={false}
                  />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Voce nao participa de nenhuma liga</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Entre em uma liga usando o codigo de acesso.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
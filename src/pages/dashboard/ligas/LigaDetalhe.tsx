'use client'

import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Copy, Check, Medal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { mockTodasLigas } from './Ligas'

export default function LigaDetalhe() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [copied, setCopied] = useState(false)
  const [tipoRanking, setTipoRanking] = useState<'geral' | 'rodada'>('geral')

  const liga = mockTodasLigas.find(l => l.id === Number(id))

  if (!liga || !liga.detalhes) {
    return <div className="p-6">Liga não encontrada</div>
  }

  const rodadaAtual = liga.detalhes.rodadaAtual
  const participantes = liga.detalhes.participantes

  const isOwner = liga.idUsuarioCriador === 1

  // 🔥 FUNÇÕES
  const getUltimaPontuacao = (p: any) => p.pontuacoes[rodadaAtual - 1]
  const getPontuacaoAnterior = (p: any) => p.pontuacoes[rodadaAtual - 2] || 0
  const getVariacaoPontuacao = (p: any) => getUltimaPontuacao(p) - getPontuacaoAnterior(p)

  const getTotal = (p: any) => p.pontuacoes.reduce((a: number, b: number) => a + b, 0)

  const getPatrimonioAtual = (p: any) => p.patrimonios[rodadaAtual - 1]
  const getPatrimonioAnterior = (p: any) => p.patrimonios[rodadaAtual - 2] || 0
  const getVariacaoPatrimonio = (p: any) => getPatrimonioAtual(p) - getPatrimonioAnterior(p)

  const getPosicaoAtual = (p: any) => p.posicoes[rodadaAtual - 1]
  const getVariacaoPosicao = (p: any) =>
    (p.posicoes[rodadaAtual - 2] || p.posicoes[rodadaAtual - 1]) -
    p.posicoes[rodadaAtual - 1]

  const destaqueRodada = [...participantes].sort(
    (a, b) => getUltimaPontuacao(b) - getUltimaPontuacao(a)
  )[0]

  const usuario = participantes[0]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(liga.codigoAcesso)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getMedalColor = (posicao: number) => {
    switch (posicao) {
      case 1: return 'text-yellow-400'
      case 2: return 'text-gray-400'
      case 3: return 'text-amber-600'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* ESQUERDA */}
        <div className="flex items-center gap-4">
          <Link to="/ligas">
            <Button variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{liga.nome}</h1>
              {isOwner && <Badge variant="secondary">Criador</Badge>}
            </div>
            <p className="text-muted-foreground">{liga.campeonatoNome}</p>
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex gap-2 flex-wrap">

          <Button variant="outline" onClick={handleCopyCode}>
            {copied ? 'Copiado!' : `Código: ${liga.codigoAcesso}`}
          </Button>

          {isOwner && (
            <Button
              variant="outline"
              onClick={() => navigate(`/ligas/${id}/gerenciar`)}
            >
              Gerenciar
            </Button>
          )}

          <Button onClick={() => navigate(`/dashboard/escalacao/${id}`)}>
            Escalar Time
          </Button>

        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="classificacao" className="space-y-6">
        <TabsList>
          <TabsTrigger value="classificacao">Classificação</TabsTrigger>
          <TabsTrigger value="regras">Regras</TabsTrigger>
          <TabsTrigger value="scouts">Scouts</TabsTrigger>
        </TabsList>

        {/* CLASSIFICAÇÃO */}
        <TabsContent value="classificacao">

          {/* CARDS */}
          <div className="grid md:grid-cols-5 gap-4 mb-6">

            <div className="p-4 bg-muted rounded">
              <p className="text-sm">🔥 Destaque</p>
              <p className="font-bold">{destaqueRodada?.nome}</p>
              <p className='text-xl font-bold text-green-400'>{getUltimaPontuacao(destaqueRodada)} pts</p>
            </div>

            <div className="p-4 bg-muted rounded">
              <p className="text-sm">Sua posição</p>
              <p className="text-2xl font-bold">#{getPosicaoAtual(usuario)}</p>
            </div>

            <div className="p-4 bg-muted rounded">
              <p className="text-sm">Evolução</p>
              <p className={getVariacaoPosicao(usuario) >= 0 ? "text-xl font-bold text-green-400" : "text-xl font-bold text-red-400"}>
                {getVariacaoPosicao(usuario) > 0 ? '↑' : '↓'}
                {Math.abs(getVariacaoPosicao(usuario))}
              </p>
            </div>

            <div className="p-4 bg-muted rounded">
              <p className="text-sm">Sua pontuação</p>
              <p className="text-xl font-bold text-green-400">
                {getUltimaPontuacao(usuario)} pts
              </p>
              <p className={getVariacaoPontuacao(usuario) >= 0 ? 'text-green-400' : 'text-red-400'}>
                {getVariacaoPontuacao(usuario) >= 0 ? '↑' : '↓'}
                {Math.abs(getVariacaoPontuacao(usuario))}
              </p>
            </div>

            <div className="p-4 bg-muted rounded">
              <p className="text-sm">Patrimônio</p>
              <p className="text-xl font-bold">
                C$ {getPatrimonioAtual(usuario)}
              </p>
              <p className={getVariacaoPatrimonio(usuario) >= 0 ? 'text-green-400' : 'text-red-400'}>
                {getVariacaoPatrimonio(usuario) >= 0 ? '↑' : '↓'}
                {Math.abs(getVariacaoPatrimonio(usuario))}
              </p>
            </div>

          </div>

          {/* FILTRO */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={tipoRanking === 'geral' ? 'default' : 'outline'}
              onClick={() => setTipoRanking('geral')}
            >
              Geral
            </Button>

            <Button
              variant={tipoRanking === 'rodada' ? 'default' : 'outline'}
              onClick={() => setTipoRanking('rodada')}
            >
              Rodada
            </Button>
          </div>

          {/* TABELA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Ranking da Liga
              </CardTitle>
              <CardDescription>
                Classificação dos participantes
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Participante</TableHead>
                    <TableHead>Equipe</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                    <TableHead>Patrimônio</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {participantes.map((p: any) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        {getPosicaoAtual(p) <= 3 ? (
                          <Medal className={`h-5 w-5 ${getMedalColor(getPosicaoAtual(p))}`} />
                        ) : (
                          getPosicaoAtual(p)
                        )}
                      </TableCell>

                      <TableCell>{p.nome}</TableCell>
                      <TableCell>{p.equipe}</TableCell>

                      <TableCell className="text-right font-bold text-primary">
                        {tipoRanking === 'geral'
                          ? getTotal(p)
                          : getUltimaPontuacao(p)}
                      </TableCell>

                      <TableCell>
                        C$ {getPatrimonioAtual(p)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REGRAS */}
        <TabsContent value="regras">
          <Card>
            <CardHeader>
              <CardTitle>Regras da Liga</CardTitle>
              <CardDescription>
                Configurações e sistema de pontuação
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Patrimônio Inicial</p>
                  <p className="text-xl font-bold">C$ 100</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Formação</p>
                  <p className="text-xl font-bold">4-3-3</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Capitão</p>
                  <p className="text-xl font-bold">Ativo</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Sistema de Pontuação</h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded flex justify-between">
                    <span>⚽ Gol</span>
                    <span className="font-bold text-green-400">+10</span>
                  </div>

                  <div className="p-3 bg-muted rounded flex justify-between">
                    <span>🎯 Assistência</span>
                    <span className="font-bold text-green-400">+5</span>
                  </div>

                  <div className="p-3 bg-muted rounded flex justify-between">
                    <span>🟨 Cartão amarelo</span>
                    <span className="font-bold text-red-400">-2</span>
                  </div>

                  <div className="p-3 bg-muted rounded flex justify-between">
                    <span>🟥 Cartão vermelho</span>
                    <span className="font-bold text-red-500">-5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SCOUTS */}
        <TabsContent value="scouts">
          <Card>
            <CardHeader>
              <CardTitle>Top jogadores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Em breve: estatísticas dos melhores jogadores
              </p>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
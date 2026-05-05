'use client'

import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, User, DollarSign, TrendingUp, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import type { Atleta } from '@/types'
import { Toaster } from '@/components/ui/toaster'
import { X } from 'lucide-react'

type JogadorEscalado = {
  id: number
  nome: string
  posicao: Atleta['posicao']
  preco: number
  clube: string
  isCapitao: boolean
  pontuacao?: number
}

type FormacaoTatica = {
  nome: string
  estrutura: Partial<Record<Atleta['posicao'], number>>
}

/* ================= MOCKS ================= */

//POSIÇÕES DETERMINADAS DE ACORDO COM O NÚMERO DE JOGADORES EM CAMPO
const posicaoLabels: Record<string, string> = {
  GOL: 'Goleiro',
  ZAG: 'Zagueiro',
  LAT: 'Lateral',
  MEI: 'Meia',
  ATA: 'Atacante',

  // FUTSAL
  FIXO: 'Fixo',
  ALA: 'Ala',
  PIVO: 'Pivô',
}

/* ====== ESQUEMAS TÁTICOS DISPONÍVEIS EM CADA "TIPO DE JOGO" ====== */

//CAMPO
const formacoes11v11: FormacaoTatica[] = [
  { nome: '3-4-3', estrutura: { GOL: 1, ZAG: 3, MEI: 4, ATA: 3 } },
  { nome: '3-5-2', estrutura: { GOL: 1, ZAG: 3, MEI: 5, ATA: 2 } },
  { nome: '4-3-3', estrutura: { GOL: 1, ZAG: 2, LAT: 2, MEI: 3, ATA: 3 } },
  { nome: '4-4-2', estrutura: { GOL: 1, ZAG: 2, LAT: 2, MEI: 4, ATA: 2 } },
  { nome: '5-2-3', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 2, ATA: 3 } },
  { nome: '5-3-2', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 3, ATA: 2 } },
  { nome: '5-4-1', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 4, ATA: 1 } },
]

//FUTSAL
const formacoes5v5: FormacaoTatica[] = [
  { nome: '1-2-1', estrutura: { GOL: 1, FIXO: 1, ALA: 2, PIVO: 1 } },
  { nome: '2-2 (2 alas e 2 pivôs)', estrutura: { GOL: 1, ALA: 2, PIVO: 2 } },
  { nome: '2-2 (2 fixos e 2 pivôs)', estrutura: {GOL: 1, FIXO: 2, PIVO: 2}},
  { nome: '2-2 (2 fixos e 2 alas)', estrutura: {GOL: 1, FIXO: 2, ALA: 2}}
]

//FUT7
const formacoes8v8: FormacaoTatica[] = [
  { nome: '3-4-3', estrutura: { GOL: 1, ZAG: 3, MEI: 4, ATA: 3 } },
  { nome: '3-5-2', estrutura: { GOL: 1, ZAG: 3, MEI: 5, ATA: 2 } },
  { nome: '4-3-3', estrutura: { GOL: 1, ZAG: 2, LAT: 2, MEI: 3, ATA: 3 } },
  { nome: '4-4-2', estrutura: { GOL: 1, ZAG: 2, LAT: 2, MEI: 4, ATA: 2 } },
  { nome: '5-2-3', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 2, ATA: 3 } },
  { nome: '5-3-2', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 3, ATA: 2 } },
  { nome: '5-4-1', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 4, ATA: 1 } },
]

//TIPOS DE JOGO (CAMPO, SALÃO, ETC)
const tiposJogo = {
  CAMPO: {
    formacoes: formacoes11v11,
    ordemCampo: ['ATA', 'MEI', 'LAT', 'ZAG', 'GOL']
  },

  FUTSAL: {
    formacoes: formacoes5v5,
    ordemCampo: ['PIVO', 'ALA', 'FIXO', 'GOL']
  }
}

const configJogo = const configJogo = tiposJogo[mockTodosCampeonatos.tipoJogo]

// 🔥 MOCK pontuação jogador
const getPontuacaoJogador = (id: number) => {
  return Number((Math.random() * 10).toFixed(2))
}

const mockMeuTime = {
  nome: 'Meu Time FC',
  patrimonio: 105.5,
  pontuacaoTotal: null,
  escalados: [] as JogadorEscalado[],
}

const mockMercado: Atleta[] = [
  { id: 12, nome: 'Gabriel Nunes', posicao: 'GOL', precoInicial: 8.5, idClube: 1, clube: { id: 1, nome: 'Palmeirinha FC', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(12) },
  { id: 13, nome: 'Rafael Costa', posicao: 'ZAG', precoInicial: 7.0, idClube: 2, clube: { id: 2, nome: 'Corinthians da Varzea', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(13) },
  { id: 14, nome: 'Lucas Freitas', posicao: 'ZAG', precoInicial: 7.0, idClube: 2, clube: { id: 2, nome: 'Corinthians da Varzea', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(14) },
  { id: 15, nome: 'Leandro Silva', posicao: 'LAT', precoInicial: 6.0, idClube: 3, clube: { id: 3, nome: 'Santos Amador', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(15) },
  { id: 16, nome: 'Joao Miguel', posicao: 'LAT', precoInicial: 6.0, idClube: 3, clube: { id: 3, nome: 'Santos Amador', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(16) },
  { id: 17, nome: 'Fabio Mendes', posicao: 'MEI', precoInicial: 9.0, idClube: 1, clube: { id: 1, nome: 'Palmeirinha FC', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(17) },
  { id: 18, nome: 'Felipe Melo', posicao: 'MEI', precoInicial: 9.0, idClube: 1, clube: { id: 1, nome: 'Palmeirinha FC', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(18) },
  { id: 19, nome: 'Rogerio Cips', posicao: 'MEI', precoInicial: 9.0, idClube: 1, clube: { id: 1, nome: 'Palmeirinha FC', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(19) },
  { id: 20, nome: 'Henrique Lima', posicao: 'ATA', precoInicial: 11.0, idClube: 4, clube: { id: 4, nome: 'Sao Paulo Pelada', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(20) },
  { id: 21, nome: 'Diego Santos', posicao: 'ATA', precoInicial: 10.0, idClube: 5, clube: { id: 5, nome: 'Flamengo Amador', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(21) },
  { id: 22, nome: 'Leo Lima', posicao: 'ATA', precoInicial: 11.0, idClube: 4, clube: { id: 4, nome: 'Sao Paulo Pelada', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(22) },
  { id: 23, nome: 'Bruno Geison', posicao: 'ATA', precoInicial: 11.0, idClube: 4, clube: { id: 4, nome: 'Sao Paulo Pelada', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(23) },
  { id: 24, nome: 'Meia Geison', posicao: 'MEI', precoInicial: 11.0, idClube: 4, clube: { id: 4, nome: 'Sao Paulo Pelada', idCampeonato: 1 }, pontuacao: getPontuacaoJogador(24) }


]

/* ================= CORES ================= */

const posicaoColors = {
  GOL: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  ZAG: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LAT: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  MEI: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  ATA: 'bg-red-500/20 text-red-400 border-red-500/30',

  FIXO: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ALA: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  PIVO: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

/* ================= COMPONENT ================= */

export default function EscalacaoPage() {
  const { toast } = useToast()

  const [searchParams] = useSearchParams()
  const ligaId = searchParams.get('liga')

  const [searchTerm, setSearchTerm] = useState('')
  const [formacao, setFormacao] = useState(
  configJogo.formacoes[0]
)
  const [time, setTime] = useState(mockMeuTime)

  const [posicaoFiltro, setPosicaoFiltro] = useState<Atleta['posicao'] | 'ALL'>('ALL')
  const [slotSelecionado, setSlotSelecionado] = useState<Atleta['posicao'] | null>(null)

  const [mercadoFechado, setMercadoFechado] = useState(false)

  const gastoTotal = time.escalados.reduce((acc, a) => acc + a.preco, 0)
  const patrimonioRestante = time.patrimonio - gastoTotal
  const rodadaTemPontuacao = time.pontuacaoTotal !== null

  const totalJogadores = Object.values(formacao.estrutura)
  .reduce((acc, val) => acc + val, 0)

  const adicionarJogador = (atleta: Atleta) => {
  const pos = atleta.posicao
  const limite = formacao.estrutura[pos]

  const jogadoresPos = time.escalados.filter(a => a.posicao === pos)

  if (jogadoresPos.length >= limite) return

  const jaExiste = time.escalados.some(a => a.id === atleta.id)

  if (jaExiste) return

  const novoJogador: JogadorEscalado = {
    id: atleta.id,
    nome: atleta.nome,
    posicao: pos,
    preco: atleta.precoInicial,
    clube: atleta.clube?.nome || '',
    isCapitao: false,
    pontuacao: atleta.pontuacao
  }

  setTime({
    ...time,
    escalados: [...time.escalados, novoJogador]
  })
}

  const removerJogador = (id: number) => {
    setTime({ ...time, escalados: time.escalados.filter(a => a.id !== id) })
  }

  const definirCapitao = (id: number) => {
    setTime({
      ...time,
      escalados: time.escalados.map(a => ({
        ...a,
        isCapitao: a.id === id
      }))
    })
  }

  const limparTime = () => {
    setTime({ ...time, escalados: [] })
  }

  const handleSalvar = () => {
    toast({
      title: 'Escalação salva',
      description: 'Seu time foi salvo com sucesso!'
    })
  }

  const getJogadores = (pos: Atleta['posicao']) =>
    time.escalados.filter(a => a.posicao === pos)

  const mercadoFiltrado = mockMercado
    .filter(a => a.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(a => posicaoFiltro === 'ALL' || a.posicao === posicaoFiltro)

  const posicoesDisponiveis = Array.from(
    new Set(mockMercado.map(a => a.posicao))
  )

  const handleSelecionarSlot = (pos: Atleta['posicao']) => {
    setSlotSelecionado(pos)
    setPosicaoFiltro(pos)
  }

  return (
    <div className="space-y-6">
      <Toaster />

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/ligas/${ligaId}`}>
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Escalação</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={limparTime}>
            Limpar Escalação
          </Button>
          <Button onClick={handleSalvar}>
            Salvar Escalação
          </Button>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex gap-3 items-center">
          <div className="p-2 rounded bg-green-500/20 border border-green-500/30">
            <DollarSign className="text-green-400" />
          </div>
          <div><p className="text-sm">Patrimônio Restante</p><p className="font-bold">C$ {patrimonioRestante.toFixed(2)}</p></div>
        </CardContent></Card>

        <Card><CardContent className="p-4 flex gap-3 items-center">
          <div className="p-2 rounded bg-yellow-500/20 border border-yellow-500/30">
            <TrendingUp className="text-yellow-400" />
          </div>
          <div><p className="text-sm">Gasto</p><p className="font-bold">C$ {gastoTotal}</p></div>
        </CardContent></Card>

        <Card><CardContent className="p-4 flex gap-3 items-center">
          <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/30">
            <User className="text-emerald-400" />
          </div>
          <div><p className="text-sm">Escalados</p><p className="font-bold">{time.escalados.length}/{totalJogadores}</p></div>
        </CardContent></Card>

        <Card><CardContent className="p-4 flex gap-3 items-center">
          <div className="p-2 rounded bg-amber-500/20 border border-amber-500/30">
            <Star className="text-amber-400" />
          </div>
          <div><p className="font-bold">
            {rodadaTemPontuacao
              ? `${time.pontuacaoTotal} pts`
              : '---'}
          </p></div>
        </CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* CAMPO */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Meu Time Fantasy</CardTitle>
              <CardTitle className="text-green-700 text-[1.5rem] font-bold">
                {rodadaTemPontuacao
                  ? `${time.pontuacaoTotal} pts`
                  : '---'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <Select
                value={formacao.nome}
                onValueChange={(v) => {
                  const novaFormacao = configJogo.formacoes.find(f => f.nome === v)
                  if (!novaFormacao) return

                  const excedeu = Object.entries(novaFormacao.estrutura).some(
                    ([pos, limite]) => {
                      const qtd = time.escalados.filter(j => j.posicao === pos).length
                      return qtd > limite
                    }
                  )

                  if (excedeu) {
                    toast({
                      title: "Formação inválida",
                      description: "Venda jogadores antes de mudar para essa formação.",
                      variant: "destructive"
                    })
                    return
                  }

                  setFormacao(novaFormacao)
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {configJogo.formacoes.map(f => (
                    <SelectItem key={f.nome} value={f.nome}>{f.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* CAMPO EM PÉ */}
              <div className="relative w-full aspect-[4/4] bg-green-700 rounded-xl overflow-hidden">

                {/* HUD SUPERIOR */}
                <div className="absolute top-2 left-4 text-white text-sm font-bold">
                  {formacao.nome}
                </div>

                <div className="absolute inset-4 border border-white/30 rounded-lg" />
                <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-white/30" />
                <div className="absolute left-1/2 top-1/2 w-20 h-20 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />

                <div className="absolute inset-0 flex flex-col justify-around p-4">

  {configJogo.ordemCampo.map(posicao => {

    const quantidade = formacao.estrutura[posicao]

    if (!quantidade) return null

    return (
      <div
        key={posicao}
        className="flex justify-center gap-10"
      >
        {Array.from({ length: quantidade }).map((_, i) => {

          const atleta = getJogadores(posicao as Atleta['posicao'])[i]

          return atleta ? (
            <PlayerSlot
              key={atleta.id}
              atleta={atleta}
              isCapitao={atleta.isCapitao}
              onRemove={removerJogador}
              onCapitao={definirCapitao}
              mostrarPontuacao={mercadoFechado}
            />
          ) : (
            <EmptySlot
              key={i}
              onClick={() =>
                handleSelecionarSlot(posicao as Atleta['posicao'])
              }
              selected={slotSelecionado === posicao}
            />
          )
        })}
      </div>
    )
  })}

</div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* MERCADO */}
        <Card>
          <CardHeader>
            <CardTitle>Mercado de Atletas</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            {!mercadoFechado ? (
              <>
              {/*MERCADO ABERTO*/}
              

            <Input
              placeholder="Buscar jogador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select
            value={posicaoFiltro}
            onValueChange={(v: any) => setPosicaoFiltro(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar posição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas</SelectItem>
                {posicoesDisponiveis.map(pos => (
                  <SelectItem
                    key={pos}
                    value={pos}
                  >
                    {posicaoLabels[pos] || pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {mercadoFiltrado.map(a => {
              const jaEscalado = time.escalados.some(j => j.id === a.id)

              const jogadoresPos = time.escalados.filter(j => j.posicao === a.posicao)
              const limitePosicao = formacao.estrutura[a.posicao]
              const limiteAtingido = jogadoresPos.length >= limitePosicao
              const semDinheiro = a.precoInicial > patrimonioRestante

              return (
                <div key={a.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{a.nome}</p>
                      <p className="text-xs text-muted-foreground">{a.clube?.nome}</p>
                    </div>

                    <Badge className={cn('border text-xs', posicaoColors[a.posicao])}>
                      {a.posicao}
                    </Badge>
                  </div>

                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-muted-foreground">Preço</span>
                    <span className="font-bold text-primary">
                      C$ {a.precoInicial.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    disabled={!jaEscalado && (limiteAtingido || semDinheiro)}
                    className={cn(
                      "w-full mt-2",
                      jaEscalado && "bg-red-500 hover:bg-red-600 text-white",
                      !jaEscalado && (limiteAtingido || semDinheiro) && "bg-gray-400 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (jaEscalado) {
                        removerJogador(a.id)
                      } else {
                        if (semDinheiro) {
                          toast({
                            title: "Saldo insuficiente",
                            description: "Você não tem patrimônio suficiente para esse jogador.",
                            variant: "destructive"
                          })
                          return
                        }

                        if (limiteAtingido) {
                          toast({
                            title: "Limite atingido",
                            description: `Você já tem o máximo de jogadores dessa posição.`,
                            variant: "destructive"
                          })
                          return
                        }

                        adicionarJogador(a)
                      }
                    }}
                  >
                    {jaEscalado
                      ? "Vender"
                      : limiteAtingido
                        ? "Limite atingido"
                        : semDinheiro
                          ? "Sem saldo"
                          : "Escalar"}
                  </Button>
                </div>
              )
            })} 
            </>
            ): (
    <>
      {/* RANKING DA RODADA */}

      <Input
              placeholder="Buscar jogador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select onValueChange={(v: any) => setPosicaoFiltro(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar posição" />
              </SelectTrigger>
              <SelectContent>
                {posicoesDisponiveis.map(pos => (
    <SelectItem
      key={pos}
      value={pos}
    >
      {posicaoLabels[pos] || pos}
    </SelectItem>
  ))}
              </SelectContent>
            </Select>

      {mercadoFiltrado
        .sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0))
        .map((a, index) => (
          <div
            key={a.id}
            className="p-3 rounded-lg bg-muted/50"
          >
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">
                  #{index + 1}
                </span>

                <div>
                  <p className="font-medium text-sm">
                    {a.nome}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {a.clube?.nome}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-green-400 font-bold">
                  {a.pontuacao?.toFixed(2)} pts
                </p>

                <Badge className={cn(
                  'border text-xs',
                  posicaoColors[a.posicao]
                )}>
                  {a.posicao}
                </Badge>
              </div>

            </div>
          </div>
      ))}

    </>
  )}

          </CardContent>
        </Card>

      </div>
    </div>
  )
}

/* SLOT */
function EmptySlot({ onClick, selected }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-15 h-15 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer",
        selected ? "border-yellow-400 bg-yellow-400/20" : "border-white/50 hover:bg-white/10"
      )}
    >
      +
    </div>
  )
}

/* PLAYER */

function PlayerSlot({ atleta, isCapitao, onRemove, onCapitao, mostrarPontuacao }: any) {
  const [openMenu, setOpenMenu] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 👉 fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center relative">

      <div
        onClick={() => setOpenMenu(!openMenu)}
        className={cn(
          'relative w-15 h-15 rounded-full flex items-center justify-center cursor-pointer border-2 bg-white text-black',
          isCapitao ? 'border-yellow-400' : 'border-green-500'
        )}
      >
        <User size={18} />

        {/* CAPITÃO FIXO */}
        {isCapitao && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 text-black text-xs flex items-center justify-center">
            C
          </div>
        )}

        {/* MENU (X + Capitão) */}
        {openMenu && (
          <>
            {/* REMOVER */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                onRemove(atleta.id)
              }}
              className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
            >
              <X size={12} className="text-white" />
            </div>

            {/* CAPITÃO */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                onCapitao(atleta.id)
                setOpenMenu(false)
              }}
              className="absolute -bottom-2 -right-2 w-5 h-5 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center"
            >
              <Star size={12} className="text-black" />
            </div>
          </>
        )}
      </div>

      <span className="text-xs text-white mt-1 bg-black/60 px-1 rounded">
        {atleta.nome.split(' ')[0]}
      </span>
      {mostrarPontuacao && (
        <span className="text-[11px] font-bold text-green-300">
          {atleta.pontuacao?.toFixed(2)} pts
        </span>
      )}
    </div>
  )
}
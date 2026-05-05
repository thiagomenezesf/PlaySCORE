// ==========================================
// TIPOS DO PLAYSCORE - Baseado no modelo lógico
// ==========================================

// Usuário
export interface Usuario {
  id: number
  nome: string
  email: string
  senha?: string
  avatar?: string
  createdAt?: Date
}

export type TipoJogo =
  | 'CAMPO'
  | 'FUTSAL'
  | 'FUT7'

// Campeonato
export interface Campeonato {
  id: number
  nome: string
  logo?: string
  numeroDeJogadoresJogando: number
  idCriador: number
  descricao?: string
  status: 'ativo' | 'inativo' | 'finalizado'
  createdAt?: Date
  tipoJogo: TipoJogo
}

// Liga
export interface Liga {
  id: number
  nome: string
  logo?: string
  idCampeonato: number
  idUsuarioCriador: number
  codigoAcesso: string
  descricao?: string
  maxParticipantes?: number
  createdAt?: Date
}

// Clube
export interface Clube {
  id: number
  nome: string
  logo?: string
  idCampeonato: number
  sigla?: string
}

// ==========================================
// TIPOS AUXILIARES
// ==========================================

export type PosicaoAtleta =
  | 'GOL'
  | 'ZAG'
  | 'LAT'
  | 'MEI'
  | 'ATA'
  | 'FIXO'
  | 'ALA'
  | 'PIVO'

// Atleta
export interface Atleta {
  id: number
  nome: string
  foto?: string
  posicao: PosicaoAtleta
  precoInicial: number
  precoAtual?: number
  idClube: number
  clube?: Clube
  pontuacao?: number
  mediaPontuacao?: number
}

// Equipe Fantasy
export interface EquipeFantasy {
  id: number
  nome: string
  escudo?: string
  idUsuario: number
  idLiga: number
  patrimonio: number
  pontuacaoTotal: number
  formacaoAtual?: string
  atletas?: Atleta[]
}

// Escalação
export interface Escalacao {
  id: number
  idEquipeFantasy: number
  idAtleta: number
  idRodada: number
  isTitular: boolean
  isCapitao?: boolean
}

// Rodada
export interface Rodada {
  id: number
  idCampeonato: number
  numero: number
  dataInicio: Date
  dataFim: Date
  status: 'aberta' | 'em_andamento' | 'fechada' | 'finalizada'
}

// Desempenho do Atleta
export interface DesempenhoAtleta {
  id: number
  idAtleta: number
  idRodada: number
  gols: number
  assistencias: number
  defesasDificeis?: number
  golsSofridos?: number
  cartoesAmarelos: number
  cartoesVermelhos: number
  pontuacaoTotal: number
}

// Participação na Liga
export interface ParticipacaoLiga {
  id: number
  idUsuario: number
  idLiga: number
  idEquipeFantasy: number
  posicaoAtual?: number
  createdAt?: Date
}

// ==========================================
// TIPOS DE NAVEGAÇÃO E UI
// ==========================================

export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavItem[]
}

export interface BreadcrumbItem {
  title: string
  href?: string
}

// ==========================================
// TIPOS DE RESPOSTA DA API
// ==========================================

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ==========================================
// TIPOS DE FORMULÁRIO
// ==========================================

export interface LoginForm {
  email: string
  senha: string
}

export interface CadastroForm {
  nome: string
  email: string
  senha: string
  confirmarSenha: string
}

export interface CriarLigaForm {
  nome: string
  idCampeonato: number
  descricao?: string
  maxParticipantes?: number
}

export interface CriarCampeonatoForm {
  nome: string
  descricao?: string
  logo?: File
}

export interface CriarClubeForm {
  nome: string
  sigla: string
  logo?: File
}

export interface CriarAtletaForm {
  nome: string
  posicao: Atleta['posicao']
  precoInicial: number
  idClube: number
  foto?: File
}

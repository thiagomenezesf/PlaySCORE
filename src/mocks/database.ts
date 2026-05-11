/* ================= MOCKS BASEADOS NO BANCO DE DADOS ================= */

//USUÁRIOS
export const mockUsuarios = [
  {
    id: 1,
    nome: 'Thiago',
    email: 'thiago@gmail.com',
    senha: '123'
  },

  {
    id: 2,
    nome: 'João',
    email: 'joao@gmail.com',
    senha: '123'
  },

  {
    id: 3,
    nome: 'Maria',
    email: 'maria@gmail.com',
    senha: '123'
  }
]

//CAMPEONATOS
export const mockCampeonatos = [
  {
    id: 1,
    nome: 'Campeonato Várzea 2024',
    logo: undefined,
    tipoJogo: 'CAMPO',
    idUsuario: 1
  },

  {
    id: 2,
    nome: 'Copa Universitária',
    logo: undefined,
    tipoJogo: 'FUTSAL',
    idUsuario: 2
  },

  {
    id: 3,
    nome: 'Society Open',
    logo: undefined,
    tipoJogo: 'FUT7',
    idUsuario: 3
  }
]

//LIGAS
export const mockLigas = [
  {
    id: 1,
    nome: 'Liga dos Amigos',
    logo: undefined,
    idCampeonato: 1,
    idUsuarioCriador: 1,
    codigoAcesso: 'ABC123'
  },

  {
    id: 2,
    nome: 'Liga Universitária',
    logo: undefined,
    idCampeonato: 2,
    idUsuarioCriador: 2,
    codigoAcesso: 'FUTSAL'
  },

  {
    id: 3,
    nome: 'Liga Society',
    logo: undefined,
    idCampeonato: 3,
    idUsuarioCriador: 3,
    codigoAcesso: 'SOCIETY'
  }
]

//CLUBES
export const mockClubes = [
  {
    id: 1,
    nome: 'Palmeirinha FC',
    logo: undefined,
    idCampeonato: 1
  },

  {
    id: 2,
    nome: 'Corinthians da Várzea',
    logo: undefined,
    idCampeonato: 1
  },

  {
    id: 3,
    nome: 'Atlética FSP',
    logo: undefined,
    idCampeonato: 2
  }
]

//ATLETAS
export const mockAtletas = [
  {
    id: 1,
    nome: 'Gabriel Nunes',
    foto: undefined,
    posicao: 'GOL',
    precoInicial: 8.5,
    idClube: 1,
    idDesempenhoAtleta: 1
  },

  {
    id: 2,
    nome: 'Lucas Silva',
    foto: undefined,
    posicao: 'ATA',
    precoInicial: 12,
    idClube: 1,
    idDesempenhoAtleta: 2
  },

  {
    id: 3,
    nome: 'Rafael Costa',
    foto: undefined,
    posicao: 'MEI',
    precoInicial: 9,
    idClube: 2,
    idDesempenhoAtleta: 3
  }
]

//RODADAS
export const mockRodadas = [
  {
    id: 1,
    status: 'ABERTO',
    idCampeonato: 1,
    numero: 1
  },

  {
    id: 2,
    status: 'FECHADO',
    idCampeonato: 1,
    numero: 2
  },

  {
    id: 3,
    status: 'ABERTO',
    idCampeonato: 2,
    numero: 1
  }
]

//EQUIPES FANTASY
export const mockEquipesFantasy = [
  {
    id: 1,
    nome: 'Time do Thiago',
    logo: undefined,
    idUsuario: 1
  },

  {
    id: 2,
    nome: 'Os Craques',
    logo: undefined,
    idUsuario: 2
  },

  {
    id: 3,
    nome: 'Equipe Maria',
    logo: undefined,
    idUsuario: 3
  }
]

//DESEMPENHO_ATLETA
export const mockDesempenhoAtleta = [
  {
    id: 1,
    gols: 2,
    assistencias: 1,
    cartoesAmarelos: 0,
    cartoesVermelhos: 0,
    finalizacoes: 5,
    impedimentos: 0,
    faltasCometidas: 2,
    faltasRecebidas: 3,
    caneta: 1,
    chapeu: 0,
    driblesSimples: 4,
    idRodada: 1,
    idAtleta: 1,
    pontosCalculados: 15.5,
    valorAtualizado: 9.0
  },

  {
    id: 2,
    gols: 1,
    assistencias: 2,
    cartoesAmarelos: 1,
    cartoesVermelhos: 0,
    finalizacoes: 3,
    impedimentos: 1,
    faltasCometidas: 1,
    faltasRecebidas: 2,
    caneta: 0,
    chapeu: 1,
    driblesSimples: 6,
    idRodada: 1,
    idAtleta: 2,
    pontosCalculados: 12.0,
    valorAtualizado: 13.0
  },

  {
    id: 3,
    gols: 0,
    assistencias: 3,
    cartoesAmarelos: 0,
    cartoesVermelhos: 0,
    finalizacoes: 2,
    impedimentos: 0,
    faltasCometidas: 0,
    faltasRecebidas: 1,
    caneta: 0,
    chapeu: 0,
    driblesSimples: 3,
    idRodada: 2,
    idAtleta: 3,
    pontosCalculados: 8.5,
    valorAtualizado: 9.5
  }
]

//REGRA_PONTUACAO_LIGA
export const mockRegraPontuacaoLiga = [
  {
    id: 1,
    acao: 'GOLS',
    valor: 5.0,
    idLiga: 1
  },

  {
    id: 2,
    acao: 'ASSISTENCIAS',
    valor: 3.0,
    idLiga: 1
  },

  {
    id: 3,
    acao: 'CARTOES_AMARELOS',
    valor: -1.0,
    idLiga: 1
  },

  {
    id: 4,
    acao: 'CARTOES_VERMELHOS',
    valor: -3.0,
    idLiga: 1
  },

  {
    id: 5,
    acao: 'FINALIZACOES',
    valor: 0.5,
    idLiga: 2
  },

  {
    id: 6,
    acao: 'CANETAS',
    valor: 2.0,
    idLiga: 2
  },

  {
    id: 7,
    acao: 'CHAPEUS',
    valor: 4.0,
    idLiga: 3
  },

  {
    id: 8,
    acao: 'DRIBLES_SIMPLES',
    valor: 1.0,
    idLiga: 3
  }
]

//ESCALACAO
export const mockEscalacao = [
  {
    id: 'esc1',
    idAtleta: 1,
    idRodada: 1,
    idEquipeFantasy: 1
  },

  {
    id: 'esc2',
    idAtleta: 2,
    idRodada: 1,
    idEquipeFantasy: 1
  },

  {
    id: 'esc3',
    idAtleta: 3,
    idRodada: 2,
    idEquipeFantasy: 2
  },

  {
    id: 'esc4',
    idAtleta: 1,
    idRodada: 3,
    idEquipeFantasy: 3
  },

  {
    id: 'esc5',
    idAtleta: 2,
    idRodada: 3,
    idEquipeFantasy: 3
  }
]

//DESEMPENHO_EQUIPE_FANTASY
export const mockDesempenhoEquipeFantasy = [
  {
    id: 1,
    pontuacaoEquipeFantasy: 25.5,
    pontuacaoTotalEquipeFantasy: 25.5,
    idDesempenhoAtleta: 1
  },

  {
    id: 2,
    pontuacaoEquipeFantasy: 12.0,
    pontuacaoTotalEquipeFantasy: 37.5,
    idDesempenhoAtleta: 2
  },

  {
    id: 3,
    pontuacaoEquipeFantasy: 8.5,
    pontuacaoTotalEquipeFantasy: 46.0,
    idDesempenhoAtleta: 3
  },

  {
    id: 4,
    pontuacaoEquipeFantasy: 15.5,
    pontuacaoTotalEquipeFantasy: 15.5,
    idDesempenhoAtleta: 1
  }
]

//EQUIPE_LIGA
export const mockEquipeLiga = [
  {
    id: 1,
    idLiga: 1,
    patrimonio: 120.0,
    idEquipeFantasy: 1
  },

  {
    id: 2,
    idLiga: 2,
    patrimonio: 100.0,
    idEquipeFantasy: 2
  },

  {
    id: 3,
    idLiga: 3,
    patrimonio: 110.0,
    idEquipeFantasy: 3
  },

  {
    id: 4,
    idLiga: 1,
    patrimonio: 95.0,
    idEquipeFantasy: 2
  }
]


import type { Atleta, TipoJogo } from '@/types'

export type FormacaoTatica = {
  nome: string
  estrutura: Partial<Record<Atleta['posicao'], number>>
}

export const posicaoLabels: Record<Atleta['posicao'], string> = {
  GOL: 'Goleiro',
  ZAG: 'Zagueiro',
  LAT: 'Lateral',
  MEI: 'Meia',
  ATA: 'Atacante',
  FIXO: 'Fixo',
  ALA: 'Ala',
  PIVO: 'Pivô',
}

export const posicaoColors: Record<Atleta['posicao'], string> = {
  GOL: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  ZAG: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LAT: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  MEI: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  ATA: 'bg-red-500/20 text-red-400 border-red-500/30',
  FIXO: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ALA: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  PIVO: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

export const formacoes11v11: FormacaoTatica[] = [
  { nome: '3-4-3', estrutura: { GOL: 1, ZAG: 3, MEI: 4, ATA: 3 } },
  { nome: '3-5-2', estrutura: { GOL: 1, ZAG: 3, MEI: 5, ATA: 2 } },
  { nome: '4-3-3', estrutura: { GOL: 1, ZAG: 2, LAT: 2, MEI: 3, ATA: 3 } },
  { nome: '4-4-2', estrutura: { GOL: 1, ZAG: 2, LAT: 2, MEI: 4, ATA: 2 } },
  { nome: '5-2-3', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 2, ATA: 3 } },
  { nome: '5-3-2', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 3, ATA: 2 } },
  { nome: '5-4-1', estrutura: { GOL: 1, ZAG: 3, LAT: 2, MEI: 4, ATA: 1 } },
]

export const formacoes5v5: FormacaoTatica[] = [
  { nome: '1-2-1', estrutura: { GOL: 1, FIXO: 1, ALA: 2, PIVO: 1 } },
  { nome: '2-2 (2 alas e 2 pivôs)', estrutura: { GOL: 1, ALA: 2, PIVO: 2 } },
  { nome: '2-2 (2 fixos e 2 pivôs)', estrutura: { GOL: 1, FIXO: 2, PIVO: 2 } },
  { nome: '2-2 (2 fixos e 2 alas)', estrutura: { GOL: 1, FIXO: 2, ALA: 2 } },
]

export const formacoes7v7: FormacaoTatica[] = [
  { nome: '1-2-2-2', estrutura: { GOL: 1, ZAG: 1, MEI: 2, ATA: 2 } },
  { nome: '2-3-1', estrutura: { GOL: 1, ZAG: 2, MEI: 3, ATA: 1 } },
  { nome: '3-2-1', estrutura: { GOL: 1, ZAG: 3, MEI: 2, ATA: 1 } },
]

export const tiposJogo: Record<TipoJogo, { formacoes: FormacaoTatica[]; ordemCampo: Atleta['posicao'][] }> = {
  CAMPO: {
    formacoes: formacoes11v11,
    ordemCampo: ['ATA', 'MEI', 'LAT', 'ZAG', 'GOL'],
  },
  FUTSAL: {
    formacoes: formacoes5v5,
    ordemCampo: ['PIVO', 'ALA', 'FIXO', 'GOL'],
  },
  FUT7: {
    formacoes: formacoes7v7,
    ordemCampo: ['ATA', 'MEI', 'ZAG', 'GOL'],
  },
}

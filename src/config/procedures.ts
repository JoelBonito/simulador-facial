import { ProcedureConfig } from '@/types'

export const PROCEDURES: ProcedureConfig[] = [
  {
    id: 'facetas-dentarias',
    name: 'Facetas Dentárias',
    description: 'Simule o resultado de facetas dentárias em laminado cerâmico ou resina',
    icon: '🦷',
    color: 'bg-blue-500',
    requiredImages: [
      {
        label: 'Foto Sorrindo',
        description: 'Foto frontal do paciente sorrindo mostrando os dentes',
        type: 'before'
      }
    ]
  },
  {
    id: 'clareamento-dentario',
    name: 'Clareamento Dentário',
    description: 'Visualize o resultado do clareamento dental',
    icon: '✨',
    color: 'bg-cyan-500',
    requiredImages: [
      {
        label: 'Foto Sorrindo',
        description: 'Foto frontal do paciente sorrindo mostrando os dentes',
        type: 'before'
      }
    ]
  },
  {
    id: 'implantes-dentarios',
    name: 'Implantes Dentários',
    description: 'Simule a reposição de dentes com implantes',
    icon: '🦷',
    color: 'bg-indigo-500',
    requiredImages: [
      {
        label: 'Foto Sorrindo',
        description: 'Foto frontal do paciente sorrindo',
        type: 'before'
      },
      {
        label: 'Boca Aberta',
        description: 'Foto da boca aberta mostrando os dentes e falhas',
        type: 'reference'
      }
    ]
  },
  {
    id: 'botox',
    name: 'Botox',
    description: 'Visualize o efeito do botox nas áreas selecionadas',
    icon: '💉',
    color: 'bg-purple-500',
    requiredImages: [
      {
        label: 'Foto Sorrindo',
        description: 'Foto frontal do paciente sorrindo',
        type: 'before'
      },
      {
        label: 'Foto Sem Sorrir',
        description: 'Foto frontal do paciente em repouso, sem sorrir',
        type: 'reference'
      }
    ]
  },
  {
    id: 'harmonizacao-facial',
    name: 'Harmonização Facial',
    description: 'Simule procedimentos de harmonização com preenchimentos',
    icon: '💆',
    color: 'bg-pink-500',
    requiredImages: [
      {
        label: 'Foto Frontal',
        description: 'Foto frontal do rosto do paciente',
        type: 'before'
      },
      {
        label: 'Foto Perfil',
        description: 'Foto de perfil lateral do paciente',
        type: 'reference'
      }
    ]
  },
  {
    id: 'rinomodelacao',
    name: 'Rinomodelação',
    description: 'Visualize o resultado da rinomodelação sem cirurgia',
    icon: '👃',
    color: 'bg-rose-500',
    requiredImages: [
      {
        label: 'Foto Frontal',
        description: 'Foto frontal do rosto do paciente',
        type: 'before'
      },
      {
        label: 'Foto Perfil',
        description: 'Foto de perfil lateral mostrando o nariz',
        type: 'reference'
      }
    ]
  },
  {
    id: 'implantes-capilares',
    name: 'Implantes Capilares',
    description: 'Simule o resultado do transplante capilar',
    icon: '💇',
    color: 'bg-green-500',
    requiredImages: [
      {
        label: 'Foto Frontal',
        description: 'Foto frontal mostrando a linha do cabelo',
        type: 'before'
      },
      {
        label: 'Foto Superior',
        description: 'Foto de cima da cabeça mostrando a área calva',
        type: 'reference'
      }
    ]
  }
]

export const getProcedureById = (id: string): ProcedureConfig | undefined => {
  return PROCEDURES.find(p => p.id === id)
}

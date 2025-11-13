// Tipos de procedimentos disponíveis
export type ProcedureType =
  | 'facetas-dentarias'
  | 'clareamento-dentario'
  | 'implantes-dentarios'
  | 'botox'
  | 'harmonizacao-facial'
  | 'rinomodelacao'
  | 'implantes-capilares'

// Estrutura de um paciente
export interface Patient {
  id: string
  name: string
  email?: string
  phone?: string
  cpf?: string
  birthDate?: string
  createdAt: string
  updatedAt: string
}

// Estrutura de uma imagem
export interface SimulationImage {
  id: string
  type: 'before' | 'after' | 'reference'
  label: string
  url: string
  publicUrl?: string
}

// Formulário técnico base
export interface TechnicalForm {
  [key: string]: any
}

// Formulário para Facetas Dentárias
export interface FacetasForm extends TechnicalForm {
  toothColor: string
  teethQuantity: number
  materialType: 'porcelana' | 'resina'
  notes?: string
}

// Formulário para Implantes Dentários
export interface ImplantesForm extends TechnicalForm {
  missingTeeth: string[]
  implantType: 'unitario' | 'protese-fixa' | 'protese-removivel'
  boneGraftNeeded: boolean
  notes?: string
}

// Formulário para Botox
export interface BotoxForm extends TechnicalForm {
  applicationAreas: string[]
  unitsPerArea: { [area: string]: number }
  previousApplications: boolean
  notes?: string
}

// Formulário para Harmonização Facial
export interface HarmonizacaoForm extends TechnicalForm {
  procedureType: string[]
  fillerType?: string
  volumeML?: number
  areas: string[]
  notes?: string
}

// Formulário para Rinomodelação
export interface RinomodelacaoForm extends TechnicalForm {
  objectives: string[]
  fillerType: string
  volumeML: number
  notes?: string
}

// Formulário para Implantes Capilares
export interface ImplantesCapilaresForm extends TechnicalForm {
  areaType: 'frontal' | 'coroa' | 'temporal' | 'completo'
  estimatedGrafts: number
  technique: 'FUE' | 'FUT'
  sessions: number
  notes?: string
}

// Estrutura de orçamento
export interface Budget {
  procedureType: ProcedureType
  items: BudgetItem[]
  subtotal: number
  discount: number
  total: number
  currency: string
  validUntil: string
  notes?: string
}

export interface BudgetItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

// Estrutura de relatório técnico
export interface TechnicalReport {
  procedureType: ProcedureType
  diagnosis: string
  recommendations: string[]
  contraindications?: string[]
  expectedResults: string
  recoveryTime: string
  careInstructions: string[]
  followUpSchedule?: string
}

// Estrutura completa de uma simulação
export interface Simulation {
  id: string
  patientId: string
  patient: Patient
  procedureType: ProcedureType
  images: SimulationImage[]
  technicalForm: TechnicalForm
  budget: Budget
  technicalReport: TechnicalReport
  status: 'completed' | 'processing' | 'failed'
  createdAt: string
  updatedAt: string
  createdBy?: string
}

// Configuração de procedimento
export interface ProcedureConfig {
  id: ProcedureType
  name: string
  description: string
  icon: string
  requiredImages: {
    label: string
    description: string
    type: 'before' | 'reference'
  }[]
  color: string
}

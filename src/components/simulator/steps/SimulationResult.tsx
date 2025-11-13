import { Download, FileText, DollarSign, Share2, Home } from 'lucide-react'
import { ProcedureType } from '@/types'
import { getProcedureById } from '@/config/procedures'

interface SimulationResultProps {
  result: any
  procedureType: ProcedureType
  patientData: any
  onNewSimulation: () => void
  onBackToMenu: () => void
}

export default function SimulationResult({
  result,
  procedureType,
  patientData,
  onNewSimulation,
  onBackToMenu,
}: SimulationResultProps) {
  const procedure = getProcedureById(procedureType)

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-900">
              Simulação Concluída com Sucesso!
            </h3>
            <p className="text-green-700">
              A simulação de {procedure?.name} foi gerada para {patientData.name}
            </p>
          </div>
        </div>
      </div>

      {/* Before and After Images */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Resultado da Simulação
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-100 rounded-lg p-2 mb-2">
              <p className="text-sm font-semibold text-gray-700 text-center">ANTES</p>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={result.beforeImage || 'https://via.placeholder.com/400x400?text=Antes'}
                alt="Antes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="bg-primary rounded-lg p-2 mb-2">
              <p className="text-sm font-semibold text-white text-center">DEPOIS</p>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden border-4 border-primary">
              <img
                src={result.afterImage || 'https://via.placeholder.com/400x400?text=Depois'}
                alt="Depois"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Orçamento
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Procedimento:</span>
              <span className="font-semibold">{procedure?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Valor Estimado:</span>
              <span className="font-semibold">R$ 4.500,00</span>
            </div>
            <div className="flex justify-between py-3 bg-primary/10 px-3 rounded-lg">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-primary text-xl">R$ 4.500,00</span>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-4">
            <FileText className="w-4 h-4" />
            Ver Orçamento Completo
          </button>
        </div>

        {/* Technical Report */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Relatório Técnico
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Diagnóstico:</p>
              <p className="text-sm font-medium">Paciente apto para o procedimento</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tempo de Recuperação:</p>
              <p className="text-sm font-medium">7 a 14 dias</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Resultados Esperados:</p>
              <p className="text-sm font-medium">Visíveis em 2-4 semanas</p>
            </div>
          </div>

          <button className="btn btn-secondary w-full mt-4">
            <FileText className="w-4 h-4" />
            Ver Relatório Completo
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Baixar Simulação
          </button>

          <button className="btn btn-secondary flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>

          <button
            onClick={onNewSimulation}
            className="btn btn-secondary flex items-center gap-2"
          >
            Nova Simulação
          </button>

          <button
            onClick={onBackToMenu}
            className="btn btn-secondary flex items-center gap-2 ml-auto"
          >
            <Home className="w-4 h-4" />
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  )
}

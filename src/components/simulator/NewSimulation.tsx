import { useState } from 'react'
import { ProcedureType } from '@/types'
import { PROCEDURES } from '@/config/procedures'
import ProcedureSelector from './ProcedureSelector'
import SimulationWizard from './SimulationWizard'

export default function NewSimulation() {
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureType | null>(null)

  if (!selectedProcedure) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Escolha o Procedimento
          </h2>
          <p className="text-gray-700 text-sm">
            Selecione o tipo de simulação que deseja realizar
          </p>
        </div>

        <ProcedureSelector
          procedures={PROCEDURES}
          onSelect={setSelectedProcedure}
        />
      </div>
    )
  }

  return (
    <SimulationWizard
      procedureType={selectedProcedure}
      onBack={() => setSelectedProcedure(null)}
    />
  )
}

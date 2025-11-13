import { useState } from 'react'
import { ProcedureType } from '@/types'
import { PROCEDURES } from '@/config/procedures'
import ProcedureSelector from './ProcedureSelector'
import SimulationWizard from './SimulationWizard'

export default function NewSimulation() {
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureType | null>(null)

  if (!selectedProcedure) {
    return (
      <div className="space-y-4">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Escolha o Procedimento
          </h2>
          <p className="text-gray-600 mb-6">
            Selecione o tipo de procedimento estético que deseja simular
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

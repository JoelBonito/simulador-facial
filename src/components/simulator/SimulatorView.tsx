import { useState } from 'react'
import { Sparkles, History, Users } from 'lucide-react'
import NewSimulation from './NewSimulation'
import SimulationsList from './SimulationsList'
import PatientsList from './PatientsList'

type ViewMode = 'new' | 'simulations' | 'patients'

export default function SimulatorView() {
  const [viewMode, setViewMode] = useState<ViewMode>('new')

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setViewMode('new')}
            className={`flex items-center gap-3 ${
              viewMode === 'new'
                ? 'glass-tab-active'
                : 'glass-tab hover:scale-105'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Nova Simulação
          </button>

          <button
            onClick={() => setViewMode('simulations')}
            className={`flex items-center gap-3 ${
              viewMode === 'simulations'
                ? 'glass-tab-active'
                : 'glass-tab hover:scale-105'
            }`}
          >
            <History className="w-5 h-5" />
            Simulações
          </button>

          <button
            onClick={() => setViewMode('patients')}
            className={`flex items-center gap-3 ${
              viewMode === 'patients'
                ? 'glass-tab-active'
                : 'glass-tab hover:scale-105'
            }`}
          >
            <Users className="w-5 h-5" />
            Pacientes
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in duration-500">
        {viewMode === 'new' && <NewSimulation />}
        {viewMode === 'simulations' && <SimulationsList />}
        {viewMode === 'patients' && <PatientsList />}
      </div>
    </div>
  )
}

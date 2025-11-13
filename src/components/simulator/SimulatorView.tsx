import { useState } from 'react'
import { Sparkles, History, Users } from 'lucide-react'
import NewSimulation from './NewSimulation'
import SimulationsList from './SimulationsList'
import PatientsList from './PatientsList'

type ViewMode = 'new' | 'simulations' | 'patients'

export default function SimulatorView() {
  const [viewMode, setViewMode] = useState<ViewMode>('new')

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="card">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('new')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              viewMode === 'new'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Nova Simulação
          </button>

          <button
            onClick={() => setViewMode('simulations')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              viewMode === 'simulations'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <History className="w-5 h-5" />
            Simulações
          </button>

          <button
            onClick={() => setViewMode('patients')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              viewMode === 'patients'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="w-5 h-5" />
            Pacientes
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {viewMode === 'new' && <NewSimulation />}
        {viewMode === 'simulations' && <SimulationsList />}
        {viewMode === 'patients' && <PatientsList />}
      </div>
    </div>
  )
}

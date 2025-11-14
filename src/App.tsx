import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import NewSimulation from './components/simulator/NewSimulation'
import SimulationsList from './components/simulator/SimulationsList'
import PatientsList from './components/simulator/PatientsList'

type ViewMode = 'new' | 'simulations' | 'patients'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('new')

  return (
    <div className="min-h-screen">
      <Sidebar currentView={viewMode} onViewChange={setViewMode} />

      <main className="ml-64 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'new' && <NewSimulation />}
          {viewMode === 'simulations' && <SimulationsList />}
          {viewMode === 'patients' && <PatientsList />}
        </div>
      </main>
    </div>
  )
}

export default App

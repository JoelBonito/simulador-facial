import { useState } from 'react'
import Header from './components/layout/Header'
import SimulatorView from './components/simulator/SimulatorView'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <SimulatorView />
      </main>
    </div>
  )
}

export default App

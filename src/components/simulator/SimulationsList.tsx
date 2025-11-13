import { Search, Calendar, User, Eye } from 'lucide-react'
import { useState } from 'react'

export default function SimulationsList() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - será substituído por dados reais do Supabase
  const simulations = [
    {
      id: '1',
      patientName: 'Maria Silva',
      procedureType: 'Facetas Dentárias',
      date: '2025-11-10',
      status: 'completed',
    },
    {
      id: '2',
      patientName: 'João Santos',
      procedureType: 'Botox',
      date: '2025-11-09',
      status: 'completed',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Simulações Realizadas
        </h2>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente ou procedimento..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select className="input w-48">
            <option value="">Todos os procedimentos</option>
            <option value="facetas">Facetas Dentárias</option>
            <option value="botox">Botox</option>
            <option value="harmonizacao">Harmonização</option>
          </select>
        </div>
      </div>

      {/* Simulations List */}
      <div className="grid grid-cols-1 gap-4">
        {simulations.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma simulação encontrada
            </h3>
            <p className="text-gray-600">
              As simulações realizadas aparecerão aqui
            </p>
          </div>
        ) : (
          simulations.map((simulation) => (
            <div
              key={simulation.id}
              className="card hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {simulation.procedureType}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Concluído
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {simulation.patientName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(simulation.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Visualizar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

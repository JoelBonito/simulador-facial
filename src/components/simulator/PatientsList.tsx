import { Search, User, Phone, Mail, Calendar, Eye } from 'lucide-react'
import { useState } from 'react'

export default function PatientsList() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - será substituído por dados reais do Supabase
  const patients = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 98765-4321',
      createdAt: '2025-11-10',
      simulationsCount: 2,
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 91234-5678',
      createdAt: '2025-11-09',
      simulationsCount: 1,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Pacientes Cadastrados
        </h2>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.length === 0 ? (
          <div className="col-span-2 card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum paciente cadastrado
            </h3>
            <p className="text-gray-600">
              Os pacientes cadastrados durante as simulações aparecerão aqui
            </p>
          </div>
        ) : (
          patients.map((patient) => (
            <div
              key={patient.id}
              className="card hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.simulationsCount} simulação(ões)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {patient.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {patient.email}
                  </div>
                )}
                {patient.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {patient.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Cadastrado em {new Date(patient.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                Ver Ficha
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

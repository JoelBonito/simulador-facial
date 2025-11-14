import { ProcedureConfig, ProcedureType } from '@/types'
import { ArrowRight } from 'lucide-react'

interface ProcedureSelectorProps {
  procedures: ProcedureConfig[]
  onSelect: (type: ProcedureType) => void
}

export default function ProcedureSelector({ procedures, onSelect }: ProcedureSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {procedures.map((procedure, index) => (
        <button
          key={procedure.id}
          onClick={() => onSelect(procedure.id)}
          className="procedure-card text-left"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${procedure.color} p-4 rounded-2xl text-4xl shadow-xl backdrop-blur-sm bg-white/50 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              {procedure.icon}
            </div>
            <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all">
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
            {procedure.name}
          </h3>

          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {procedure.description}
          </p>

          <div className="mt-auto pt-4 border-t border-white/30">
            <div className="flex items-center justify-between">
              <span className="glass-badge text-xs">
                {procedure.requiredImages.length} foto(s)
              </span>
              <span className="text-xs font-semibold text-blue-600 group-hover:text-purple-600 transition-colors">
                Simular →
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

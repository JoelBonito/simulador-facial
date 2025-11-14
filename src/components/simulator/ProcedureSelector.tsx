import { ProcedureConfig, ProcedureType } from '@/types'
import { ArrowRight } from 'lucide-react'

interface ProcedureSelectorProps {
  procedures: ProcedureConfig[]
  onSelect: (type: ProcedureType) => void
}

export default function ProcedureSelector({ procedures, onSelect }: ProcedureSelectorProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {procedures.map((procedure, index) => (
        <button
          key={procedure.id}
          onClick={() => onSelect(procedure.id)}
          className="procedure-card group text-left p-4"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`${procedure.color} p-3 rounded-xl text-3xl shadow-lg backdrop-blur-sm bg-white/50 transform transition-all group-hover:scale-110 group-hover:rotate-6`}>
              {procedure.icon}
            </div>

            <h3 className="text-sm font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
              {procedure.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="glass-badge">
                {procedure.requiredImages.length} foto(s)
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

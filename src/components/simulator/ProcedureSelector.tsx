import { ProcedureConfig, ProcedureType } from '@/types'
import { ArrowRight } from 'lucide-react'

interface ProcedureSelectorProps {
  procedures: ProcedureConfig[]
  onSelect: (type: ProcedureType) => void
}

export default function ProcedureSelector({ procedures, onSelect }: ProcedureSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {procedures.map((procedure) => (
        <button
          key={procedure.id}
          onClick={() => onSelect(procedure.id)}
          className="card hover:shadow-lg transition-all duration-200 text-left group hover:scale-105 active:scale-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${procedure.color} p-3 rounded-lg text-3xl`}>
              {procedure.icon}
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {procedure.name}
          </h3>

          <p className="text-sm text-gray-600">
            {procedure.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {procedure.requiredImages.length} foto(s) necessária(s)
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

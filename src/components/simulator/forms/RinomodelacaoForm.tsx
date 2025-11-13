import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { RinomodelacaoForm as RinomodelacaoFormData } from '@/types'
import { useState } from 'react'

interface RinomodelacaoFormProps {
  onSubmit: (data: RinomodelacaoFormData) => void
  onBack: () => void
}

const OBJECTIVES = [
  'Elevar ponta do nariz',
  'Projetar dorso nasal',
  'Corrigir desvio de septo (aparência)',
  'Suavizar giba nasal',
  'Refinar ponta nasal',
  'Harmonizar proporções faciais',
]

export default function RinomodelacaoForm({ onSubmit, onBack }: RinomodelacaoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RinomodelacaoFormData>()
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])

  const handleObjectiveToggle = (objective: string) => {
    setSelectedObjectives(prev =>
      prev.includes(objective) ? prev.filter(o => o !== objective) : [...prev, objective]
    )
  }

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      objectives: selectedObjectives,
    })
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Rinomodelação
      </h3>
      <p className="text-gray-600 mb-6">
        Defina os objetivos e características do procedimento
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="label">Objetivos do Procedimento *</label>
          <div className="space-y-2">
            {OBJECTIVES.map((objective) => (
              <label
                key={objective}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedObjectives.includes(objective)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedObjectives.includes(objective)}
                  onChange={() => handleObjectiveToggle(objective)}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="font-medium">{objective}</span>
              </label>
            ))}
          </div>
          {selectedObjectives.length === 0 && (
            <p className="text-sm text-amber-600 mt-2">
              Selecione pelo menos um objetivo
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Tipo de Preenchedor *</label>
            <select
              className="input"
              {...register('fillerType', { required: 'Campo obrigatório' })}
            >
              <option value="">Selecione...</option>
              <option value="acido-hialuronico">Ácido Hialurônico</option>
              <option value="hidroxiapatita-calcio">Hidroxiapatita de Cálcio</option>
              <option value="poli-l-lactico">Ácido Poli-L-Láctico</option>
            </select>
            {errors.fillerType && (
              <p className="text-red-500 text-sm mt-1">{errors.fillerType.message}</p>
            )}
          </div>

          <div>
            <label className="label">Volume Estimado (mL) *</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="3"
              className="input"
              placeholder="Ex: 1.0"
              {...register('volumeML', {
                required: 'Campo obrigatório',
                min: { value: 0.1, message: 'Mínimo 0.1 mL' },
                max: { value: 3, message: 'Máximo 3 mL' }
              })}
            />
            {errors.volumeML && (
              <p className="text-red-500 text-sm mt-1">{errors.volumeML.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Observações Técnicas</label>
          <textarea
            className="input min-h-24"
            placeholder="Características do nariz atual, expectativas, contraindicações..."
            {...register('notes')}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Importante:</strong> A rinomodelação é um procedimento não cirúrgico que utiliza preenchimentos para corrigir pequenas imperfeições. Não substitui a rinoplastia cirúrgica em casos mais complexos.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="btn btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            type="submit"
            disabled={selectedObjectives.length === 0}
            className={`btn flex items-center gap-2 ${
              selectedObjectives.length > 0
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Gerar Simulação
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { HarmonizacaoForm as HarmonizacaoFormData } from '@/types'
import { useState } from 'react'

interface HarmonizacaoFormProps {
  onSubmit: (data: HarmonizacaoFormData) => void
  onBack: () => void
}

const PROCEDURE_TYPES = [
  'Preenchimento Labial',
  'Bigode Chinês',
  'Contorno Mandibular',
  'Mento (queixo)',
  'Maçãs do Rosto',
  'Olheiras',
  'Harmonização Completa',
]

const AREAS = [
  'Lábios',
  'Sulco nasogeniano',
  'Mandíbula',
  'Mento',
  'Zigoma',
  'Região periorbital',
  'Têmpora',
]

export default function HarmonizacaoForm({ onSubmit, onBack }: HarmonizacaoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<HarmonizacaoFormData>()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    )
  }

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      procedureType: selectedTypes,
      areas: selectedAreas,
    })
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Harmonização Facial
      </h3>
      <p className="text-gray-600 mb-6">
        Defina os procedimentos e áreas de aplicação
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="label">Tipo de Procedimento *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {PROCEDURE_TYPES.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTypes.includes(type)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="font-medium">{type}</span>
              </label>
            ))}
          </div>
          {selectedTypes.length === 0 && (
            <p className="text-sm text-amber-600 mt-2">
              Selecione pelo menos um tipo de procedimento
            </p>
          )}
        </div>

        <div>
          <label className="label">Áreas de Aplicação *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {AREAS.map((area) => (
              <label
                key={area}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedAreas.includes(area)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAreas.includes(area)}
                  onChange={() => handleAreaToggle(area)}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="font-medium">{area}</span>
              </label>
            ))}
          </div>
          {selectedAreas.length === 0 && (
            <p className="text-sm text-amber-600 mt-2">
              Selecione pelo menos uma área
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
              step="0.5"
              min="0.5"
              max="10"
              className="input"
              placeholder="Ex: 2.0"
              {...register('volumeML', {
                required: 'Campo obrigatório',
                min: { value: 0.5, message: 'Mínimo 0.5 mL' },
                max: { value: 10, message: 'Máximo 10 mL' }
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
            placeholder="Objetivos do paciente, assimetrias, cuidados especiais..."
            {...register('notes')}
          />
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="btn btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            type="submit"
            disabled={selectedTypes.length === 0 || selectedAreas.length === 0}
            className={`btn flex items-center gap-2 ${
              selectedTypes.length > 0 && selectedAreas.length > 0
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

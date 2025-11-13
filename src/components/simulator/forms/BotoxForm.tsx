import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BotoxForm as BotoxFormData } from '@/types'
import { useState } from 'react'

interface BotoxFormProps {
  onSubmit: (data: BotoxFormData) => void
  onBack: () => void
}

const APPLICATION_AREAS = [
  { id: 'testa', label: 'Testa', units: 15 },
  { id: 'glabela', label: 'Glabela (entre sobrancelhas)', units: 20 },
  { id: 'pes-galinha', label: 'Pés de galinha', units: 12 },
  { id: 'bunny-lines', label: 'Bunny lines (nariz)', units: 5 },
  { id: 'elevacao-sobrancelha', label: 'Elevação de sobrancelhas', units: 5 },
  { id: 'sorriso-gengival', label: 'Sorriso gengival', units: 3 },
  { id: 'rugas-perioral', label: 'Rugas periorais', units: 6 },
  { id: 'mento', label: 'Mento (queixo)', units: 5 },
  { id: 'pescoco', label: 'Pescoço (bandas platismais)', units: 25 },
]

export default function BotoxForm({ onSubmit, onBack }: BotoxFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<BotoxFormData>()
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [unitsPerArea, setUnitsPerArea] = useState<{ [key: string]: number }>({})

  const handleAreaToggle = (areaId: string, defaultUnits: number) => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter(a => a !== areaId))
      const newUnits = { ...unitsPerArea }
      delete newUnits[areaId]
      setUnitsPerArea(newUnits)
    } else {
      setSelectedAreas([...selectedAreas, areaId])
      setUnitsPerArea({ ...unitsPerArea, [areaId]: defaultUnits })
    }
  }

  const handleUnitsChange = (areaId: string, units: number) => {
    setUnitsPerArea({ ...unitsPerArea, [areaId]: units })
  }

  const totalUnits = Object.values(unitsPerArea).reduce((sum, units) => sum + units, 0)

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      applicationAreas: selectedAreas,
      unitsPerArea,
    })
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Botox
      </h3>
      <p className="text-gray-600 mb-6">
        Selecione as áreas de aplicação e unidades de toxina botulínica
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="label">Áreas de Aplicação *</label>
          <div className="space-y-2">
            {APPLICATION_AREAS.map((area) => (
              <div
                key={area.id}
                className={`border-2 rounded-lg p-3 transition-all ${
                  selectedAreas.includes(area.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAreas.includes(area.id)}
                    onChange={() => handleAreaToggle(area.id, area.units)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{area.label}</div>
                  </div>
                  {selectedAreas.includes(area.id) && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={unitsPerArea[area.id] || area.units}
                        onChange={(e) => handleUnitsChange(area.id, parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-sm text-gray-600">unidades</span>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
          {selectedAreas.length === 0 && (
            <p className="text-sm text-amber-600 mt-2">
              Selecione pelo menos uma área de aplicação
            </p>
          )}
        </div>

        {selectedAreas.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total de Unidades:</span>
              <span className="text-2xl font-bold text-primary">{totalUnits} U</span>
            </div>
          </div>
        )}

        <div>
          <label className="label">Aplicações Anteriores</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register('previousApplications')}
                className="w-4 h-4 text-primary"
              />
              <span>Sim</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register('previousApplications')}
                className="w-4 h-4 text-primary"
              />
              <span>Não</span>
            </label>
          </div>
        </div>

        <div>
          <label className="label">Observações Técnicas</label>
          <textarea
            className="input min-h-24"
            placeholder="Resultados esperados, contraindicações, cuidados especiais..."
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
            disabled={selectedAreas.length === 0}
            className={`btn flex items-center gap-2 ${
              selectedAreas.length > 0
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

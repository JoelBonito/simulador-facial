import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ImplantesCapilaresForm as ImplantesCapilaresFormData } from '@/types'

interface ImplantesCapilaresFormProps {
  onSubmit: (data: ImplantesCapilaresFormData) => void
  onBack: () => void
}

export default function ImplantesCapilaresForm({ onSubmit, onBack }: ImplantesCapilaresFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ImplantesCapilaresFormData>()

  const technique = watch('technique')

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Implantes Capilares
      </h3>
      <p className="text-gray-600 mb-6">
        Defina a área e características do transplante capilar
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="label">Área a ser Tratada *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="frontal"
                {...register('areaType', { required: 'Selecione uma área' })}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-semibold">Região Frontal</div>
                <div className="text-sm text-gray-600">Linha do cabelo e entradas</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="coroa"
                {...register('areaType', { required: 'Selecione uma área' })}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-semibold">Coroa (Topo da Cabeça)</div>
                <div className="text-sm text-gray-600">Área superior</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="temporal"
                {...register('areaType', { required: 'Selecione uma área' })}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-semibold">Região Temporal</div>
                <div className="text-sm text-gray-600">Laterais da cabeça</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="completo"
                {...register('areaType', { required: 'Selecione uma área' })}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-semibold">Completo</div>
                <div className="text-sm text-gray-600">Múltiplas áreas</div>
              </div>
            </label>
          </div>
          {errors.areaType && (
            <p className="text-red-500 text-sm mt-1">{errors.areaType.message}</p>
          )}
        </div>

        <div>
          <label className="label">Técnica de Transplante *</label>
          <div className="space-y-2">
            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="FUE"
                {...register('technique', { required: 'Selecione uma técnica' })}
                className="w-4 h-4 text-primary mt-1"
              />
              <div className="flex-1">
                <div className="font-semibold">FUE - Follicular Unit Extraction</div>
                <div className="text-sm text-gray-600">
                  Extração individual dos folículos. Menos invasivo, sem cicatriz linear, recuperação mais rápida.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="FUT"
                {...register('technique', { required: 'Selecione uma técnica' })}
                className="w-4 h-4 text-primary mt-1"
              />
              <div className="flex-1">
                <div className="font-semibold">FUT - Follicular Unit Transplantation</div>
                <div className="text-sm text-gray-600">
                  Remoção de faixa de couro cabeludo. Maior número de enxertos em uma sessão.
                </div>
              </div>
            </label>
          </div>
          {errors.technique && (
            <p className="text-red-500 text-sm mt-1">{errors.technique.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Enxertos Estimados *</label>
            <input
              type="number"
              className="input"
              min="500"
              max="5000"
              step="100"
              placeholder="Ex: 2000"
              {...register('estimatedGrafts', {
                required: 'Campo obrigatório',
                min: { value: 500, message: 'Mínimo 500 enxertos' },
                max: { value: 5000, message: 'Máximo 5000 enxertos' }
              })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Número de folículos a serem transplantados
            </p>
            {errors.estimatedGrafts && (
              <p className="text-red-500 text-sm mt-1">{errors.estimatedGrafts.message}</p>
            )}
          </div>

          <div>
            <label className="label">Número de Sessões *</label>
            <input
              type="number"
              className="input"
              min="1"
              max="3"
              placeholder="Ex: 1"
              {...register('sessions', {
                required: 'Campo obrigatório',
                min: { value: 1, message: 'Mínimo 1 sessão' },
                max: { value: 3, message: 'Máximo 3 sessões' }
              })}
            />
            {errors.sessions && (
              <p className="text-red-500 text-sm mt-1">{errors.sessions.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Observações Técnicas</label>
          <textarea
            className="input min-h-24"
            placeholder="Densidade da área doadora, expectativas, condições do couro cabeludo..."
            {...register('notes')}
          />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Atenção:</strong> Os resultados finais do transplante capilar são visíveis após 12-18 meses. O crescimento é gradual e natural.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="btn btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button type="submit" className="btn btn-primary flex items-center gap-2">
            Gerar Simulação
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

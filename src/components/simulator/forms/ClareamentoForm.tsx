import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ClareamentoFormData {
  toothColor: string
  sessions: number
  technique: string
  notes?: string
}

interface ClareamentoFormProps {
  onSubmit: (data: ClareamentoFormData) => void
  onBack: () => void
}

export default function ClareamentoForm({ onSubmit, onBack }: ClareamentoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ClareamentoFormData>()

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Clareamento Dentário
      </h3>
      <p className="text-gray-600 mb-6">
        Preencha as informações técnicas do procedimento
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Tom Desejado *</label>
            <select
              className="input"
              {...register('toothColor', { required: 'Campo obrigatório' })}
            >
              <option value="">Selecione...</option>
              <option value="2-tons">2 tons mais claro</option>
              <option value="4-tons">4 tons mais claro</option>
              <option value="6-tons">6 tons mais claro</option>
              <option value="8-tons">8 tons mais claro</option>
            </select>
            {errors.toothColor && (
              <p className="text-red-500 text-sm mt-1">{errors.toothColor.message}</p>
            )}
          </div>

          <div>
            <label className="label">Número de Sessões *</label>
            <input
              type="number"
              className="input"
              min="1"
              max="6"
              placeholder="Ex: 3"
              {...register('sessions', {
                required: 'Campo obrigatório',
                min: { value: 1, message: 'Mínimo 1 sessão' },
                max: { value: 6, message: 'Máximo 6 sessões' }
              })}
            />
            {errors.sessions && (
              <p className="text-red-500 text-sm mt-1">{errors.sessions.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Técnica de Clareamento *</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="consultorio"
                {...register('technique', { required: 'Selecione uma técnica' })}
                className="w-4 h-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-semibold">Clareamento em Consultório</div>
                <div className="text-sm text-gray-600">Resultados mais rápidos com luz LED/laser</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="caseiro"
                {...register('technique', { required: 'Selecione uma técnica' })}
                className="w-4 h-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-semibold">Clareamento Caseiro</div>
                <div className="text-sm text-gray-600">Com moldeiras personalizadas</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="combinado"
                {...register('technique', { required: 'Selecione uma técnica' })}
                className="w-4 h-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-semibold">Técnica Combinada</div>
                <div className="text-sm text-gray-600">Consultório + manutenção caseira</div>
              </div>
            </label>
          </div>
          {errors.technique && (
            <p className="text-red-500 text-sm mt-1">{errors.technique.message}</p>
          )}
        </div>

        <div>
          <label className="label">Observações</label>
          <textarea
            className="input min-h-24"
            placeholder="Sensibilidade dentária, manchas específicas, etc..."
            {...register('notes')}
          />
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

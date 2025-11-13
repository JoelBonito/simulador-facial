import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FacetasForm as FacetasFormData } from '@/types'

interface FacetasFormProps {
  onSubmit: (data: FacetasFormData) => void
  onBack: () => void
}

export default function FacetasForm({ onSubmit, onBack }: FacetasFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FacetasFormData>()

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Facetas Dentárias
      </h3>
      <p className="text-gray-600 mb-6">
        Preencha as informações técnicas do procedimento
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Cor Desejada dos Dentes *</label>
            <select
              className="input"
              {...register('toothColor', { required: 'Campo obrigatório' })}
            >
              <option value="">Selecione...</option>
              <option value="A1">A1 - Branco Natural</option>
              <option value="A2">A2 - Branco Luminoso</option>
              <option value="B1">B1 - Branco Intenso</option>
              <option value="B2">B2 - Branco Brilhante</option>
              <option value="Hollywood">Hollywood White</option>
            </select>
            {errors.toothColor && (
              <p className="text-red-500 text-sm mt-1">{errors.toothColor.message}</p>
            )}
          </div>

          <div>
            <label className="label">Quantidade de Dentes *</label>
            <input
              type="number"
              className="input"
              min="2"
              max="20"
              placeholder="Ex: 8"
              {...register('teethQuantity', {
                required: 'Campo obrigatório',
                min: { value: 2, message: 'Mínimo 2 dentes' },
                max: { value: 20, message: 'Máximo 20 dentes' }
              })}
            />
            {errors.teethQuantity && (
              <p className="text-red-500 text-sm mt-1">{errors.teethQuantity.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Tipo de Material *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="porcelana"
                {...register('materialType', { required: 'Selecione um material' })}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-semibold">Porcelana</div>
                <div className="text-sm text-gray-600">Mais durável e natural</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="resina"
                {...register('materialType', { required: 'Selecione um material' })}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-semibold">Resina</div>
                <div className="text-sm text-gray-600">Mais econômica</div>
              </div>
            </label>
          </div>
          {errors.materialType && (
            <p className="text-red-500 text-sm mt-1">{errors.materialType.message}</p>
          )}
        </div>

        <div>
          <label className="label">Observações Técnicas</label>
          <textarea
            className="input min-h-24"
            placeholder="Adicione informações adicionais sobre o caso..."
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

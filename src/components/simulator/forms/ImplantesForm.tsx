import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ImplantesForm as ImplantesFormData } from '@/types'

interface ImplantesFormProps {
  onSubmit: (data: ImplantesFormData) => void
  onBack: () => void
}

export default function ImplantesForm({ onSubmit, onBack }: ImplantesFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ImplantesFormData>()

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Dados Técnicos - Implantes Dentários
      </h3>
      <p className="text-gray-600 mb-6">
        Preencha as informações técnicas do procedimento
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Tipo de Implante *</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="unitario"
                {...register('implantType', { required: 'Selecione o tipo' })}
                className="w-4 h-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-semibold">Implante Unitário</div>
                <div className="text-sm text-gray-600">Substituição de um único dente</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="protese-fixa"
                {...register('implantType', { required: 'Selecione o tipo' })}
                className="w-4 h-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-semibold">Prótese Fixa sobre Implantes</div>
                <div className="text-sm text-gray-600">Protocolo fixo (arcada completa)</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                value="protese-removivel"
                {...register('implantType', { required: 'Selecione o tipo' })}
                className="w-4 h-4 text-primary"
              />
              <div className="flex-1">
                <div className="font-semibold">Prótese Removível (Overdenture)</div>
                <div className="text-sm text-gray-600">Prótese encaixada em implantes</div>
              </div>
            </label>
          </div>
          {errors.implantType && (
            <p className="text-red-500 text-sm mt-1">{errors.implantType.message}</p>
          )}
        </div>

        <div>
          <label className="label">Dentes Ausentes *</label>
          <input
            type="text"
            className="input"
            placeholder="Ex: 11, 12, 21 ou descreva a região"
            {...register('missingTeeth', { required: 'Campo obrigatório' })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Informe os dentes que precisam ser substituídos
          </p>
          {errors.missingTeeth && (
            <p className="text-red-500 text-sm mt-1">{errors.missingTeeth.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('boneGraftNeeded')}
              className="w-4 h-4 text-primary rounded"
            />
            <span className="font-medium">Necessita enxerto ósseo</span>
          </label>
          <p className="text-sm text-gray-600 ml-6">
            Marque se o paciente precisará de enxerto ósseo antes ou durante o implante
          </p>
        </div>

        <div>
          <label className="label">Observações Técnicas</label>
          <textarea
            className="input min-h-24"
            placeholder="Condições do osso, histórico médico relevante, etc..."
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

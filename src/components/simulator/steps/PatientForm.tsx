import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'lucide-react'

interface PatientFormData {
  name: string
  email: string
  phone: string
  cpf?: string
  birthDate?: string
}

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void
}

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientFormData>()

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Dados do Paciente
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            Nome Completo *
          </label>
          <input
            type="text"
            className="input"
            placeholder="Digite o nome do paciente"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              Email
            </label>
            <input
              type="email"
              className="input"
              placeholder="email@exemplo.com"
              {...register('email')}
            />
          </div>

          <div>
            <label className="label">
              Telefone
            </label>
            <input
              type="tel"
              className="input"
              placeholder="(00) 00000-0000"
              {...register('phone')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              CPF
            </label>
            <input
              type="text"
              className="input"
              placeholder="000.000.000-00"
              {...register('cpf')}
            />
          </div>

          <div>
            <label className="label">
              Data de Nascimento
            </label>
            <input
              type="date"
              className="input"
              {...register('birthDate')}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary flex items-center gap-2">
            Próximo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

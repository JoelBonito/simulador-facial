import { useState } from 'react'
import { ArrowLeft, User, Upload, FileText, Sparkles } from 'lucide-react'
import { ProcedureType } from '@/types'
import { getProcedureById } from '@/config/procedures'
import PatientForm from './steps/PatientForm'
import ImageUpload from './steps/ImageUpload'
import TechnicalFormStep from './steps/TechnicalFormStep'
import SimulationResult from './steps/SimulationResult'

interface SimulationWizardProps {
  procedureType: ProcedureType
  onBack: () => void
}

type Step = 'patient' | 'images' | 'technical' | 'processing' | 'result'

export default function SimulationWizard({ procedureType, onBack }: SimulationWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('patient')
  const [patientData, setPatientData] = useState<any>(null)
  const [images, setImages] = useState<any>(null)
  const [technicalData, setTechnicalData] = useState<any>(null)
  const [simulationResult, setSimulationResult] = useState<any>(null)

  const procedure = getProcedureById(procedureType)

  const steps = [
    { id: 'patient', label: 'Dados do Paciente', icon: User },
    { id: 'images', label: 'Upload de Fotos', icon: Upload },
    { id: 'technical', label: 'Dados Técnicos', icon: FileText },
    { id: 'processing', label: 'Processando', icon: Sparkles },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const handlePatientSubmit = (data: any) => {
    setPatientData(data)
    setCurrentStep('images')
  }

  const handleImagesSubmit = (data: any) => {
    setImages(data)
    setCurrentStep('technical')
  }

  const handleTechnicalSubmit = async (data: any) => {
    setTechnicalData(data)
    setCurrentStep('processing')

    // Simular processamento
    setTimeout(() => {
      setSimulationResult({
        id: Date.now().toString(),
        status: 'completed',
        beforeImage: images[0],
        afterImage: 'https://via.placeholder.com/400x400?text=After',
      })
      setCurrentStep('result')
    }, 3000)
  }

  const handleNewSimulation = () => {
    setCurrentStep('patient')
    setPatientData(null)
    setImages(null)
    setTechnicalData(null)
    setSimulationResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className={`${procedure?.color} p-3 rounded-lg text-3xl`}>
            {procedure?.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {procedure?.name}
            </h2>
            <p className="text-gray-600">
              {procedure?.description}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'result' && (
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStepIndex
              const isCompleted = index < currentStepIndex

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 ${
                      isActive
                        ? 'bg-primary text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-2 h-0.5 bg-gray-200 mx-1" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Step Content */}
      <div>
        {currentStep === 'patient' && (
          <PatientForm onSubmit={handlePatientSubmit} />
        )}

        {currentStep === 'images' && procedure && (
          <ImageUpload
            requiredImages={procedure.requiredImages}
            onSubmit={handleImagesSubmit}
            onBack={() => setCurrentStep('patient')}
          />
        )}

        {currentStep === 'technical' && (
          <TechnicalFormStep
            procedureType={procedureType}
            onSubmit={handleTechnicalSubmit}
            onBack={() => setCurrentStep('images')}
          />
        )}

        {currentStep === 'processing' && (
          <div className="card text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Gerando sua simulação...
            </h3>
            <p className="text-gray-600">
              A IA está processando as imagens e criando o resultado
            </p>
          </div>
        )}

        {currentStep === 'result' && simulationResult && (
          <SimulationResult
            result={simulationResult}
            procedureType={procedureType}
            patientData={patientData}
            onNewSimulation={handleNewSimulation}
            onBackToMenu={onBack}
          />
        )}
      </div>
    </div>
  )
}

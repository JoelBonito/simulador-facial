import { ProcedureType } from '@/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FacetasForm from '../forms/FacetasForm'
import ImplantesForm from '../forms/ImplantesForm'
import BotoxForm from '../forms/BotoxForm'
import HarmonizacaoForm from '../forms/HarmonizacaoForm'
import RinomodelacaoForm from '../forms/RinomodelacaoForm'
import ImplantesCapilaresForm from '../forms/ImplantesCapilaresForm'
import ClareamentoForm from '../forms/ClareamentoForm'

interface TechnicalFormStepProps {
  procedureType: ProcedureType
  onSubmit: (data: any) => void
  onBack: () => void
}

export default function TechnicalFormStep({
  procedureType,
  onSubmit,
  onBack,
}: TechnicalFormStepProps) {
  const renderForm = () => {
    switch (procedureType) {
      case 'facetas-dentarias':
        return <FacetasForm onSubmit={onSubmit} onBack={onBack} />
      case 'clareamento-dentario':
        return <ClareamentoForm onSubmit={onSubmit} onBack={onBack} />
      case 'implantes-dentarios':
        return <ImplantesForm onSubmit={onSubmit} onBack={onBack} />
      case 'botox':
        return <BotoxForm onSubmit={onSubmit} onBack={onBack} />
      case 'harmonizacao-facial':
        return <HarmonizacaoForm onSubmit={onSubmit} onBack={onBack} />
      case 'rinomodelacao':
        return <RinomodelacaoForm onSubmit={onSubmit} onBack={onBack} />
      case 'implantes-capilares':
        return <ImplantesCapilaresForm onSubmit={onSubmit} onBack={onBack} />
      default:
        return <div>Formulário não implementado</div>
    }
  }

  return <>{renderForm()}</>
}

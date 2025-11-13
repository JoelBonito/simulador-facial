import { useState } from 'react'
import { Upload, X, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  requiredImages: Array<{
    label: string
    description: string
    type: string
  }>
  onSubmit: (images: File[]) => void
  onBack: () => void
}

export default function ImageUpload({ requiredImages, onSubmit, onBack }: ImageUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File | null }>(
    Object.fromEntries(requiredImages.map((_, index) => [index, null]))
  )
  const [previewUrls, setPreviewUrls] = useState<{ [key: number]: string }>({})

  const handleFileChange = (index: number, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrls(prev => ({ ...prev, [index]: url }))
      setUploadedFiles(prev => ({ ...prev, [index]: file }))
    } else {
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index])
      }
      setPreviewUrls(prev => {
        const newPrev = { ...prev }
        delete newPrev[index]
        return newPrev
      })
      setUploadedFiles(prev => ({ ...prev, [index]: null }))
    }
  }

  const handleSubmit = () => {
    const files = Object.values(uploadedFiles).filter(f => f !== null) as File[]
    if (files.length === requiredImages.length) {
      onSubmit(files)
    }
  }

  const allImagesUploaded = Object.values(uploadedFiles).every(f => f !== null)

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Upload de Fotos
      </h3>
      <p className="text-gray-600 mb-6">
        Faça o upload das fotos necessárias para a simulação
      </p>

      <div className="space-y-6">
        {requiredImages.map((imageReq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{imageReq.label}</h4>
                <p className="text-sm text-gray-600">{imageReq.description}</p>
              </div>
              {uploadedFiles[index] && (
                <button
                  onClick={() => handleFileChange(index, null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {!uploadedFiles[index] ? (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Clique para fazer upload</span> ou arraste
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG ou JPEG (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileChange(index, file)
                  }}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={previewUrls[index]}
                  alt={imageReq.label}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Enviado
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn btn-secondary flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <button
          onClick={handleSubmit}
          disabled={!allImagesUploaded}
          className={`btn flex items-center gap-2 ${
            allImagesUploaded
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Próximo
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

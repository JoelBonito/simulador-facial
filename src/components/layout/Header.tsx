import { Activity, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="backdrop-blur-2xl bg-white/30 border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-xl transform transition-transform group-hover:scale-110 float-animation">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Simulador Facial
              </h1>
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Estética Profissional com IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass-badge">
              MVP 1.0
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

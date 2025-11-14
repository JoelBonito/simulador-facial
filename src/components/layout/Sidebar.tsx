import { Sparkles, History, Users, Activity } from 'lucide-react'

type ViewMode = 'new' | 'simulations' | 'patients'

interface SidebarProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'new' as ViewMode,
      label: 'Nova Simulação',
      icon: Sparkles,
    },
    {
      id: 'simulations' as ViewMode,
      label: 'Simulações',
      icon: History,
    },
    {
      id: 'patients' as ViewMode,
      label: 'Pacientes',
      icon: Users,
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 backdrop-blur-2xl bg-white/30 border-r border-white/20 shadow-2xl z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-lg float-animation">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Simulador
            </h1>
            <h2 className="text-lg font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent -mt-1">
              Facial
            </h2>
          </div>
        </div>
        <div className="glass-badge mt-3 text-[10px] inline-block">
          MVP 1.0
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-white/40 hover:scale-102'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Estética com IA</span>
        </div>
      </div>
    </aside>
  )
}

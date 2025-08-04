import { 
  Database, 
  Server, 
  Code, 
  BarChart3, 
  GitBranch, 
  MessageSquare, 
  HardDrive, 
  Shield,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categoryIcons = {
  databases: Database,
  'web-servers': Server,
  development: Code,
  monitoring: BarChart3,
  cicd: GitBranch,
  messaging: MessageSquare,
  storage: HardDrive,
  security: Shield
}

export function Sidebar({ selectedCategory, onCategoryChange, isOpen, onClose, categories }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out
        md:static md:top-0 md:z-0 md:h-[calc(100vh-4rem)] md:translate-x-0 md:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 md:hidden">
            <h2 className="text-lg font-semibold">Categories</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden p-4 md:block">
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          
          <nav className="flex-1 space-y-1 p-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category.id]
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id)
                    onClose()
                  }}
                  className={`
                    flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors
                    ${selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              )
            })}
          </nav>
          
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <p>Total: {categories.find(c => c.id === 'all')?.count || 0} compose files</p>
              <p className="mt-1">Last updated: Today</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}


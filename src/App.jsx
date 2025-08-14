import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ComposeCard } from './components/ComposeCard'
import { AddComposeModal } from './components/AddComposeModal'
import { ComposeViewer } from './components/ComposeViewer'
import { sampleComposes } from './data/sampleData'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [composes, setComposes] = useState(sampleComposes)
  const [selectedCompose, setSelectedCompose] = useState(null)
  const [modalMode, setModalMode] = useState('view')

  // Calculate category counts dynamically
  const categories = [
    { id: 'all', name: 'All', count: composes.length },
    { id: 'databases', name: 'Databases', count: composes.filter(c => c.category === 'databases').length },
    { id: 'web-servers', name: 'Web Servers', count: composes.filter(c => c.category === 'web-servers').length },
    { id: 'development', name: 'Development', count: composes.filter(c => c.category === 'development').length },
    { id: 'monitoring', name: 'Monitoring', count: composes.filter(c => c.category === 'monitoring').length },
    { id: 'cicd', name: 'CI/CD', count: composes.filter(c => c.category === 'cicd').length },
    { id: 'messaging', name: 'Message Queues', count: composes.filter(c => c.category === 'messaging').length },
    { id: 'storage', name: 'Storage', count: composes.filter(c => c.category === 'storage').length },
    { id: 'security', name: 'Security', count: composes.filter(c => c.category === 'security').length }
  ]

  // Filter composes based on search and category
  const filteredComposes = composes.filter(compose => {
    const matchesSearch = compose.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compose.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compose.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || compose.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleAddCompose = (newCompose) => {
    setComposes(prev => [newCompose, ...prev])
  }

  const handleUpdateCompose = (updatedCompose) => {
    setComposes(prev => 
      prev.map(compose => 
        compose.id === updatedCompose.id ? updatedCompose : compose
      )
    )
    setSelectedCompose(null) // Close modal after update
  }

  const handleViewCompose = (compose) => {
    setSelectedCompose(compose)
    setModalMode('view')
  }

  const handleEditCompose = (compose) => {
    setSelectedCompose(compose)
    setModalMode('edit')
  }

  const handleCloseModal = () => {
    setSelectedCompose(null)
  }

  return (
    <div 
      className="min-h-screen bg-background"
      aria-hidden={!!selectedCompose}
      inert={selectedCompose ? '' : undefined}
    >
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onAddCompose={() => setIsAddModalOpen(true)}
      />
      
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories}
        />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCategory === 'all' ? 'All Compose Files' : 
               selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}
            </h2>
            <p className="text-muted-foreground">
              {filteredComposes.length} compose file{filteredComposes.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          
          {filteredComposes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No compose files found.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search terms or browse different categories
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredComposes.map((compose) => (
                <ComposeCard 
                  key={compose.id} 
                  compose={compose} 
                  onUpdate={handleUpdateCompose}
                  onView={handleViewCompose}
                  onEdit={handleEditCompose}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      <AddComposeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCompose}
      />

      {/* Global Modal */}
      {selectedCompose && (
        <ComposeViewer
          compose={selectedCompose}
          isOpen={!!selectedCompose}
          onClose={handleCloseModal}
          onSave={handleUpdateCompose}
          mode={modalMode}
        />
      )}
    </div>
  )
}

export default App


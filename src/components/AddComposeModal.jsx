import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Upload, X } from 'lucide-react'

const categories = [
  { value: 'databases', label: 'Databases' },
  { value: 'web-servers', label: 'Web Servers' },
  { value: 'development', label: 'Development' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'cicd', label: 'CI/CD' },
  { value: 'messaging', label: 'Message Queues' },
  { value: 'storage', label: 'Storage' },
  { value: 'security', label: 'Security' }
]

export function AddComposeModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    author: '',
    dockerCompose: '',
    thumbnail: null
  })
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.category || !formData.dockerCompose) {
      alert('Please fill in all required fields')
      return
    }

    const newCompose = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: formData.author || 'Anonymous',
      createdAt: 'Just now',
      dockerCompose: formData.dockerCompose,
      thumbnail: thumbnailPreview // Use the preview URL for the thumbnail
    }

    onAdd(newCompose)
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      author: '',
      dockerCompose: '',
      thumbnail: null
    })
    setThumbnailPreview(null)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setThumbnailPreview(e.target.result)
          setFormData(prev => ({ ...prev, thumbnail: file }))
        }
        reader.readAsDataURL(file)
      } else {
        alert('Please select an image file')
      }
    }
  }

  const removeThumbnail = () => {
    setThumbnailPreview(null)
    setFormData(prev => ({ ...prev, thumbnail: null }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Docker Compose</DialogTitle>
          <DialogDescription>
            Add a new Docker Compose configuration to the library
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., PostgreSQL with pgAdmin"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what this compose file does..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="e.g., postgresql, database, admin (comma-separated)"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Your name"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
              />
            </div>
          </div>

          {/* Thumbnail Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            {!thumbnailPreview ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                      <span className="text-sm font-medium text-primary hover:text-primary/80">
                        Click to upload
                      </span>
                      <span className="text-sm text-muted-foreground"> or drag and drop</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <Input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={removeThumbnail}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dockerCompose">Docker Compose YAML *</Label>
            <Textarea
              id="dockerCompose"
              placeholder="version: '3.8'&#10;services:&#10;  app:&#10;    image: nginx:alpine&#10;    ports:&#10;      - '80:80'"
              value={formData.dockerCompose}
              onChange={(e) => handleChange('dockerCompose', e.target.value)}
              className="font-mono text-sm min-h-[200px]"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Compose</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


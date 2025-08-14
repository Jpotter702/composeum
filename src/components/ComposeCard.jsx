import { ExternalLink, Pencil, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function ComposeCard({ compose, onView, onEdit }) {
  const handleView = (e) => {
    e.stopPropagation()
    onView(compose)
  }
  
  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(compose)
  }

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight">{compose.title}</h3>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        {/* Thumbnail/Preview */}
        <div className="relative mb-4 h-32 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          {compose.thumbnail ? (
            <img 
              src={compose.thumbnail} 
              alt={compose.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-mono text-primary">DC</span>
                </div>
                <p className="text-xs text-muted-foreground">{compose.category}</p>
              </div>
            </div>
          )}
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
            <Button 
              size="sm" 
              variant="secondary"
              className="flex-1 max-w-[100px]"
              onClick={handleView}
            >
              <ExternalLink className="h-3 w-3 mr-1.5" />
              View
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              className="flex-1 max-w-[100px]"
              onClick={handleEdit}
            >
              <Pencil className="h-3 w-3 mr-1.5" />
              Edit
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {compose.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>by {compose.author}</span>
          <span>•</span>
          <span>{compose.createdAt}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {compose.category}
          </Badge>
          {compose.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
      
      </Card>
    </>
  )
}


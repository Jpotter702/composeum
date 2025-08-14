import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, Download, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Simple syntax highlighter for YAML
const highlightYaml = (yaml) => {
  if (!yaml) return '';
  
  // Simple syntax highlighting for YAML
  return yaml
    .replace(/(^|\s)([a-zA-Z0-9_-]+:)/g, '$1<span class="text-blue-400">$2</span>')
    .replace(/(['"])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
    .replace(/(\s)(true|false|null|\d+)(\s|$)/g, '$1<span class="text-purple-400">$2</span>$3')
    .replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>');
};

export function ComposeViewer({ compose, isOpen, onClose, onSave, mode = 'view' }) {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [editedCompose, setEditedCompose] = useState(compose);
  const modalRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    setEditedCompose(compose);
    setIsEditing(mode === 'edit');
  }, [compose, mode]);

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previouslyFocusedElementRef.current = document.activeElement;
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the modal
      const focusModal = () => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      };
      
      // Use a small delay to ensure modal is rendered
      const timeoutId = setTimeout(focusModal, 100);
      
      return () => {
        clearTimeout(timeoutId);
        // Restore body scroll
        document.body.style.overflow = 'unset';
        
        // Restore focus to previously focused element
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([compose.dockerCompose], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = `${compose.title.toLowerCase().replace(/\s+/g, '-')}-compose.yaml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Focus trap logic
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };
  
  const renderYamlViewer = (content) => (
    <div className="rounded-md overflow-hidden bg-[#1e1e2e] text-sm">
      <pre className="p-4 overflow-auto max-h-[60vh] font-mono text-sm leading-relaxed">
        <code 
          className="block whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlightYaml(content) }}
        />
      </pre>
    </div>
  );

  const handleSave = () => {
    onSave(editedCompose);
    setIsEditing(false);
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-2xl flex flex-col overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <h2 id="modal-title" className="text-xl font-semibold">
              {isEditing ? 'Edit Compose' : compose.title}
            </h2>
            <Badge variant="outline" className="text-xs">
              {compose.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4 mr-1.5" />
                Edit
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDownload}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div id="modal-description" className="flex-1 overflow-auto p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Title</label>
                <input
                  value={editedCompose.title}
                  onChange={(e) =>
                    setEditedCompose({ ...editedCompose, title: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Description</label>
                <textarea
                  value={editedCompose.description}
                  onChange={(e) =>
                    setEditedCompose({ ...editedCompose, description: e.target.value })
                  }
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none">Docker Compose</label>
                  <span className="text-xs text-muted-foreground">
                    {editedCompose.dockerCompose.split('\n').length} lines
                  </span>
                </div>
                <div className="rounded-md overflow-hidden border">
                  <textarea
                    value={editedCompose.dockerCompose}
                    onChange={(e) =>
                      setEditedCompose({ ...editedCompose, dockerCompose: e.target.value })
                    }
                    className="w-full h-96 font-mono text-sm p-4 focus-visible:outline-none resize-none bg-[#282c34] text-white"
                    spellCheck={false}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {compose.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-foreground">{compose.description}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Docker Compose</h3>
                <div className="rounded-md overflow-hidden">
                  {renderYamlViewer(compose.dockerCompose)}
                </div>
              </div>
              
              {compose.tags && compose.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {compose.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end space-x-2 bg-muted/20">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="px-4"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="px-6"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-6"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
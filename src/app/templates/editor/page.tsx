'use client'

import { useState, useRef, Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, DragOverlay, closestCorners, useSensor, useSensors, PointerSensor, DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { TemplateSection } from '@/components/editor/TemplateSection'
import { DraggableContainer } from '@/components/editor/DraggableContainer'
import { StyleControls } from '@/components/editor/StyleControls'
import { Preview } from '@/components/editor/Preview'
import { Toast } from '@/components/ui/Toast'
import { validateTemplateJSON, isValidTemplateJSON } from '@/utils/templateValidation'
import { TemplateJSON, TemplateSection as ITemplateSection, TemplateStyle, TemplateValidationError } from '@/types/template'
import { Dialog, Transition } from '@headlessui/react'

interface ToastMessage {
  message: string
  type: 'success' | 'error' | 'info'
}

interface TemplateMetadata {
  name: string
  description: string
}

export default function TemplateEditor() {
  const [template, setTemplate] = useState<ITemplateSection[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [importedJson, setImportedJson] = useState<string>('')
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [validationErrors, setValidationErrors] = useState<TemplateValidationError[]>([])
  const [styles, setStyles] = useState<TemplateStyle>({
    primaryColor: '#0F766E',
    secondaryColor: '#134E4A',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    sectionSpacing: 4,
    contentPadding: 4
  })
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showMetadataForm, setShowMetadataForm] = useState(false)
  const [metadata, setMetadata] = useState<TemplateMetadata>({
    name: '',
    description: ''
  })
  const [sourceTemplateId, setSourceTemplateId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Load saved template data if available
  useEffect(() => {
    const savedData = localStorage.getItem('current_template_data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setTemplate(parsedData.sections || [])
        setStyles(parsedData.styles || styles)
        setSourceTemplateId(parsedData.templateId)
        setMetadata({
          name: parsedData.metadata?.name || 'Custom Template',
          description: parsedData.metadata?.description || 'User template configuration'
        })
        
        // Clear the saved data so it's not loaded again
        localStorage.removeItem('current_template_data')
        
        setToast({
          message: 'Template loaded successfully',
          type: 'success'
        })
      } catch (error) {
        console.error('Error loading template data:', error)
        setToast({
          message: 'Error loading template data',
          type: 'error'
        })
      }
    }
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) return

    // Handle dropping sections into containers
    if (active.id !== over.id) {
      setTemplate((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        // If dropping into a container
        const targetItem = items[newIndex]
        if (targetItem.type === 'container') {
          const updatedItems = [...items]
          const [movedItem] = updatedItems.splice(oldIndex, 1)
          
          // Add to container's children
          if (!targetItem.children) targetItem.children = []
          targetItem.children.push(movedItem)
          
          return updatedItems
        }

        return items
      })
    }

    setActiveId(null)
  }

  const handleJsonImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string)
          setImportedJson(json)
          
          // Validate the JSON
          const errors = validateTemplateJSON(json)
          setValidationErrors(errors)
          
          if (errors.length > 0) {
            setToast({
              message: `Invalid template format: ${errors.length} error${errors.length > 1 ? 's' : ''} found`,
              type: 'error'
            })
            return
          }

          if (isValidTemplateJSON(json)) {
            // Convert JSON to template sections
            const sections = convertJsonToSections(json)
            setTemplate(sections)
            
            // Update styles if present
            if (json.styles) {
              setStyles(json.styles)
            }

            setToast({
              message: 'Template imported successfully',
              type: 'success'
            })
          }
        } catch (error) {
          console.error('Error parsing JSON:', error)
          setToast({
            message: 'Invalid JSON format',
              type: 'error'
          })
        }
      }
      reader.readAsText(file)
    }
  }

  const convertJsonToSections = (json: any): ITemplateSection[] => {
    // Convert the imported JSON into our template section format
    const sections: ITemplateSection[] = []
    
    // Process layout containers
    if (json.layout?.containers) {
      json.layout.containers.forEach((container: any) => {
        sections.push({
          id: container.id || `container-${Date.now()}`,
          title: container.name || 'Container',
          type: 'container',
          width: container.width || '100%',
          height: container.height || 'auto',
          children: []
        })
      })
    }

    // Process sections
    if (json.sections) {
      json.sections.forEach((section: any) => {
        sections.push({
          id: section.id || `section-${Date.now()}`,
          title: section.name || 'Section',
          type: 'section',
          width: section.width || '100%',
          height: section.height || 'auto'
        })
      })
    }

    return sections
  }

  const handleStyleChange = (newStyles: Partial<TemplateStyle>) => {
    setStyles(prev => ({
      ...prev,
      ...newStyles
    }))
  }

  const handleExport = () => {
    const templateData: TemplateJSON = {
      layout: {
        containers: template.filter(section => section.type === 'container'),
      },
      sections: template.filter(section => section.type === 'section'),
      styles,
      metadata: {
        name: metadata.name || 'Custom Template',
        description: metadata.description || 'User-created template',
        created: new Date().toISOString(),
        version: '1.0.0'
      }
    }

    const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${metadata.name || 'template'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setToast({
      message: 'Template exported successfully',
      type: 'success'
    })
  }

  const handleSaveClick = () => {
    // Show metadata form before saving
    setShowMetadataForm(true)
  }

  const handleMetadataSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowMetadataForm(false)
    saveTemplate()
  }

  const saveTemplate = () => {
    try {
      // Create template JSON
      const templateData: TemplateJSON = {
        layout: {
          containers: template.filter(section => section.type === 'container'),
        },
        sections: template.filter(section => section.type === 'section'),
        styles,
        metadata: {
          name: metadata.name || 'Custom Template',
          description: metadata.description || 'User-created template',
          created: new Date().toISOString(),
          version: '1.0.0'
        }
      }

      // Validate before saving
      const errors = validateTemplateJSON(templateData)
      if (errors.length > 0) {
        setValidationErrors(errors)
        setToast({
          message: `Cannot save: ${errors.length} validation error${errors.length > 1 ? 's' : ''} found`,
          type: 'error'
        })
        return
      }

      // TODO: Save template to backend
      console.log('Saving template:', templateData)
      setToast({
        message: 'Template saved successfully',
        type: 'success'
      })
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        router.push('/templates')
      }, 1500)
    } catch (error) {
      console.error('Error saving template:', error)
      setToast({
        message: 'Error saving template',
        type: 'error'
      })
    }
  }

  const handleSaveAndApply = () => {
    const templateData: TemplateJSON = {
      layout: {
        containers: template.filter(section => section.type === 'container'),
      },
      sections: template.filter(section => section.type === 'section'),
      styles,
      metadata: {
        name: metadata.name || 'Custom Template',
        description: metadata.description || 'User template configuration',
        created: new Date().toISOString(),
        version: '1.0.0'
      }
    }

    // Validate before saving
    const errors = validateTemplateJSON(templateData)
    if (errors.length > 0) {
      setValidationErrors(errors)
      setToast({
        message: `Cannot save: ${errors.length} validation error${errors.length > 1 ? 's' : ''} found`,
        type: 'error'
      })
      return
    }

    try {
      // If we have a source template, navigate back to it with the new configuration
      if (sourceTemplateId) {
        // Store the template configuration
        localStorage.setItem('template_config', JSON.stringify(templateData))
        // Navigate back to the resume editor with the source template
        router.push(`/editor/${sourceTemplateId}`)
      } else {
        // Handle saving as a new template
        setShowMetadataForm(true)
      }
    } catch (error) {
      console.error('Error saving template:', error)
      setToast({
        message: 'Error saving template',
        type: 'error'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {sourceTemplateId ? 'Customize Template' : 'Template Editor'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {sourceTemplateId 
                ? 'Customize the template to match your resume style' 
                : 'Design and customize your resume template'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Preview</span>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  isPreviewMode ? 'bg-teal-600' : 'bg-gray-200'
                }`}
              >
                <span 
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isPreviewMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleJsonImport}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Import JSON
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Export JSON
            </button>
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-teal-700"
            >
              Save Template
            </button>
            <button
              onClick={handleSaveAndApply}
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-teal-700"
            >
              {sourceTemplateId ? 'Apply Changes' : 'Save Template'}
            </button>
          </div>
        </div>

        <div className={`grid ${isPreviewMode ? '' : 'grid-cols-12 gap-8'}`}>
          {/* Template Design Area */}
          <div className={isPreviewMode ? 'w-full' : 'col-span-9'}>
            {isPreviewMode ? (
              <Preview sections={template} styles={styles} />
            ) : (
              <div 
                className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[297mm] w-[210mm] mx-auto p-8"
                style={{
                  '--primary-color': styles.primaryColor,
                  '--secondary-color': styles.secondaryColor,
                  '--section-spacing': `${styles.sectionSpacing * 0.25}rem`,
                  '--content-padding': `${styles.contentPadding * 0.25}rem`,
                  fontFamily: styles.bodyFont
                } as React.CSSProperties}
              >
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  {template.map((section) => (
                    <TemplateSection
                      key={section.id}
                      id={section.id}
                      title={section.title}
                      width={section.width}
                      height={section.height}
                      isContainer={section.type === 'container'}
                      style={{
                        marginBottom: 'var(--section-spacing)',
                        padding: 'var(--content-padding)'
                      }}
                    >
                      {section.type === 'container' && section.children && (
                        <DraggableContainer 
                          id={`container-${section.id}`} 
                          items={section.children.map(child => child.id)}
                        >
                          {section.children.map((child) => (
                            <TemplateSection
                              key={child.id}
                              id={child.id}
                              title={child.title}
                              width={child.width}
                              height={child.height}
                            />
                          ))}
                        </DraggableContainer>
                      )}
                    </TemplateSection>
                  ))}

                  <DragOverlay>
                    {activeId ? (
                      <TemplateSection
                        id={activeId}
                        title="Moving Section"
                        width="100%"
                        height="auto"
                      />
                    ) : null}
                  </DragOverlay>
                </DndContext>
              </div>
            )}
          </div>

          {/* Sidebar Controls - Only visible in edit mode */}
          {!isPreviewMode && (
            <div className="col-span-3 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sections</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setTemplate([
                        ...template,
                        {
                          id: `container-${Date.now()}`,
                          title: 'New Container',
                          type: 'container',
                          width: '100%',
                          height: 'auto',
                          children: []
                        }
                      ])
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md"
                  >
                    Add Container
                  </button>
                  <button
                    onClick={() => {
                      setTemplate([
                        ...template,
                        {
                          id: `section-${Date.now()}`,
                          title: 'New Section',
                          type: 'section',
                          width: '100%',
                          height: 'auto'
                        }
                      ])
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md"
                  >
                    Add Section
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Styling</h3>
                <StyleControls 
                  onStyleChange={handleStyleChange}
                  initialStyles={styles}
                />
              </div>
            </div>
          )}
        </div>

        {/* Metadata Form Dialog */}
        <Transition appear show={showMetadataForm} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setShowMetadataForm(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      Template Details
                    </Dialog.Title>

                    <form onSubmit={handleMetadataSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Template Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={metadata.name}
                          onChange={(e) => setMetadata(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          required
                          value={metadata.description}
                          onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowMetadataForm(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
                        >
                          Save Template
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="fixed top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-lg border border-red-200 p-4">
            <h3 className="text-red-800 font-medium mb-2">Validation Errors</h3>
            <ul className="space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  <span className="font-medium">{error.path}:</span> {error.message}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setValidationErrors([])}
              className="mt-2 text-sm text-red-600 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToast(null)}
          />
        )}
      </div>
    </div>
  )
}
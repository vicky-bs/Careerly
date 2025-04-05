'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Section {
  id: string
  title: string
  type: string
  column: 'left' | 'right'
  page: number
  isLocked?: boolean
}

interface RearrangeSectionsProps {
  isOpen: boolean
  onClose: () => void
  sections: Section[]
  onSave: (sections: Section[]) => void
}

function SortableItem({ section }: { section: Section }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    disabled: section.isLocked,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#EEF3FF] rounded-lg p-3 flex items-center gap-2 ${
        section.isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'
      }`}
      {...attributes}
      {...listeners}
    >
      {!section.isLocked && (
        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2z"/>
        </svg>
      )}
      {section.isLocked && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      )}
      <span className="text-sm">{section.title}</span>
    </div>
  )
}

function DraggableItem({ section }: { section: Section }) {
  return (
    <div className="bg-[#EEF3FF] rounded-lg p-3 flex items-center gap-2">
      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2z"/>
      </svg>
      <span className="text-sm">{section.title}</span>
    </div>
  )
}

export default function RearrangeSections({ isOpen, onClose, sections: initialSections, onSave }: RearrangeSectionsProps) {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setSections(initialSections)
  }, [initialSections])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const leftSections = sections.filter(s => s.column === 'left' && s.type !== 'header')
  const rightSections = sections.filter(s => s.column === 'right' && s.type !== 'header')
  const headerSection = sections.find(s => s.type === 'header')
  const activeSection = sections.find(s => s.id === activeId)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    if (active.id !== over.id) {
      setSections((sections) => {
        const oldIndex = sections.findIndex((s) => s.id === active.id)
        const newIndex = sections.findIndex((s) => s.id === over.id)

        const newSections = arrayMove(sections, oldIndex, newIndex)
        const activeSection = sections[oldIndex]
        const overSection = sections[newIndex]

        // Update column if moving between columns
        if (activeSection.column !== overSection.column) {
          newSections[newIndex] = { ...newSections[newIndex], column: overSection.column }
        }

        return newSections
      })
    }

    setActiveId(null)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title as="h3" className="text-xl font-medium text-gray-900">
                      Hold & Drag the boxes to rearrange the sections
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-4">Page 1 of 1</div>
                    <div className="bg-white rounded-lg border p-6">
                      {headerSection && (
                        <div className="w-full bg-[#EEF3FF] rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">{headerSection.title}</span>
                          </div>
                        </div>
                      )}
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-2">
                            <SortableContext
                              items={sections.map(s => s.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {leftSections.map((section) => (
                                <SortableItem key={section.id} section={section} />
                              ))}
                            </SortableContext>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-2">
                            <SortableContext
                              items={sections.map(s => s.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {rightSections.map((section) => (
                                <SortableItem key={section.id} section={section} />
                              ))}
                            </SortableContext>
                          </div>
                        </div>

                        <DragOverlay>
                          {activeSection ? <DraggableItem section={activeSection} /> : null}
                        </DragOverlay>
                      </DndContext>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSave(sections)
                        onClose()
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 
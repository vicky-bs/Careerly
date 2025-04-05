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
  DragOverEvent,
  useDroppable,
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
  page: number
  column: number
  isLocked?: boolean
}

interface RearrangeSectionsProps {
  isOpen: boolean
  onClose: () => void
  sections: Section[]
  onSave: (sections: Section[]) => void
}

const DraggableItem = ({ section, isDragging }: { section: Section; isDragging?: boolean }) => (
  <div
    className={`bg-[#EEF3FF] rounded-lg p-3 flex items-center gap-2 ${
      isDragging ? 'opacity-50' : ''
    } ${section.isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}`}
  >
    {!section.isLocked && (
      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm4-4a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2z"/>
      </svg>
    )}
    <span className="text-sm">{section.title}</span>
  </div>
);

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
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    cursor: section.isLocked ? 'not-allowed' : 'grab',
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DraggableItem section={section} isDragging={isDragging} />
    </div>
  );
}

// Implement container-based drag-and-drop
const DroppableContainer = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`space-y-2 bg-white p-3 rounded-md shadow-sm border ${
        isOver ? 'border-blue-500 border-2' : 'border-gray-200'
      }`}
    >
      {children}
    </div>
  );
};

// Update DndContext configuration and drag overlay behavior
export default function RearrangeSections({ isOpen, onClose, sections: initialSections, onSave, templateLayout }: RearrangeSectionsProps & { templateLayout: { columns: number; boundaries: { column: number; sections: string[] }[] } }) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sections.length / (templateLayout?.boundaries?.length || 1));

  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeSection = sections.find((s) => s.id === active.id);
    if (!activeSection) {
      setActiveId(null);
      return;
    }

    const targetColumn = parseInt(over.id as string, 10);

    setSections((prevSections) => {
      // If moving to a different column
      if (activeSection.column !== targetColumn) {
        return prevSections.map((section) => {
          if (section.id === active.id) {
            return { ...section, column: targetColumn };
          }
          return section;
        });
      }

      // If reordering within the same column
      const oldIndex = prevSections.findIndex((s) => s.id === active.id);
      const newIndex = prevSections.findIndex((s) => s.id === over.id);
      return arrayMove(prevSections, oldIndex, newIndex);
    });

    setActiveId(null);
  };

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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white p-6">
                <Dialog.Title className="text-xl font-medium text-gray-900 mb-4">
                  Hold & Drag the boxes to rearrange the sections
                </Dialog.Title>
                <div className="text-sm text-gray-600 mb-4 text-center">Page {currentPage} of {totalPages}</div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className={`grid grid-cols-${templateLayout.columns} gap-4 bg-gray-50 p-4 rounded-lg shadow-md`}>
                    {templateLayout.boundaries.map((boundary) => (
                      <DroppableContainer key={boundary.column} id={boundary.column.toString()}>
                        <SortableContext
                          items={sections.filter((s) => s.column === boundary.column).map((s) => s.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          {sections
                            .filter((s) => s.column === boundary.column)
                            .map((section) => (
                              <SortableItem key={section.id} section={section} />
                            ))}
                        </SortableContext>
                      </DroppableContainer>
                    ))}
                  </div>
                  <DragOverlay dropAnimation={null}>
                    {activeId ? (
                      <DraggableItem
                        section={sections.find((section) => section.id === activeId)!}
                        isDragging={true}
                      />
                    ) : null}
                  </DragOverlay>
                </DndContext>
                <div className="mt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onSave(sections)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

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
import { ModernTealLayoutConfig } from '@/app/templates/ModernTealTemplate';

interface Section {
  id: string;
  title: string;
  type: string;
  column: number;
  page: number;
  isLocked?: boolean;
  zone?: string; // Added zone property
}

interface RearrangeSectionsProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  onSave: (updatedSections: Section[]) => void;
  templateLayout: {
    columns: number;
    boundaries: Array<{
      column: number;
      sections: string[];
    }>;
  };
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
      className={`space-y-2 bg-white p-3 rounded-md shadow-sm border ${isOver ? 'border-blue-500 border-2' : 'border-gray-200'}`}
    >
      {children}
    </div>
  );
};

// Update RearrangeSections to use layout configuration
export default function RearrangeSections({ isOpen, onClose, sections: initialSections, onSave, templateLayout }: RearrangeSectionsProps) {
  const [localSections, setLocalSections] = useState<Section[]>(initialSections);
  const [activeId, setActiveId] = useState<string | null>(null);

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

    if (!over) return;

    setLocalSections((prevSections) => {
      const activeSection = prevSections.find((s) => s.id === active.id);
      if (!activeSection) return prevSections;

      const targetZone = over.id as string;

      return prevSections.map((section) => {
        if (section.id === active.id) {
          return { ...section, zone: targetZone };
        }
        return section;
      });
    });

    setActiveId(null);
  };

  // Initialize zones based on template layout
  useEffect(() => {
    setLocalSections(initialSections.map(section => ({
      ...section,
      zone: `column-${section.column}`
    })));
  }, [initialSections]);

  // Convert back to column format when saving
  const handleSave = () => {
    const updatedSections = localSections.map(section => ({
      ...section,
      column: parseInt(section.zone?.split('-')[1] || '1', 10)
    }));
    onSave(updatedSections);
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={onClose}
      open={isOpen}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
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
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-lg font-semibold">
              Rearrange Sections
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-2 gap-4">
              {templateLayout.boundaries.map((boundary) => (
                <DroppableContainer
                  key={`column-${boundary.column}`}
                  id={`column-${boundary.column}`}
                >
                  <div className="text-sm font-medium mb-2">
                    Column {boundary.column}
                  </div>
                  <SortableContext
                    items={localSections
                      .filter((s) => s.zone === `column-${boundary.column}`)
                      .map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {localSections
                      .filter((s) => s.zone === `column-${boundary.column}`)
                      .map((section) => (
                        <SortableItem key={section.id} section={section} />
                      ))}
                  </SortableContext>
                </DroppableContainer>
              ))}
            </div>

            <DragOverlay>
              {activeId ? (
                <DraggableItem
                  section={localSections.find((section) => section.id === activeId)!}
                  isDragging
                />
              ) : null}
            </DragOverlay>
          </DndContext>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

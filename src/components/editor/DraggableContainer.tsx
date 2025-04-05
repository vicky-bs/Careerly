'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface DraggableContainerProps {
  id: string
  items: string[]
  children: React.ReactNode
}

export function DraggableContainer({ id, items, children }: DraggableContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[100px] p-4 rounded-lg transition-colors ${
        isOver ? 'bg-teal-50 border-2 border-teal-500' : 'bg-transparent'
      }`}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  )
}
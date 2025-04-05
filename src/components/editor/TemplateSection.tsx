'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react';

interface TemplateSectionProps {
  id: string
  title: string
  width: string
  height: string
  children?: React.ReactNode
  isContainer?: boolean
  style?: React.CSSProperties
  onStyleChange?: (style: React.CSSProperties) => void
  onResize?: (width: string, height: string) => void
}

export function TemplateSection({ 
  id, 
  title, 
  width, 
  height, 
  children, 
  isContainer,
  style,
  onStyleChange,
  onResize 
}: TemplateSectionProps) {
  const [showOptions, setShowOptions] = useState(false); // State to toggle options menu

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  })

  const sectionStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width,
    height,
    opacity: isDragging ? 0.5 : undefined,
    ...style
  }

  return (
    <div
      ref={setNodeRef}
      style={sectionStyle}
      {...attributes}
      {...listeners}
      className={`relative border-2 ${
        isDragging ? 'border-teal-500' : 'border-gray-200'
      } rounded-lg ${isContainer ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div 
        className="p-4"
        style={{ 
          marginBottom: 'var(--section-spacing)',
          padding: 'var(--content-padding)'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 
            className="text-sm font-medium"
            style={{ 
              color: 'var(--primary-color)',
              fontFamily: 'var(--heading-font)'
            }}
          >
            {title}
          </h4>
          <div className="flex items-center gap-2">
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => {
                if (onStyleChange) {
                  onStyleChange({
                    backgroundColor: style?.backgroundColor === 'var(--primary-color)' ? undefined : 'var(--primary-color)',
                    color: style?.color === 'white' ? undefined : 'white'
                  })
                }
              }}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </button>
            <div className="relative">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                title="More options"
                onClick={() => setShowOptions((prev) => !prev)}
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => console.log('Edit section:', id)}
                  >
                    Edit Section
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => console.log('Duplicate section:', id)}
                  >
                    Duplicate Section
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => console.log('Delete section:', id)}
                  >
                    Delete Section
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div 
          className="relative"
          style={{ 
            color: style?.color || 'var(--secondary-color)',
            fontFamily: 'var(--body-font)'
          }}
        >
          {children}
        </div>
      </div>
      {isContainer && (
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button
            className="p-1 bg-white rounded border border-gray-200 hover:bg-gray-50"
            onClick={() => onResize?.('100%', height)}
            title="Full width"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <button
            className="p-1 bg-white rounded border border-gray-200 hover:bg-gray-50"
            onClick={() => onResize?.('50%', height)}
            title="Half width"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
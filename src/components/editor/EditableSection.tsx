'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import { useEffect, useState } from 'react'

interface EditableSectionProps {
  initialContent: string
  className?: string
  onHover?: () => void
  onBlur?: () => void
}

export function EditableSection({ initialContent, className = '', onHover, onBlur }: EditableSectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none ${className}`,
      },
    },
    onCreate: ({ editor }) => {
      editor.setOptions({ editable: true })
    },
    editable: true,
    immediatelyRender: true,
  })

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  const handleMouseEnter = () => {
    setShowToolbar(true)
    onHover?.()
  }

  const handleMouseLeave = () => {
    if (!editor?.isFocused) {
      setShowToolbar(false)
    }
  }

  const handleBlur = () => {
    setShowToolbar(false)
    onBlur?.()
  }

  if (!isMounted) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: initialContent }}
      />
    )
  }

  if (!editor) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: initialContent }}
      />
    )
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showToolbar && (
        <div className="absolute -top-10 left-0 right-0 bg-white shadow-lg rounded-md p-2 flex items-center gap-2 z-10">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          >
            U
          </button>
          <select
            onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
            className="text-sm border rounded"
          >
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-6 h-6"
          />
          <div className="flex border-l pl-2 ml-2">
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            >
              ←
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            >
              ↔
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            >
              →
            </button>
          </div>
        </div>
      )}
      <div className={`border-2 border-transparent ${showToolbar ? 'border-teal-500' : 'group-hover:border-gray-200'}`}>
        <EditorContent editor={editor} onBlur={handleBlur} />
      </div>
    </div>
  )
} 
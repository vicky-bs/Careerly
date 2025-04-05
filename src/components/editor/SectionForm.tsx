'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useCallback, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'

interface SectionFormProps {
  isOpen: boolean
  onClose: () => void
  sectionType: string
  onSave: (data: any) => void
}

// Define field configurations for different section types
const sectionFields = {
  experience: [
    { name: 'jobTitle', label: 'Job Title', type: 'text', required: true },
    { name: 'company', label: 'Company', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true },
    { name: 'endDate', label: 'End Date', type: 'date', required: false },
    { name: 'description', label: 'Description', type: 'editor', required: true }
  ],
  projects: [
    { name: 'projectName', label: 'Project Name', type: 'text', required: true },
    { name: 'role', label: 'Your Role', type: 'text', required: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true },
    { name: 'endDate', label: 'End Date', type: 'date', required: false },
    { name: 'technologies', label: 'Technologies Used', type: 'text', required: true, placeholder: 'e.g. React, Node.js, AWS' },
    { name: 'description', label: 'Project Description', type: 'editor', required: true }
  ],
  education: [
    { name: 'degree', label: 'Degree', type: 'text', required: true },
    { name: 'institution', label: 'Institution', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'graduationDate', label: 'Graduation Date', type: 'date', required: true },
    { name: 'gpa', label: 'GPA', type: 'text', required: false },
    { name: 'description', label: 'Additional Information', type: 'editor', required: false }
  ],
  skills: [
    { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g. Programming Languages, Tools, Soft Skills' },
    { name: 'skills', label: 'Skills', type: 'text', required: true, placeholder: 'Comma separated list of skills' }
  ],
  certifications: [
    { name: 'name', label: 'Certification Name', type: 'text', required: true },
    { name: 'issuer', label: 'Issuing Organization', type: 'text', required: true },
    { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
    { name: 'expiryDate', label: 'Expiry Date', type: 'date', required: false },
    { name: 'credentialId', label: 'Credential ID', type: 'text', required: false },
    { name: 'description', label: 'Description', type: 'editor', required: false }
  ],
  achievements: [
    { name: 'title', label: 'Achievement Title', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'description', label: 'Description', type: 'editor', required: true }
  ],
  languages: [
    { name: 'language', label: 'Language', type: 'text', required: true },
    { name: 'proficiency', label: 'Proficiency Level', type: 'select', required: true, 
      options: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'] }
  ],
  interests: [
    { name: 'interests', label: 'Interests', type: 'text', required: true, placeholder: 'Comma separated list of interests' },
    { name: 'description', label: 'Description', type: 'editor', required: false }
  ]
}

export default function SectionForm({ isOpen, onClose, sectionType, onSave }: SectionFormProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})

  // Initialize form data based on section type
  useEffect(() => {
    const fields = sectionFields[sectionType as keyof typeof sectionFields] || []
    const initialData = fields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {} as Record<string, any>)
    setFormData(initialData)
  }, [sectionType])

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight,
      FontFamily,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        description: editor.getHTML()
      }))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[100px]',
      },
    }
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const MenuBar = useCallback(() => {
    if (!editor) return null

    return (
      <div className="flex flex-col">
        {/* Main Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-md">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
              title="Bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
              title="Italic"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="4" x2="10" y2="4"></line>
                <line x1="14" y1="20" x2="5" y2="20"></line>
                <line x1="15" y1="4" x2="9" y2="20"></line>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
              title="Strikethrough"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4H9.5a3.5 3.5 0 0 0 0 7H14"></path>
                <path d="M14 12H8.5a3.5 3.5 0 0 0 0 7H16"></path>
              </svg>
            </button>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
              title="Align Left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="15" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
              title="Align Center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="6" y1="12" x2="18" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
              title="Align Right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="9" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
              title="Bullet List"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="5" cy="6" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
                <circle cx="5" cy="18" r="1"></circle>
                <line x1="9" y1="6" x2="21" y2="6"></line>
                <line x1="9" y1="12" x2="21" y2="12"></line>
                <line x1="9" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
              title="Numbered List"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="6" x2="21" y2="6"></line>
                <line x1="5" y1="12" x2="21" y2="12"></line>
                <line x1="5" y1="18" x2="21" y2="18"></line>
                <path d="M3 6h1v1H3z"></path>
                <path d="M3 12h1v1H3z"></path>
                <path d="M3 18h1v1H3z"></path>
              </svg>
            </button>
          </div>

          {/* Font Controls */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
            <select
              onChange={(e) => {
                const value = e.target.value
                if (value === 'paragraph') {
                  editor.chain().focus().setParagraph().run()
                } else {
                  editor.chain().focus().toggleHeading({ level: parseInt(value) }).run()
                }
              }}
              className="p-1 rounded border border-gray-300 bg-white text-sm"
              title="Text Style"
            >
              <option value="paragraph">Normal Text</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
            </select>
            <select
              onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
              className="p-1 rounded border border-gray-300 bg-white text-sm"
              title="Font Family"
            >
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
            <select
              onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
              className="p-1 rounded border border-gray-300 bg-white text-sm"
              title="Font Size"
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
            </select>
          </div>

          {/* Text Color */}
          <div className="flex items-center gap-1">
            <input
              type="color"
              onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
              value={editor.getAttributes('textStyle').color || '#000000'}
              className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
              title="Text Color"
            />
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Remove Color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden p-2 border-b border-gray-200 bg-gray-50">
          <select
            className="w-full p-2 rounded border border-gray-300 bg-white text-sm"
            onChange={(e) => {
              const [command, value] = e.target.value.split(':')
              if (command === 'fontFamily') {
                editor.chain().focus().setFontFamily(value).run()
              } else if (command === 'fontSize') {
                editor.chain().focus().setFontSize(value).run()
              } else if (command === 'heading') {
                if (value === 'paragraph') {
                  editor.chain().focus().setParagraph().run()
                } else {
                  editor.chain().focus().toggleHeading({ level: parseInt(value) }).run()
                }
              }
            }}
          >
            <optgroup label="Text Style">
              <option value="heading:paragraph">Normal Text</option>
              <option value="heading:1">Heading 1</option>
              <option value="heading:2">Heading 2</option>
              <option value="heading:3">Heading 3</option>
            </optgroup>
            <optgroup label="Font Family">
              <option value="fontFamily:Inter">Inter</option>
              <option value="fontFamily:Arial">Arial</option>
              <option value="fontFamily:Times New Roman">Times New Roman</option>
              <option value="fontFamily:Courier New">Courier New</option>
            </optgroup>
            <optgroup label="Font Size">
              <option value="fontSize:12px">12px</option>
              <option value="fontSize:14px">14px</option>
              <option value="fontSize:16px">16px</option>
              <option value="fontSize:18px">18px</option>
              <option value="fontSize:20px">20px</option>
              <option value="fontSize:24px">24px</option>
              <option value="fontSize:28px">28px</option>
              <option value="fontSize:32px">32px</option>
            </optgroup>
          </select>
        </div>
      </div>
    )
  }, [editor])

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            name={field.name}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        )
      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        )
      case 'select':
        return (
          <select
            name={field.name}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case 'editor':
        return (
          <div className="prose-editor mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
            {isMounted && <MenuBar />}
            {isMounted && <EditorContent editor={editor} className="p-4" />}
          </div>
        )
      default:
        return null
    }
  }

  const fields = sectionFields[sectionType as keyof typeof sectionFields] || []

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Add {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Add Section
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 
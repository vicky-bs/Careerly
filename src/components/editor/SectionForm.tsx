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
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          I
        </button>
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="px-2 py-1 rounded border border-gray-300"
        >
          <option value="Inter">Default</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
          >
            Right
          </button>
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
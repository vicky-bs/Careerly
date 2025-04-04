'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface SectionFormProps {
  isOpen: boolean
  onClose: () => void
  sectionType: string
  onSave: (data: any) => void
}

export function SectionForm({ isOpen, onClose, sectionType, onSave }: SectionFormProps) {
  const [formData, setFormData] = useState<any>({})

  const getFormFields = () => {
    switch (sectionType) {
      case 'experience':
        return [
          { name: 'role', label: 'Job Title', type: 'text', required: true },
          { name: 'company', label: 'Company', type: 'text', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'End Date', type: 'date', required: false },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
        ]
      case 'education':
        return [
          { name: 'degree', label: 'Degree', type: 'text', required: true },
          { name: 'institution', label: 'Institution', type: 'text', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'graduationDate', label: 'Graduation Date', type: 'date', required: true },
          { name: 'gpa', label: 'GPA', type: 'text', required: false },
          { name: 'achievements', label: 'Achievements', type: 'textarea', required: false },
        ]
      case 'achievements':
        return [
          { name: 'title', label: 'Achievement Title', type: 'text', required: true },
          { name: 'issuer', label: 'Issuer', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: false },
        ]
      case 'projects':
        return [
          { name: 'name', label: 'Project Name', type: 'text', required: true },
          { name: 'role', label: 'Your Role', type: 'text', required: true },
          { name: 'technologies', label: 'Technologies Used', type: 'text', required: true },
          { name: 'startDate', label: 'Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'End Date', type: 'date', required: false },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
        ]
      case 'skills':
        return [
          { name: 'category', label: 'Skill Category', type: 'text', required: true },
          { name: 'skills', label: 'Skills (comma-separated)', type: 'textarea', required: true },
        ]
      case 'languages':
        return [
          { name: 'language', label: 'Language', type: 'text', required: true },
          { name: 'proficiency', label: 'Proficiency Level', type: 'select', required: true, options: [
            'Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'
          ]},
        ]
      case 'interests':
        return [
          { name: 'name', label: 'Interest', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: false },
        ]
      default:
        return []
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {getFormFields().map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          rows={3}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
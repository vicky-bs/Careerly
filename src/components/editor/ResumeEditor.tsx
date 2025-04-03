'use client'

import { useState } from 'react'
import { Editor } from 'draft-js'
import 'draft-js/dist/Draft.css'

export function ResumeEditor() {
  const [activeSection, setActiveSection] = useState('personal')

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Resume Editor</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Save Changes
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Personal Information Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Experience</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              + Add Experience
            </button>
          </section>

          {/* Education Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              + Add Education
            </button>
          </section>

          {/* Skills Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              + Add Skill
            </button>
          </section>
        </div>
      </div>
    </div>
  )
} 
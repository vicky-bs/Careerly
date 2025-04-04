'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BriefcaseIcon, AcademicCapIcon, TrophyIcon, BeakerIcon, WrenchScrewdriverIcon, LanguageIcon, HeartIcon } from '@heroicons/react/24/outline'

interface AddSectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectSection: (sectionType: string) => void
}

const sections = [
  {
    id: 'experience',
    name: 'Work Experience',
    description: 'Add your professional experience, internships, or relevant work history',
    icon: BriefcaseIcon,
    attributes: ['role', 'company', 'location', 'startDate', 'endDate', 'description']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Add your academic background, degrees, and certifications',
    icon: AcademicCapIcon,
    attributes: ['degree', 'institution', 'location', 'graduationDate', 'gpa', 'achievements']
  },
  {
    id: 'achievements',
    name: 'Achievements',
    description: 'Add notable accomplishments, awards, and recognition',
    icon: TrophyIcon,
    attributes: ['title', 'issuer', 'date', 'description']
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Add significant projects you\'ve worked on',
    icon: BeakerIcon,
    attributes: ['name', 'role', 'technologies', 'startDate', 'endDate', 'description']
  },
  {
    id: 'skills',
    name: 'Skills',
    description: 'Add technical, professional, or soft skills',
    icon: WrenchScrewdriverIcon,
    attributes: ['category', 'skills']
  },
  {
    id: 'languages',
    name: 'Languages',
    description: 'Add languages you speak and proficiency levels',
    icon: LanguageIcon,
    attributes: ['language', 'proficiency']
  },
  {
    id: 'interests',
    name: 'Interests',
    description: 'Add hobbies and personal interests',
    icon: HeartIcon,
    attributes: ['name', 'description']
  }
]

export function AddSectionDialog({ isOpen, onClose, onSelectSection }: AddSectionDialogProps) {
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Add a New Section
                </Dialog.Title>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 text-left group"
                      onClick={() => {
                        onSelectSection(section.id)
                        onClose()
                      }}
                    >
                      <section.icon className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-teal-700">
                          {section.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 group-hover:text-teal-600">
                          {section.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 
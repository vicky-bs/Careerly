'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function TemplatesPage() {
  const router = useRouter()

  const templates = [
    {
      id: 'modern-teal',
      name: 'Modern Teal',
      description: 'A modern two-column layout with a professional teal sidebar',
      image: '/templates/modern-teal.png'
    },
    {
      id: 'modern-navy',
      name: 'Modern Navy',
      description: 'A professional two-column layout with a navy header and clean typography',
      image: '/templates/modern-navy.png'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Resume Template</h1>
          <p className="mt-4 text-lg text-gray-600">Select a professional template to get started</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[210/297] relative overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                <p className="mt-2 text-gray-600">{template.description}</p>
                <button
                  onClick={() => router.push(`/editor/${template.id}`)}
                  className="mt-4 w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
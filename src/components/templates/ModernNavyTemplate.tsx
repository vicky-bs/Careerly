'use client'

import { PhoneIcon, GlobeAltIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

// Added layout metadata to define the template structure
export const ModernNavyTemplateLayout = {
  columns: 1,
  boundaries: [
    { column: 1, sections: ['Executive Summary', 'Professional Experience', 'Education', 'Core Competencies', 'Key Achievements', 'Certifications'] },
  ],
}

export default function ModernNavyTemplate() {
  return (
    <div className="bg-white w-full h-full">
      {/* Header Section */}
      <div className="bg-navy-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">YOUR NAME</h1>
          <h2 className="text-2xl font-medium text-navy-100">Senior Executive</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-navy-100">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              <span>Phone number</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4" />
              <span>Email address</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="h-4 w-4" />
              <span>LinkedIn URL</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Summary Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">EXECUTIVE SUMMARY</h2>
            <p className="text-navy-700 leading-relaxed">Write your professional summary here...</p>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-navy-800">Job Title</h3>
                  <div className="text-sm text-navy-600">
                    <span>Date Range</span>
                    <span className="mx-2">•</span>
                    <span>Location</span>
                  </div>
                </div>
                <p className="text-navy-700 mb-2 font-medium">Company Name</p>
                <ul className="list-disc list-inside text-navy-600 space-y-1.5 ml-1">
                  <li>Key achievement or responsibility</li>
                  <li>Key achievement or responsibility</li>
                  <li>Key achievement or responsibility</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">EDUCATION</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-navy-800">Degree Name</h3>
                  <span className="text-navy-600">Graduation Year</span>
                </div>
                <p className="text-navy-700 font-medium">Institution Name</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">CORE COMPETENCIES</h2>
            <div className="grid grid-cols-2 gap-6 text-navy-600">
              <ul className="list-disc list-inside space-y-1.5">
                <li>Strategic Planning</li>
                <li>Team Leadership</li>
                <li>Project Management</li>
                <li>Business Development</li>
              </ul>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Change Management</li>
                <li>Risk Assessment</li>
                <li>Stakeholder Relations</li>
                <li>Process Optimization</li>
              </ul>
            </div>
          </section>

          {/* Achievements Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">KEY ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside text-navy-600 space-y-2">
              <li>Led successful digital transformation initiative resulting in 30% efficiency improvement</li>
              <li>Managed $10M+ project portfolio with consistent on-time, under-budget delivery</li>
              <li>Developed and implemented strategic plans leading to 25% revenue growth</li>
            </ul>
          </section>

          {/* Certifications Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">CERTIFICATIONS</h2>
            <ul className="list-disc list-inside text-navy-600 space-y-1.5">
              <li>Project Management Professional (PMP)</li>
              <li>Certified Scrum Master (CSM)</li>
              <li>Six Sigma Black Belt</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
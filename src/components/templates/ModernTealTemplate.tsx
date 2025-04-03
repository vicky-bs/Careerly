'use client'

import { EditableSection } from '../editor/EditableSection'
import { PhoneIcon, GlobeAltIcon, MapPinIcon, EnvelopeIcon, StarIcon, HeartIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

// A4 dimensions in pixels (assuming 96 DPI)
const A4_WIDTH_PX = 794 // 210mm
const A4_HEIGHT_PX = 1123 // 297mm
const PAGE_MARGIN = 32 // 8mm margin in pixels

export const ModernTealTemplate = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<number>(1)
  const [contentHeight, setContentHeight] = useState<number>(0)

  // Function to calculate required pages based on content height
  const calculatePages = () => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight
      setContentHeight(height)
      const requiredPages = Math.ceil(height / (A4_HEIGHT_PX - (PAGE_MARGIN * 2)))
      setPages(requiredPages)
    }
  }

  useEffect(() => {
    const observer = new ResizeObserver(calculatePages)
    if (contentRef.current) {
      observer.observe(contentRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={contentRef} className="relative">
      <div className="flex min-h-[297mm] w-[210mm] relative">
        {/* Left Column - Teal background */}
        <div className="w-1/3 bg-teal-700 text-white p-8">
          {/* Name Section */}
          <div className="mb-12">
            <EditableSection
              initialContent="<h1 class='text-4xl font-bold mb-1'>YOUR NAME</h1>"
              className="!block text-white"
            />
          </div>

          {/* Strengths Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">STRENGTHS</h2>
            <div className="space-y-4">
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-2'>Leadership</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p class='text-sm text-white/90'>Strong leadership skills and ability to motivate teams towards common goals</p>"
                  className="!block"
                />
              </div>
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-2'>Decision Making</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p class='text-sm text-white/90'>Adaptive decision-making skills in high-pressure environments</p>"
                  className="!block"
                />
              </div>
            </div>
          </section>

          {/* Key Achievements Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">KEY ACHIEVEMENTS</h2>
            <div className="space-y-4">
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-2'>Automation and Operational Efficiency</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p class='text-sm text-white/90'>Successfully implemented automation initiatives resulting in significant operational savings and efficiency improvements</p>"
                  className="!block"
                />
              </div>
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-2'>Revenue Generation</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p class='text-sm text-white/90'>Achieved substantial revenue generation through strategic management of major accounts</p>"
                  className="!block"
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">SKILLS</h2>
            <EditableSection
              initialContent="<p class='text-sm text-white/90'>Agile • Docker • IBM • IELTS • Kaizen • PMO • Python • RFP • Scrum • Gmail</p>"
              className="!block"
            />
          </section>

          {/* Interests Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">INTERESTS</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <StarIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <EditableSection
                    initialContent="<h3 class='font-semibold mb-1'>Technology Enthusiast</h3>"
                    className="!block text-white"
                  />
                  <EditableSection
                    initialContent="<p class='text-sm text-white/90'>Passionate about technology and its integration to enhance business processes</p>"
                    className="!block"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HeartIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <EditableSection
                    initialContent="<h3 class='font-semibold mb-1'>Social Networking</h3>"
                    className="!block text-white"
                  />
                  <EditableSection
                    initialContent="<p class='text-sm text-white/90'>Enjoys social activities and networking to build professional relationships</p>"
                    className="!block"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GlobeAmericasIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <EditableSection
                    initialContent="<h3 class='font-semibold mb-1'>Travel Enthusiast</h3>"
                    className="!block text-white"
                  />
                  <EditableSection
                    initialContent="<p class='text-sm text-white/90'>Has a keen interest in travel and exploring new cultures</p>"
                    className="!block"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">COURSES</h2>
            <EditableSection
              initialContent="<p class='text-sm text-white/90'>Course Title</p>"
              className="!block"
            />
          </section>
        </div>

        {/* Right Column - White background */}
        <div className="w-2/3 p-8 bg-white">
          {/* Title Section */}
          <div className="mb-6">
            <EditableSection
              initialContent="<h2 class='text-2xl text-teal-600 font-medium mb-4'>Program Lead</h2>"
              className="!block"
            />
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <EditableSection
                  initialContent="Phone number"
                  className="!block text-gray-600"
                />
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                <EditableSection
                  initialContent="Email address"
                  className="!block text-gray-600"
                />
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="h-4 w-4" />
                <EditableSection
                  initialContent="LinkedIn URL"
                  className="!block text-gray-600"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <EditableSection
                  initialContent="Location"
                  className="!block text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">SUMMARY</h2>
            <EditableSection
              initialContent="<p class='text-gray-700'>Write your professional summary here...</p>"
              className="!block"
            />
          </section>

          {/* Experience Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">EXPERIENCE</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <EditableSection
                      initialContent="<h3 class='text-lg font-semibold text-gray-800'>Job Title</h3>"
                      className="!block"
                    />
                    <EditableSection
                      initialContent="<p class='text-teal-600'>Company Name</p>"
                      className="!block"
                    />
                  </div>
                  <div className="text-right">
                    <EditableSection
                      initialContent="<p class='text-gray-600'>Date Range</p>"
                      className="!block"
                    />
                    <EditableSection
                      initialContent="<p class='text-gray-600'>Location</p>"
                      className="!block"
                    />
                  </div>
                </div>
                <EditableSection
                  initialContent={`<ul class="list-disc list-inside space-y-2 text-gray-700">
                    <li>Key achievement or responsibility</li>
                    <li>Key achievement or responsibility</li>
                    <li>Key achievement or responsibility</li>
                  </ul>`}
                  className="!block"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 
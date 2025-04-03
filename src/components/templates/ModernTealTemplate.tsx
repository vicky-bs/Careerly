'use client'

import { EditableSection } from '../editor/EditableSection'
import { PhoneIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

// A4 dimensions in pixels (assuming 96 DPI)
const A4_WIDTH_PX = 794 // 210mm
const A4_HEIGHT_PX = 1123 // 297mm
const PAGE_MARGIN = 32 // 8mm margin in pixels

export function ModernTealTemplate() {
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

  // Recalculate pages when content changes
  useEffect(() => {
    const observer = new ResizeObserver(calculatePages)
    if (contentRef.current) {
      observer.observe(contentRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // Template content for each page
  const renderPageContent = (pageIndex: number) => {
    // First page always shows the header and initial sections
    if (pageIndex === 0) {
      return (
        <>
          <div className="mb-8">
            <EditableSection
              initialContent="<h1 class='text-3xl font-bold mb-2'>Your Name</h1>"
              className="!block text-white"
            />
            <EditableSection
              initialContent="<h2 class='text-xl'>Your Title</h2>"
              className="!block text-white"
            />
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-teal-500 pb-2">CONTACT</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="Phone number"
                  className="!block text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="Email address"
                  className="!block text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <GlobeAltIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="Website/LinkedIn"
                  className="!block text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="Location"
                  className="!block text-white"
                />
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-teal-500 pb-2">STRENGTHS</h2>
            <div className="space-y-4">
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-1'>Strength Title</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p>Strength description</p>"
                  className="!block text-white"
                />
              </div>
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-1'>Strength Title</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p>Strength description</p>"
                  className="!block text-white"
                />
              </div>
            </div>
          </section>
        </>
      )
    }

    // Content that continues on subsequent pages
    return (
      <div className="space-y-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-teal-500 pb-2">SKILLS</h2>
          <EditableSection
            initialContent="<p>Your • Skills • Here</p>"
            className="!block text-white"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b border-teal-500 pb-2">INTERESTS</h2>
          <div className="space-y-4">
            <div>
              <EditableSection
                initialContent="<h3 class='font-semibold mb-1'>Interest Title</h3>"
                className="!block text-white"
              />
              <EditableSection
                initialContent="<p>Interest description</p>"
                className="!block text-white"
              />
            </div>
            <div>
              <EditableSection
                initialContent="<h3 class='font-semibold mb-1'>Interest Title</h3>"
                className="!block text-white"
              />
              <EditableSection
                initialContent="<p>Interest description</p>"
                className="!block text-white"
              />
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div ref={contentRef} className="relative">
      {Array.from({ length: pages }).map((_, index) => (
        <div
          key={index}
          className="flex min-h-[297mm] w-[210mm]"
          style={{
            marginBottom: index < pages - 1 ? '2rem' : 0,
          }}
        >
          {/* Left Sidebar - Teal background */}
          <div className="w-1/3 bg-teal-700 text-white p-8">
            {renderPageContent(index)}
          </div>

          {/* Main Content Area */}
          <div className="w-2/3 p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">SUMMARY</h2>
              <EditableSection
                initialContent="<p class='text-gray-700'>Write your professional summary here...</p>"
                className="!block"
              />
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">EXPERIENCE</h2>
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
                      <li>Key achievement or responsibility</li>
                    </ul>`}
                    className="!block"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  )
} 
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
              initialContent="<h1 class='text-3xl font-bold mb-2'>VIKRAM SHIVARAM</h1>"
              className="!block text-white"
            />
            <EditableSection
              initialContent="<h2 class='text-xl'>Program Lead</h2>"
              className="!block text-white"
            />
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-teal-500 pb-2">CONTACT</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="+91 98803 23008"
                  className="!block text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="vickybs@gmail.com"
                  className="!block text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <GlobeAltIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="linkedin.com/in/vikramshivaram"
                  className="!block text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5" />
                <EditableSection
                  initialContent="Bangalore, India"
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
                  initialContent="<h3 class='font-semibold mb-1'>Leadership</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p>Strong leadership skills and ability to motivate teams towards common goals</p>"
                  className="!block text-white"
                />
              </div>
              <div>
                <EditableSection
                  initialContent="<h3 class='font-semibold mb-1'>Decision Making</h3>"
                  className="!block text-white"
                />
                <EditableSection
                  initialContent="<p>Adaptive decision-making skills in high-pressure environments</p>"
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
            initialContent="<p>Agile • Docker • IBM • IELTS • Kaizen • PMO • Python • RFP • Scrum • Gmail</p>"
            className="!block text-white"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b border-teal-500 pb-2">INTERESTS</h2>
          <div className="space-y-4">
            <div>
              <EditableSection
                initialContent="<h3 class='font-semibold mb-1'>Technology Enthusiast</h3>"
                className="!block text-white"
              />
              <EditableSection
                initialContent="<p>Passionate about technology and its integration to enhance business processes</p>"
                className="!block text-white"
              />
            </div>
            <div>
              <EditableSection
                initialContent="<h3 class='font-semibold mb-1'>Travel Enthusiast</h3>"
                className="!block text-white"
              />
              <EditableSection
                initialContent="<p>Has a keen interest in travel and exploring new cultures</p>"
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
                initialContent="<p class='text-gray-700'>I am a transformational leader with over 20 years of experience in driving significant business outcomes through strategic initiatives and operational excellence. My expertise lies in process optimization, product innovation, and leveraging AI to enhance efficiency and profitability.</p>"
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
                        initialContent="<h3 class='text-lg font-semibold text-gray-800'>IW Program Lead - Order Management/Billing & Invoicing</h3>"
                        className="!block"
                      />
                      <EditableSection
                        initialContent="<p class='text-teal-600'>IBM</p>"
                        className="!block"
                      />
                    </div>
                    <div className="text-right">
                      <EditableSection
                        initialContent="<p class='text-gray-600'>01/2022 - Present</p>"
                        className="!block"
                      />
                      <EditableSection
                        initialContent="<p class='text-gray-600'>Bangalore, India</p>"
                        className="!block"
                      />
                    </div>
                  </div>
                  <EditableSection
                    initialContent={`<ul class="list-disc list-inside space-y-2 text-gray-700">
                      <li>Leading program management in order management, billing, and invoicing for EMEA</li>
                      <li>Led development and global deployment of intelligent workflow applications across 117 EMEA countries</li>
                      <li>Orchestrated the deployment of Order Management applications processing over $1 billion in transactions</li>
                      <li>Achieved a 35% reduction in cycle time for registration teams</li>
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
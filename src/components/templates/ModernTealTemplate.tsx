'use client'

import { PhoneIcon, GlobeAltIcon, MapPinIcon, EnvelopeIcon, StarIcon, HeartIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

// A4 dimensions in pixels (assuming 96 DPI)
const A4_WIDTH_PX = 794 // 210mm
const A4_HEIGHT_PX = 1123 // 297mm
const PAGE_MARGIN = 32 // 8mm margin in pixels

export default function ModernTealTemplate() {
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
            <h1 className="text-4xl font-bold mb-1">YOUR NAME</h1>
          </div>

          {/* Strengths Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">STRENGTHS</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Leadership</h3>
                <p className="text-sm text-white/90">Strong leadership skills and ability to motivate teams towards common goals</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Decision Making</h3>
                <p className="text-sm text-white/90">Adaptive decision-making skills in high-pressure environments</p>
              </div>
            </div>
          </section>

          {/* Key Achievements Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">KEY ACHIEVEMENTS</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Automation and Operational Efficiency</h3>
                <p className="text-sm text-white/90">Successfully implemented automation initiatives resulting in significant operational savings and efficiency improvements</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Revenue Generation</h3>
                <p className="text-sm text-white/90">Achieved substantial revenue generation through strategic management of major accounts</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">SKILLS</h2>
            <p className="text-sm text-white/90">Agile • Docker • IBM • IELTS • Kaizen • PMO • Python • RFP • Scrum • Gmail</p>
          </section>

          {/* Interests Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">INTERESTS</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <StarIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Technology Enthusiast</h3>
                  <p className="text-sm text-white/90">Passionate about technology and its integration to enhance business processes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HeartIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Social Networking</h3>
                  <p className="text-sm text-white/90">Enjoys social activities and networking to build professional relationships</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GlobeAmericasIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Travel Enthusiast</h3>
                  <p className="text-sm text-white/90">Has a keen interest in travel and exploring new cultures</p>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">COURSES</h2>
            <p className="text-sm text-white/90">Course Title</p>
          </section>
        </div>

        {/* Right Column - White background */}
        <div className="w-2/3 p-8 bg-white">
          {/* Title Section */}
          <div className="mb-6">
            <h2 className="text-2xl text-teal-600 font-medium mb-4">Program Lead</h2>
            <div className="space-y-2 text-gray-600">
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

          {/* Summary Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">SUMMARY</h2>
            <p className="text-gray-600">Write your professional summary here...</p>
          </section>

          {/* Experience Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">EXPERIENCE</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Job Title</h3>
                  <div className="text-sm text-gray-600">
                    <span>Date Range</span>
                    <span className="mx-2">•</span>
                    <span>Location</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-1">Company Name</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Key achievement or responsibility</li>
                  <li>Key achievement or responsibility</li>
                  <li>Key achievement or responsibility</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">EDUCATION</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Degree Name</h3>
                  <span className="text-sm text-gray-600">Graduation Year</span>
                </div>
                <p className="text-gray-600">Institution Name</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 
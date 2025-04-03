'use client'

import { PhoneIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { EditableSection } from '@/components/editor/EditableSection'
import { useEffect, useState } from 'react'

export function ResumeContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="max-w-4xl mx-auto p-8">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <EditableSection
          initialContent="<h1 class='text-3xl font-bold text-gray-900'>VIKRAM SHIVARAM</h1>"
          className="!block"
        />
        <EditableSection
          initialContent="<h2 class='text-lg text-blue-500 mt-1'>Program Lead</h2>"
          className="!block"
        />
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <PhoneIcon className="h-4 w-4 mr-2" />
            <EditableSection
              initialContent="+91 98803 23008"
              className="inline-block"
            />
          </div>
          <div className="flex items-center">
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            <EditableSection
              initialContent="vickybs@gmail.com"
              className="inline-block"
            />
          </div>
          <div className="flex items-center">
            <GlobeAltIcon className="h-4 w-4 mr-2" />
            <EditableSection
              initialContent="https://www.linkedin.com/in/vikramshivaram/"
              className="inline-block"
            />
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <EditableSection
              initialContent="Bangalore, India"
              className="inline-block"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <EditableSection
          initialContent="<h2 class='text-xl font-semibold mb-3 text-gray-900'>SUMMARY</h2>"
          className="!block"
        />
        <EditableSection
          initialContent="<p class='text-gray-700 bg-pink-50 p-4 rounded'>I am a transformational leader with over 20 years of experience in driving significant business outcomes through strategic initiatives and operational excellence. My expertise lies in process optimization, product innovation, and leveraging AI to enhance efficiency and profitability. I have a proven track record of leading cross-functional teams to exceed targets while navigating complex environments. My focus is on delivering exceptional results that align with business goals</p>"
          className="!block"
        />
      </section>

      {/* Experience */}
      <section className="mb-8">
        <EditableSection
          initialContent="<h2 class='text-xl font-semibold mb-4 text-gray-900'>EXPERIENCE</h2>"
          className="!block"
        />
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <EditableSection
                  initialContent="<h3 class='text-lg font-medium'>IW Program Lead - Order Management/Billing & Invoicing</h3>"
                  className="!block"
                />
                <EditableSection
                  initialContent="<p class='text-blue-500'>IBM</p>"
                  className="!block"
                />
              </div>
              <div className="text-right">
                <EditableSection
                  initialContent="<p class='text-gray-600'>01/2022 - 01/1970</p>"
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
                <li>Led development, and global deployment of intelligent workflow applications across 117 EMEA countries</li>
                <li>Orchestrated the deployment of Order Management applications processing over $1 billion in transactions</li>
                <li>Achieved a 35% reduction in cycle time for registration teams</li>
                <li class="bg-pink-50 p-1">Integrated IBM's WatsonX AI into contract validation resulting in a 20% cost savings</li>
              </ul>`}
              className="!block"
            />
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium">Strategic Kaizen Lead EMEA (Quote 2 Cash)</h3>
                <p className="text-blue-500">IBM</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">01/2021 - 01/2022</p>
                <p className="text-gray-600">Bangalore, India</p>
              </div>
            </div>
            <p className="text-amber-700 bg-amber-50 p-2 mb-2 rounded">Managed strategic initiatives for process optimization across EMEA</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Led transformative initiatives enhancing organizational and cultural excellence within Quote 2 Cash</li>
              <li>Orchestrated development and deployment of ICCAP, improving productivity by 40%</li>
              <li>Drove process standardization initiatives across all markets</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium">Squad Leader (Quote 2 Cash)</h3>
                <p className="text-blue-500">IBM</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">01/2018 - 01/2021</p>
                <p className="text-gray-600">Bangalore, India</p>
              </div>
            </div>
            <p className="text-amber-700 bg-amber-50 p-2 mb-2 rounded">Oversaw account management and operational efficiency for Vodafone's telco accounts</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Managed annual revenue of $35 million for Vodafone and Telco accounts</li>
              <li className="bg-blue-50 p-1">Implemented industry best practices enhancing operational support</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium">Group Manager (CMPA)</h3>
                <p className="text-blue-500">IBM</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">01/2013 - 01/2018</p>
                <p className="text-gray-600">Europe</p>
              </div>
            </div>
            <p className="text-gray-700">Oversaw operational and commercial performance across European accounts</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li className="bg-blue-50 p-1">Led diverse teams to drive strategic initiatives and optimize operational metrics across multiple accounts</li>
              <li>Managed transition from planning to go-live for the India center</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
} 
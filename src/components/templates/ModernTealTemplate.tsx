'use client'

import { PhoneIcon, GlobeAltIcon, MapPinIcon, EnvelopeIcon, StarIcon, HeartIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

// A4 dimensions in pixels (assuming 96 DPI)
const A4_WIDTH_PX = 794 // 210mm
const A4_HEIGHT_PX = 1123 // 297mm
const PAGE_MARGIN = 32 // 8mm margin in pixels

// Added layout metadata to define the template structure
export const ModernTealTemplateLayout = {
  columns: 2,
  boundaries: [
    { column: 1, sections: ['Strengths', 'Key Achievements', 'Skills', 'Interests', 'Courses'] },
    { column: 2, sections: ['Header', 'Summary', 'Experience', 'Education', 'Languages', 'Projects'] },
  ],
}

interface Section {
  id: string;
  title: string;
  type: string;
  column: number;
  page: number;
  data?: any;
  isLocked?: boolean;
}

interface ModernTealTemplateProps {
  sections: Section[];
}

// Section rendering components
const ExperienceSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{data.jobTitle}</h3>
          <p className="text-gray-600">{data.company}</p>
        </div>
        <div className="text-sm text-gray-600">
          <span>{data.startDate}</span>
          {data.endDate && <> - {data.endDate}</>}
          <span className="mx-2">•</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="mt-2" dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>
  );
};

const EducationSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{data.degree}</h3>
          <p className="text-gray-600">{data.institution}</p>
        </div>
        <div className="text-sm text-gray-600">
          <span>{data.graduationDate}</span>
          <span className="mx-2">•</span>
          <span>{data.location}</span>
        </div>
      </div>
      {data.description && <div className="mt-2" dangerouslySetInnerHTML={{ __html: data.description }} />}
    </div>
  );
};

const SkillsSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{data.category || 'Skills'}</h3>
      <div className="flex flex-wrap gap-2">
        {data.skills?.split(',').map((skill: string, index: number) => (
          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
            {skill.trim()}
          </span>
        )) || null}
      </div>
    </div>
  );
};

const LanguagesSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">{data.language}</span>
        <span className="text-sm text-gray-600">{data.proficiency}</span>
      </div>
    </div>
  );
};

const ProjectsSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{data.projectName}</h3>
          <p className="text-gray-600">{data.role}</p>
        </div>
        <div className="text-sm text-gray-600">
          <span>{data.startDate}</span>
          {data.endDate && <> - {data.endDate}</>}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-600">Technologies: {data.technologies}</p>
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>
    </div>
  );
};

const renderSection = (section: Section) => {
  switch (section.type) {
    case 'experience':
      return <ExperienceSection data={section.data} />;
    case 'education':
      return <EducationSection data={section.data} />;
    case 'skills':
      return <SkillsSection data={section.data} />;
    case 'languages':
      return <LanguagesSection data={section.data} />;
    case 'projects':
      return <ProjectsSection data={section.data} />;
    default:
      return null;
  }
};

export default function ModernTealTemplate({ sections }: ModernTealTemplateProps) {
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

  // Group sections by column
  const columnSections = {
    1: sections.filter(s => s.column === 1),
    2: sections.filter(s => s.column === 2)
  };

  return (
    <div ref={contentRef} className="relative">
      <div className="flex min-h-[297mm] w-[210mm] relative">
        {/* Left Column - Teal background */}
        <div className="w-1/3 bg-teal-700 text-white p-8">
          {columnSections[1].map(section => (
            <section key={section.id} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">
                {section.title.toUpperCase()}
              </h2>
              {renderSection(section)}
            </section>
          ))}
        </div>

        {/* Right Column - White background */}
        <div className="w-2/3 p-8 bg-white">
          {columnSections[2].map(section => (
            <section key={section.id} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">
                {section.title.toUpperCase()}
              </h2>
              {renderSection(section)}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

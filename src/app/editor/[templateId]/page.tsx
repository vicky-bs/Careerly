'use client'

import ModernTealTemplate from '@/components/templates/ModernTealTemplate'
import ModernNavyTemplate from '@/components/templates/ModernNavyTemplate'
import { useParams, useRouter } from 'next/navigation'
import { PlusIcon, ArrowsUpDownIcon, SwatchIcon, PaintBrushIcon, SparklesIcon, DocumentCheckIcon, ClockIcon, ShareIcon, TagIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import { AddSectionDialog } from '@/components/editor/AddSectionDialog'
import SectionForm from '@/components/editor/SectionForm'
import RearrangeSections from '@/components/editor/RearrangeSections'
import { ModernTealTemplateLayout } from '@/components/templates/ModernTealTemplate'
import { ModernNavyTemplateLayout } from '@/components/templates/ModernNavyTemplate'
import { TemplateJSON } from '@/types/template'

// Theme configurations for different templates
const themeColors = {
  'modern-teal': {
    primary: 'teal',
    colors: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      hover: 'hover:bg-teal-50',
      icon: 'text-teal-600',
      badge: 'bg-teal-100',
      badgeText: 'text-teal-700',
      gradient: 'from-teal-50 to-emerald-50',
    },
  },
  'modern-navy': {
    primary: 'navy',
    colors: {
      bg: 'bg-[#E5EAF2]',
      text: 'text-[#0A2647]',
      hover: 'hover:bg-[#E5EAF2]',
      icon: 'text-[#0A2647]',
      badge: 'bg-[#E5EAF2]',
      badgeText: 'text-[#0A2647]',
      gradient: 'from-[#E5EAF2] to-[#F0F4F8]',
    },
  },
  // Add more template themes here as needed
  'default': {
    primary: 'blue',
    colors: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      hover: 'hover:bg-blue-50',
      icon: 'text-blue-600',
      badge: 'bg-blue-100',
      badgeText: 'text-blue-700',
      gradient: 'from-blue-50 to-indigo-50',
    },
  },
} as const

const getTemplateLayout = (templateId: string) => {
  switch (templateId) {
    case 'modern-teal':
      return ModernTealTemplateLayout
    case 'modern-navy':
      return ModernNavyTemplateLayout
    default:
      return { columns: 1, boundaries: [] } // Default layout
  }
}

interface Section {
  id: string
  title: string
  type: string
  column: number
  page: number
  isLocked?: boolean
  data?: any
}

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const templateId = params.templateId as string
  const [scale, setScale] = useState(1)
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [pages, setPages] = useState<number[]>([1])
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const A4_HEIGHT_PX = 297 * 3.7795275591 // A4 height in pixels
  const [showAddSectionDialog, setShowAddSectionDialog] = useState(false)
  const [showSectionForm, setShowSectionForm] = useState(false)
  const [selectedSectionType, setSelectedSectionType] = useState('')
  const [hasOverflow, setHasOverflow] = useState(false)
  const [isRearrangeOpen, setIsRearrangeOpen] = useState(false)
  const [sections, setSections] = useState<Section[]>([
    { id: 'header', title: 'Header', type: 'header', column: 2, page: 1, isLocked: true },
    { id: 'summary', title: 'Summary', type: 'summary', column: 2, page: 1 },
    { id: 'education', title: 'Education', column: 2, page: 1, type: 'education' },
    { id: 'languages', title: 'Languages', column: 2, page: 1, type: 'languages' },
    { id: 'projects', title: 'Projects', column: 2, page: 1, type: 'projects' },
    { id: 'experience', title: 'Experience', column: 2, page: 1, type: 'experience' },
    { id: 'strengths', title: 'Strengths', type: 'strengths', column: 1, page: 1 },
    { id: 'achievements', title: 'Key Achievements', type: 'achievements', column: 1, page: 1 },
    { id: 'skills', title: 'Skills', type: 'skills', column: 1, page: 1 },
    { id: 'interests', title: 'Interests', column: 1, page: 1, type: 'interests' },
    { id: 'courses', title: 'Courses', column: 1, page: 1, type: 'courses' },
  ])
  const [styles, setStyles] = useState({
    primaryColor: '#0F766E',
    secondaryColor: '#134E4A',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    sectionSpacing: 4,
    contentPadding: 4
  })

  // Get theme colors based on template
  const theme = themeColors[templateId as keyof typeof themeColors] || themeColors.default

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const content = contentRef.current
        const currentContentHeight = content.scrollHeight
        const currentClientHeight = content.clientHeight
        setContentHeight(currentContentHeight)

        // Check if content actually overflows
        const doesOverflow = currentContentHeight > A4_HEIGHT_PX
        setHasOverflow(doesOverflow)

        if (doesOverflow) {
          // Calculate how many pages we need based on content height
          const numberOfPages = Math.ceil(currentContentHeight / A4_HEIGHT_PX)

          // Update pages array if needed
          if (numberOfPages !== pages.length) {
            setPages(Array.from({ length: numberOfPages }, (_, i) => i + 1))
          }
        } else {
          // If no overflow, only show first page
          setPages([1])
        }
      }
    }

    // Check overflow on initial render and when content changes
    checkOverflow()

    // Add resize observer to check overflow when window is resized
    const resizeObserver = new ResizeObserver(checkOverflow)
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [contentRef.current, pages.length])

  // Load saved template configuration if available
  useEffect(() => {
    const savedConfig = localStorage.getItem('template_config')
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig) as TemplateJSON
        
        // Update sections with template configuration
        if (config.sections) {
          setSections(prevSections => {
            // Preserve existing data while updating layout and styling
            const updatedSections = prevSections.map(section => {
              const templateSection = config.sections.find(s => s.type === section.type)
              if (templateSection) {
                return {
                  ...section,
                  ...templateSection,
                  // Preserve the existing data
                  data: section.data
                }
              }
              return section
            })
            return updatedSections
          })
        }

        // Update the global CSS variables for styling
        if (config.styles) {
          document.documentElement.style.setProperty('--primary-color', config.styles.primaryColor)
          document.documentElement.style.setProperty('--secondary-color', config.styles.secondaryColor)
          document.documentElement.style.setProperty('--heading-font', config.styles.headingFont)
          document.documentElement.style.setProperty('--body-font', config.styles.bodyFont)
          document.documentElement.style.setProperty('--section-spacing', `${config.styles.sectionSpacing * 0.25}rem`)
          document.documentElement.style.setProperty('--content-padding', `${config.styles.contentPadding * 0.25}rem`)
        }

        // Clear the saved configuration
        localStorage.removeItem('template_config')

      } catch (error) {
        console.error('Error applying template configuration:', error)
      }
    }
  }, [])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleButtonClick = (label: string) => {
    console.log('Button clicked:', label)
    switch (label) {
      case 'Templates':
        // Store current sections and template data in localStorage before navigating
        const templateData = {
          sections,
          styles,
          templateId,
          metadata: {
            name: 'Current Template',
            description: 'User template configuration'
          }
        }
        localStorage.setItem('current_template_data', JSON.stringify(templateData))
        router.push('/templates/editor')
        break
      case 'Add section':
        setShowAddSectionDialog(true)
        break
      case 'Rearrange':
        setIsRearrangeOpen(true)
        break
      case 'Design & Font':
        // Handle design & font
        break
      case 'Improve it':
        // Handle improve it
        break
      case 'Check':
        // Handle check
        break
      case 'AI Assistant':
        // Handle AI assistant
        break
      case 'Download':
        // Handle download
        break
      case 'Share':
        // Handle share
        break
      case 'History':
        // Handle history
        break
      case 'Branding':
        // Handle branding
        break
      default:
        break
    }
  }

  const handleSectionSelect = (sectionType: string) => {
    setSelectedSectionType(sectionType)
    setShowSectionForm(true)
  }

  const getDefaultColumnForSection = (sectionType: string, templateLayout: any) => {
    // Find which column this section type belongs to by default
    for (const boundary of templateLayout.boundaries) {
      if (boundary.sections.includes(sectionType)) {
        return boundary.column;
      }
    }
    // Default to first column if not specified
    return templateLayout.boundaries[0]?.column || 1;
  };

  const handleSectionSave = (data: any) => {
    const layout = getTemplateLayout(templateId);
    const defaultColumn = getDefaultColumnForSection(selectedSectionType, layout);
    
    // Generate a unique ID for the new section
    const newSection = {
      id: `${selectedSectionType}-${Date.now()}`,
      title: data.jobTitle || data.projectName || data.degree || data.language || data.interests || selectedSectionType,
      type: selectedSectionType,
      column: defaultColumn,
      page: 1,
      data: {
        ...data,
        // Ensure key fields are properly set based on section type
        jobTitle: data.jobTitle,
        company: data.company,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        degree: data.degree,
        institution: data.institution,
        graduationDate: data.graduationDate,
        technologies: data.technologies,
        projectName: data.projectName,
        role: data.role,
        language: data.language,
        proficiency: data.proficiency,
        interests: data.interests
      }
    };

    setSections(prevSections => [...prevSections, newSection]);
    setShowSectionForm(false);
  }

  const handleImportJSON = (importedJSON: any) => {
    try {
      console.log('Starting JSON import...'); // Debug point
      console.log('Imported JSON:', importedJSON); // Debug point

      // Map colorPalette to styles
      if (importedJSON.colorPalette) {
        console.log('Mapping colorPalette to styles...'); // Debug point
        setStyles((prevStyles) => ({
          ...prevStyles,
          primaryColor: importedJSON.colorPalette.primaryColor || prevStyles.primaryColor,
          secondaryColor: importedJSON.colorPalette.secondaryColor || prevStyles.secondaryColor,
        }));

        // Apply colors to global CSS variables
        document.documentElement.style.setProperty('--primary-color', importedJSON.colorPalette.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', importedJSON.colorPalette.secondaryColor);
      }

      // Map layout and sections
      if (importedJSON.layout) {
        console.log('Mapping layout and sections...'); // Debug point
        const { columns, sectionArrangement } = importedJSON.layout;
        if (columns) {
          console.log('Setting columns:', columns); // Debug point
          document.documentElement.style.setProperty('--columns', columns.toString());
        }
        if (sectionArrangement) {
          console.log('Setting section arrangement:', sectionArrangement); // Debug point
          const updatedSections = sectionArrangement.flatMap((column: any, columnIndex: number) =>
            column.sections.map((sectionId: string, order: number) => ({
              id: sectionId,
              title: sectionId.replace(/\(.*\)/, '').trim(), // Generate a title from the ID
              type: 'section', // Default type
              column: columnIndex + 1,
              page: 1,
              order,
            }))
          );
          console.log('Updated sections:', updatedSections); // Debug point
          setSections(updatedSections);
        }
      }

      // Map styles
      if (importedJSON.styles) {
        console.log('Mapping styles...'); // Debug point
        setStyles((prevStyles) => ({
          ...prevStyles,
          headingFont: importedJSON.styles.fontFamily?.heading || prevStyles.headingFont,
          bodyFont: importedJSON.styles.fontFamily?.body || prevStyles.bodyFont,
          sectionSpacing: parseFloat(importedJSON.layout?.spacing?.sectionGap) || prevStyles.sectionSpacing,
          contentPadding: parseFloat(importedJSON.layout?.spacing?.itemGap) || prevStyles.contentPadding,
        }));

        // Apply font styles to global CSS variables
        document.documentElement.style.setProperty('--heading-font', importedJSON.styles.fontFamily?.heading);
        document.documentElement.style.setProperty('--body-font', importedJSON.styles.fontFamily?.body);
        document.documentElement.style.setProperty('--section-spacing', `${parseFloat(importedJSON.layout?.spacing?.sectionGap) || 4}rem`);
        document.documentElement.style.setProperty('--content-padding', `${parseFloat(importedJSON.layout?.spacing?.itemGap) || 4}rem`);
      }

      console.log('Template imported successfully:', importedJSON); // Debug point
    } catch (error) {
      console.error('Error importing template JSON:', error); // Debug point
    }
  };

  const sidebarItems = [
    { icon: PlusIcon, label: 'Add section', badge: null },
    { icon: ArrowsUpDownIcon, label: 'Rearrange', badge: null },
    { icon: SwatchIcon, label: 'Templates', badge: null },
    { icon: PaintBrushIcon, label: 'Design & Font', badge: null },
    { icon: SparklesIcon, label: 'Improve it', badge: '10' },
    { icon: DocumentCheckIcon, label: 'Check', badge: null },
    { icon: SparklesIcon, label: 'AI Assistant', badge: null },
    { icon: ClockIcon, label: 'Download', badge: null },
    { icon: ShareIcon, label: 'Share', badge: null },
    { icon: ClockIcon, label: 'History', badge: null },
    { icon: TagIcon, label: 'Branding', badge: null },
  ]

  const renderTemplate = () => {
    console.log('Rendering template:', templateId)
    switch (templateId) {
      case 'modern-teal':
        console.log('Rendering ModernTealTemplate')
        return <ModernTealTemplate sections={sections} />
      case 'modern-navy':
        console.log('Rendering ModernNavyTemplate')
        return <ModernNavyTemplate sections={sections} />
      default:
        console.log('Template not found:', templateId)
        return <div>Template not found</div>
    }
  }

  const renderOverflowContent = () => {
    // Implement the logic to render overflow content
    return <div>Overflow content rendering logic not implemented</div>
  }

  const templateLayout = getTemplateLayout(templateId)

  return (
    <>
      <div className="flex h-screen bg-[#f0f2f5]">
        {/* Left Sidebar - Floating */}
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
          <div className="bg-white/95 rounded-2xl shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px,_rgba(17,_17,_26,_0.05)_0px_8px_32px] p-4 backdrop-blur-sm backdrop-filter hover:shadow-[rgba(17,_17,_26,_0.1)_0px_4px_20px,_rgba(17,_17,_26,_0.1)_0px_8px_38px] transition-shadow duration-300">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleButtonClick(item.label)}
                    className={`relative z-10 flex items-center w-full p-2.5 text-sm rounded-xl transition-all duration-200 ${
                      activeItem === index
                        ? `${theme.colors.bg} text-black font-medium border-2 ${theme.colors.text} border-opacity-20`
                        : `text-black hover:bg-gray-50/80 border border-opacity-20 ${theme.colors.text}`
                    }`}
                  >
                    <div className="flex-shrink-0 w-5 flex items-center justify-center">
                      <item.icon className={`w-4.5 h-4.5 ${
                        activeItem === index ? theme.colors.icon : 'text-gray-800'
                      }`} />
                    </div>
                    <span className="ml-3 text-left font-medium">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                        activeItem === index
                          ? `${theme.colors.badge} text-black`
                          : 'bg-gray-100 text-black'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                  {/* Button background highlight */}
                  <div className={`absolute left-0 right-0 top-0 bottom-0 -inset-1 rounded-xl transition-all duration-200 ${
                    activeItem === index
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.colors.gradient} opacity-40 blur`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable with A4 styling */}
        <main className="flex-1 overflow-auto ml-[100px] p-8 bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Zoom Controls */}
          <div className="fixed right-8 top-8 flex items-center space-x-2 bg-white rounded-lg shadow-md p-2 z-50">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
              title="Zoom Out"
            >
              <MagnifyingGlassMinusIcon className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
              title="Zoom In"
            >
              <MagnifyingGlassPlusIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-[210mm] mx-auto" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            <div className="space-y-16">
              {/* First Page */}
              <div className="relative">
                <div className="bg-white rounded-sm relative transform transition-all duration-300 hover:translate-y-[-4px]">
                  {/* Paper effect layers */}
                  <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-gray-50 to-white"></div>
                  <div className="absolute inset-0 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)]"></div>
                  <div className="absolute inset-0 rounded-sm shadow-[2px_4px_16px_rgba(0,0,0,0.12)]"></div>
                  <div className="absolute inset-0 rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.08)]"></div>
                  
                  {/* A4 Content */}
                  <div ref={contentRef} className="w-[210mm] min-h-[297mm] relative bg-white rounded-sm z-10">
                    {renderTemplate()}
                  </div>

                  {/* Enhanced Paper stack effect */}
                  <div className="absolute -bottom-1 -right-1 left-1 h-[297mm] bg-white rounded-sm -z-10 opacity-50 shadow-md"></div>
                  <div className="absolute -bottom-2 -right-2 left-2 h-[297mm] bg-white rounded-sm -z-20 opacity-30 shadow-lg"></div>
                  <div className="absolute -bottom-3 -right-3 left-3 h-[297mm] bg-white rounded-sm -z-30 opacity-20 shadow-xl"></div>
                </div>
                
                {/* Page Number */}
                <div className="absolute -bottom-10 left-0 right-0 text-center">
                  <div className="inline-flex items-center justify-center">
                    <div className="h-[1px] w-12 bg-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500 font-medium">Page 1{pages.length > 1 ? ` of ${pages.length}` : ''}</span>
                    <div className="h-[1px] w-12 bg-gray-300"></div>
                  </div>
                </div>
              </div>

              {/* Additional pages */}
              {pages.length > 1 && (
                <div className="relative">
                  <div className="bg-white rounded-sm relative transform transition-all duration-300 hover:translate-y-[-4px]">
                    {/* Paper effect layers */}
                    <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-gray-50 to-white"></div>
                    <div className="absolute inset-0 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)]"></div>
                    <div className="absolute inset-0 rounded-sm shadow-[2px_4px_16px_rgba(0,0,0,0.12)]"></div>
                    <div className="absolute inset-0 rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.08)]"></div>
                    
                    {/* A4 Content */}
                    <div className="w-[210mm] min-h-[297mm] relative bg-white rounded-sm z-10">
                      {/* Empty page 2 - will be populated by overflow content */}
                    </div>

                    {/* Enhanced Paper stack effect */}
                    <div className="absolute -bottom-1 -right-1 left-1 h-[297mm] bg-white rounded-sm -z-10 opacity-50 shadow-md"></div>
                    <div className="absolute -bottom-2 -right-2 left-2 h-[297mm] bg-white rounded-sm -z-20 opacity-30 shadow-lg"></div>
                    <div className="absolute -bottom-3 -right-3 left-3 h-[297mm] bg-white rounded-sm -z-30 opacity-20 shadow-xl"></div>
                  </div>

                  {/* Page Number */}
                  <div className="absolute -bottom-10 left-0 right-0 text-center">
                    <div className="inline-flex items-center justify-center">
                      <div className="h-[1px] w-12 bg-gray-300"></div>
                      <span className="mx-4 text-sm text-gray-500 font-medium">Page 2 of {pages.length}</span>
                      <div className="h-[1px] w-12 bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Dialogs */}
      <AddSectionDialog
        isOpen={showAddSectionDialog}
        onClose={() => setShowAddSectionDialog(false)}
        onSelectSection={handleSectionSelect}
      />
      <SectionForm
        isOpen={showSectionForm}
        onClose={() => setShowSectionForm(false)}
        sectionType={selectedSectionType}
        onSave={handleSectionSave}
      />

      {/* Rearrange Sections Modal */}
      <RearrangeSections
        isOpen={isRearrangeOpen}
        onClose={() => setIsRearrangeOpen(false)}
        sections={sections}
        onSave={(updatedSections) => {
          setSections(updatedSections)
          setIsRearrangeOpen(false)
        }}
        templateLayout={templateLayout}
      />

      {/* Import JSON Button */}
      <button
        onClick={() => {
          console.log('Import JSON button clicked'); // Debug point
          const jsonInput = prompt('Paste your JSON here:');
          if (jsonInput) {
            console.log('JSON input received:', jsonInput); // Debug point
            try {
              const importedJSON = JSON.parse(jsonInput);
              console.log('Parsed JSON:', importedJSON); // Debug point
              handleImportJSON(importedJSON);
            } catch (error) {
              console.error('Error parsing JSON:', error); // Debug point
            }
          } else {
            console.log('No JSON input provided'); // Debug point
          }
        }}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Import JSON
      </button>
    </>
  )
}
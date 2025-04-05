'use client'

import { TemplateStyle } from '@/types/template'
import { useState, useEffect } from 'react'

interface StyleControlsProps {
  onStyleChange: (styles: Partial<TemplateStyle>) => void
  initialStyles?: Partial<TemplateStyle>
}

const fontOptions = [
  'Inter',
  'Arial',
  'Times New Roman',
  'Georgia',
  'Helvetica',
  'Roboto',
  'Open Sans'
]

const defaultStyles: TemplateStyle = {
  primaryColor: '#0F766E',
  secondaryColor: '#134E4A',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  sectionSpacing: 4,
  contentPadding: 4
}

export function StyleControls({ onStyleChange, initialStyles }: StyleControlsProps) {
  const [styles, setStyles] = useState<TemplateStyle>({
    ...defaultStyles,
    ...initialStyles
  })

  useEffect(() => {
    if (initialStyles) {
      setStyles(prev => ({
        ...prev,
        ...initialStyles
      }))
    }
  }, [initialStyles])

  const handleStyleChange = (update: Partial<TemplateStyle>) => {
    setStyles(prev => {
      const newStyles = { ...prev, ...update }
      onStyleChange(newStyles)
      return newStyles
    })
  }

  return (
    <div className="space-y-4">
      {/* Color Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={styles.primaryColor}
            onChange={(e) => handleStyleChange({ primaryColor: e.target.value })}
            className="h-8 w-8 rounded border border-gray-300"
          />
          <input
            type="text"
            value={styles.primaryColor}
            onChange={(e) => handleStyleChange({ primaryColor: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Secondary Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={styles.secondaryColor}
            onChange={(e) => handleStyleChange({ secondaryColor: e.target.value })}
            className="h-8 w-8 rounded border border-gray-300"
          />
          <input
            type="text"
            value={styles.secondaryColor}
            onChange={(e) => handleStyleChange({ secondaryColor: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Font Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Heading Font
        </label>
        <select
          value={styles.headingFont}
          onChange={(e) => handleStyleChange({ headingFont: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        >
          {fontOptions.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body Font
        </label>
        <select
          value={styles.bodyFont}
          onChange={(e) => handleStyleChange({ bodyFont: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        >
          {fontOptions.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Spacing Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Section Spacing
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="8"
            value={styles.sectionSpacing}
            onChange={(e) => handleStyleChange({ sectionSpacing: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 min-w-[2rem] text-right">
            {styles.sectionSpacing}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content Padding
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="8"
            value={styles.contentPadding}
            onChange={(e) => handleStyleChange({ contentPadding: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 min-w-[2rem] text-right">
            {styles.contentPadding}
          </span>
        </div>
      </div>

      <button
        onClick={() => handleStyleChange(defaultStyles)}
        className="mt-4 w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md"
      >
        Reset to Defaults
      </button>
    </div>
  )
}
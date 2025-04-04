'use client'

import { useState } from 'react'

export default function EditableSection({ 
  initialContent = '', 
  className = '' 
}: { 
  initialContent: string;
  className?: string;
}) {
  const [content, setContent] = useState(initialContent)

  return (
    <div
      contentEditable
      dangerouslySetInnerHTML={{ __html: content }}
      onBlur={(e) => setContent(e.currentTarget.innerHTML)}
      className={`outline-none hover:ring-1 hover:ring-teal-500 focus:ring-2 focus:ring-teal-500 rounded px-1 -mx-1 ${className}`}
      suppressContentEditableWarning
    />
  )
} 
'use client'

import { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, type = 'info', onDismiss, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  }[type]

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800'
  }[type]

  const iconColor = {
    success: 'text-green-400 hover:text-green-500',
    error: 'text-red-400 hover:text-red-500',
    info: 'text-blue-400 hover:text-blue-500'
  }[type]

  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-sm`}>
      <div className="flex items-start">
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          type="button"
          className={`ml-4 inline-flex ${iconColor}`}
          onClick={onDismiss}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
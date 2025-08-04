'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect if the component is running on the client side
 * Useful for preventing hydration mismatches
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Utility to safely access window object
 */
export function getWindow() {
  if (typeof window !== 'undefined') {
    return window
  }
  return null
}

/**
 * Utility to safely access document object
 */
export function getDocument() {
  if (typeof document !== 'undefined') {
    return document
  }
  return null
} 
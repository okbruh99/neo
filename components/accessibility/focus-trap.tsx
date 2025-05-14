"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  onEscape?: () => void
}

export function FocusTrap({ children, active = true, onEscape }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    if (!container) return

    // Find all focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus the first element when trap becomes active
    if (firstElement) {
      firstElement.focus()
    }

    // Handle tab key to keep focus within the container
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle escape key
      if (e.key === "Escape" && onEscape) {
        e.preventDefault()
        onEscape()
        return
      }

      // Handle tab key
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // If shift+tab and on first element, go to last element
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          // If tab and on last element, go to first element
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Save previous active element to restore focus later
    const previousActiveElement = document.activeElement as HTMLElement

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      // Restore focus when unmounting
      if (previousActiveElement) {
        previousActiveElement.focus()
      }
    }
  }, [active, onEscape])

  return (
    <div ref={containerRef} className="outline-none" tabIndex={-1}>
      {children}
    </div>
  )
}

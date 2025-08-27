'use client'

import { cn } from '@/utilities/cn'
import React, { useState } from 'react'
import type { NewsletterCTA as NewsletterCTAProps } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  className?: string
} & NewsletterCTAProps

export const NewsletterCTA: React.FC<Props> = ({ className, ...block }) => {
  const { title, description, image, buttonText = 'Inschrijven', privacyText } = block
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // TODO: Implement newsletter signup API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            {title && (
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h2>
            )}
            
            {description && (
              <p className="md:text-md mb-6">{description}</p>
            )}

            <div className="mt-6 w-full max-w-sm md:mt-8">
              {isSubmitted ? (
                <div className="rounded-lg bg-green-50 p-4 text-green-800">
                  <p className="font-medium">Bedankt voor je inschrijving!</p>
                  <p className="text-sm">Je ontvangt binnenkort een bevestiging per e-mail.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                  <input
                    type="email"
                    placeholder="Voer je e-mail in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Bezig...' : buttonText}
                  </button>
                </form>
              )}
              
              {privacyText && (
                <div 
                  className="text-xs text-gray-600"
                  dangerouslySetInnerHTML={{ __html: privacyText }}
                />
              )}
            </div>
          </div>
          
          <div>
            {image && typeof image === 'object' && (
              <Media 
                resource={image} 
                className="w-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
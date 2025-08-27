'use client'

import { cn } from '@/utilities/cn'
import React, { useState } from 'react'
import type { FAQBlock as FAQBlockProps, Faq } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & FAQBlockProps

export const FAQBlock: React.FC<Props> = ({ className, ...block }) => {
  const { title, description, faqs } = block
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', className)}>
      <div className="container max-w-3xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl mb-5 md:mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="md:text-md text-gray-600">{description}</p>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          {faqs.map((faqRef, index) => {
            if (typeof faqRef === 'string') return null
            const faq = faqRef as Faq

            if (!faq.active) return null

            const isOpen = openFAQ === index

            return (
              <div 
                key={faq.id || index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 pr-8">
                      {faq.question}
                    </h3>
                    <svg
                      className={cn(
                        'size-5 text-gray-500 transition-transform duration-200 flex-shrink-0',
                        isOpen && 'rotate-180'
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4">
                    <div className="text-gray-700 prose prose-sm max-w-none">
                      <RichText content={faq.answer} enableGutter={false} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
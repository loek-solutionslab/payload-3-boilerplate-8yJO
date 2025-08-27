import { cn } from '@/utilities/cn'
import React from 'react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

type Props = {
  className?: string
} & HeroBlockProps

export const HeroBlock: React.FC<Props> = ({ className, ...block }) => {
  const { 
    title, 
    description, 
    image, 
    primaryButton, 
    secondaryButton, 
    imagePosition = 'right' 
  } = block

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', className)}>
      <div className="container">
        <div className={cn(
          'grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center',
          imagePosition === 'left' && 'lg:grid-cols-[1fr_1fr]'
        )}>
          <div className={cn(imagePosition === 'left' && 'lg:order-2')}>
            {title && (
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h1>
            )}
            
            {description && (
              <p className="md:text-md mb-6">{description}</p>
            )}
            
            {(primaryButton || secondaryButton) && (
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {primaryButton && (
                  <Link
                    href={primaryButton.url || '#'}
                    className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    {primaryButton.label}
                  </Link>
                )}
                
                {secondaryButton && (
                  <Link
                    href={secondaryButton.url || '#'}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    {secondaryButton.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          
          <div className={cn(imagePosition === 'left' && 'lg:order-1')}>
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
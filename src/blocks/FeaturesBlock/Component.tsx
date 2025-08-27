import { cn } from '@/utilities/cn'
import React from 'react'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { RxChevronRight } from 'react-icons/rx'

type Props = {
  className?: string
} & FeaturesBlockProps

export const FeaturesBlock: React.FC<Props> = ({ className, ...block }) => {
  const { title, features } = block

  if (!features || features.length === 0) {
    return null
  }

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', className)}>
      <div className="container">
        {title && (
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="mx-auto w-full max-w-lg">
              <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
                {title}
              </h2>
            </div>
          </div>
        )}
        
        <div className={cn(
          'grid grid-cols-1 items-start justify-center gap-y-12 md:gap-x-8 md:gap-y-16 lg:gap-x-12',
          features.length === 1 && 'md:grid-cols-1 max-w-md mx-auto',
          features.length === 2 && 'md:grid-cols-2',
          features.length >= 3 && 'md:grid-cols-3'
        )}>
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {feature.icon && (
                <div className="mb-5 md:mb-6">
                  {typeof feature.icon === 'object' && feature.icon !== null && (
                    <Media resource={feature.icon} className="size-12" />
                  )}
                </div>
              )}
              
              <h3 className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
                {feature.title}
              </h3>
              
              {feature.description && (
                <p className="mb-6">{feature.description}</p>
              )}
              
              {feature.link && (
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Link 
                    href={feature.link.url || '#'} 
                    className="inline-flex items-center gap-2 text-sm font-medium underline"
                  >
                    {feature.link.label || 'Bekijk meer'}
                    <RxChevronRight className="size-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
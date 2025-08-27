import { cn } from '@/utilities/cn'
import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockProps, Testimonial } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  className?: string
} & TestimonialsBlockProps

export const TestimonialsBlock: React.FC<Props> = ({ className, ...block }) => {
  const { title, description, testimonials } = block

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const renderStars = (rating: string) => {
    const numStars = parseInt(rating)
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              'size-4',
              i < numStars ? 'text-yellow-400 fill-current' : 'text-gray-300'
            )}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section className={cn('px-[5%] py-16 md:py-24 lg:py-28', className)}>
      <div className="container">
        {(title || description) && (
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="mx-auto w-full max-w-lg">
              {title && (
                <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl mb-5 md:mb-6">
                  {title}
                </h2>
              )}
              {description && (
                <p className="md:text-md">{description}</p>
              )}
            </div>
          </div>
        )}
        
        <div className={cn(
          'grid gap-8',
          testimonials.length === 1 && 'max-w-2xl mx-auto',
          testimonials.length === 2 && 'md:grid-cols-2',
          testimonials.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3'
        )}>
          {testimonials.map((testimonialRef, index) => {
            if (typeof testimonialRef === 'string') return null
            const testimonial = testimonialRef as Testimonial

            return (
              <div key={testimonial.id || index} className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                {renderStars(testimonial.rating || '5')}
                
                <blockquote className="flex-1 text-gray-900 mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  {testimonial.avatar && typeof testimonial.avatar === 'object' && (
                    <div className="mr-4 flex-shrink-0">
                      <Media 
                        resource={testimonial.avatar}
                        className="size-10 rounded-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <div className="text-sm text-gray-600">
                      {testimonial.role && (
                        <span>{testimonial.role}</span>
                      )}
                      {testimonial.role && testimonial.company && (
                        <span className="mx-1">•</span>
                      )}
                      {testimonial.company && (
                        <span>{testimonial.company}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
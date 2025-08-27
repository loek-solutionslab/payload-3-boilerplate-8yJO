import React from 'react'
import Link from 'next/link'
import type { Course } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

interface CourseCardProps {
  course: Course
  className?: string
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatTargetAudience = (audiences: string[]) => {
    const audienceLabels = {
      parents: 'Ouders',
      daycare: 'Kinderdagverblijven',
      schools: 'Scholen',
      municipalities: 'Gemeenten',
    }

    return audiences
      .map(audience => audienceLabels[audience as keyof typeof audienceLabels] || audience)
      .join(', ')
  }

  return (
    <Link
      href={`/cursussen/${course.slug}`}
      className={cn(
        'group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="aspect-[16/9] overflow-hidden">
        {course.image && typeof course.image === 'object' && (
          <Media
            resource={course.image}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {course.duration}
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(course.price)}
          </div>
        </div>
        
        <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="mb-4 text-gray-600 line-clamp-3">{course.description}</p>
        
        {course.targetAudience && course.targetAudience.length > 0 && (
          <p className="mb-4 text-sm text-gray-500">
            <span className="font-medium">Voor:</span> {formatTargetAudience(course.targetAudience)}
          </p>
        )}
        
        {course.features && course.features.length > 0 && (
          <ul className="space-y-1">
            {course.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg
                  className="mr-2 size-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature.feature}
              </li>
            ))}
            {course.features.length > 3 && (
              <li className="text-sm text-gray-500">
                +{course.features.length - 3} meer...
              </li>
            )}
          </ul>
        )}
      </div>
    </Link>
  )
}
'use client'

import type { Course } from '@/payload-types'
import React, { useState } from 'react'
import { CourseCard } from '@/components/CourseCard'

const targetAudienceLabels = {
  parents: 'Voor Ouders',
  daycare: 'Voor Kinderdagverblijven', 
  schools: 'Voor Scholen',
  municipalities: 'Voor Gemeenten',
}

interface CourseArchiveClientProps {
  courses: Course[]
  showCategories: boolean
  layout: 'grid' | 'list'
}

export const CourseArchiveClient: React.FC<CourseArchiveClientProps> = ({
  courses,
  showCategories,
  layout
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredCourses = activeFilter
    ? courses.filter(course => 
        course.targetAudience?.includes(activeFilter as any)
      )
    : courses

  const allTargetAudiences = Array.from(new Set(
    courses.flatMap(course => course.targetAudience || [])
  ))

  return (
    <>
      {showCategories && allTargetAudiences.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeFilter 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Alle Cursussen
          </button>
          {allTargetAudiences.map((audience) => (
            <button
              key={audience}
              onClick={() => setActiveFilter(audience)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === audience 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {targetAudienceLabels[audience as keyof typeof targetAudienceLabels]}
            </button>
          ))}
        </div>
      )}

      {filteredCourses.length > 0 ? (
        <div className={
          layout === 'grid' 
            ? 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-8'
        }>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {activeFilter 
              ? `Geen cursussen gevonden voor ${targetAudienceLabels[activeFilter as keyof typeof targetAudienceLabels]}`
              : 'Geen cursussen gevonden'
            }
          </h3>
          <p className="text-gray-600">
            Probeer een ander filter of kom later terug.
          </p>
        </div>
      )}
    </>
  )
}
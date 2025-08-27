import type { Course, CourseArchiveBlock as CourseArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { CourseCard } from '@/components/CourseCard'
import { CourseArchiveClient } from './Component.client'

export const CourseArchiveBlock: React.FC<
  CourseArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { 
    id, 
    title = 'Cursussen & Trainingen',
    description,
    introContent, 
    populateBy, 
    targetAudience,
    limit: limitFromProps, 
    selectedCourses,
    showCategories = true,
    layout = 'grid'
  } = props

  const limit = limitFromProps || 10
  let courses: Course[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    if (populateBy === 'collection') {
      const result = await payload.find({
        collection: 'courses',
        depth: 1,
        limit,
        where: {
          _status: {
            equals: 'published',
          },
        },
        sort: '-publishedAt',
      })
      courses = result.docs
    } else if (populateBy === 'targetAudience' && targetAudience?.length) {
      const result = await payload.find({
        collection: 'courses',
        depth: 1,
        limit,
        where: {
          _status: {
            equals: 'published',
          },
          targetAudience: {
            in: targetAudience,
          },
        },
        sort: '-publishedAt',
      })
      courses = result.docs
    } else if (populateBy === 'selection' && selectedCourses?.length) {
      const filteredSelected = selectedCourses.map((course) => {
        if (typeof course === 'object') return course
        return null
      }).filter(Boolean) as Course[]
      courses = filteredSelected
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container">
        {(title || description || introContent) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl mb-5 md:mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="md:text-lg text-gray-600 mb-8">
                {description}
              </p>
            )}
            {introContent && (
              <RichText className="max-w-[48rem] mx-auto" content={introContent} enableGutter={false} />
            )}
          </div>
        )}

        <CourseArchiveClient
          courses={courses}
          showCategories={showCategories || false}
          layout={layout || 'grid'}
        />
      </div>
    </div>
  )
}
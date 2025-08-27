import type { AgeGroup, AgeGroupsArchiveBlock as AgeGroupsArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

const AgeGroupCard: React.FC<{ ageGroup: AgeGroup }> = ({ ageGroup }) => {
  return (
    <Link href={`/voor-elke-leeftijd/${ageGroup.slug}`} className="block group">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {ageGroup.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{ageGroup.ageRange}</p>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {ageGroup.description}
        </p>
        
        {ageGroup.tips && ageGroup.tips.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Tips:</p>
            <div className="flex flex-wrap gap-2">
              {ageGroup.tips.slice(0, 2).map((tipObj, index) => (
                <span 
                  key={index}
                  className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                >
                  {tipObj.tip}
                </span>
              ))}
              {ageGroup.tips.length > 2 && (
                <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{ageGroup.tips.length - 2} meer
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center text-blue-600 text-sm font-medium">
          Lees meer
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export const AgeGroupsArchiveBlock: React.FC<
  AgeGroupsArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { 
    id, 
    title = 'Voor Elke Leeftijd',
    description,
    introContent, 
    populateBy, 
    selectedAgeGroups,
    limit: limitFromProps,
    layout = 'grid'
  } = props

  const limit = limitFromProps || 10
  let ageGroups: AgeGroup[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    if (populateBy === 'collection') {
      const result = await payload.find({
        collection: 'ageGroups',
        depth: 1,
        limit,
        where: {
          _status: {
            equals: 'published',
          },
        },
        sort: 'order',
      })
      ageGroups = result.docs
    } else if (populateBy === 'selection' && selectedAgeGroups?.length) {
      const filteredSelected = selectedAgeGroups.map((ageGroup) => {
        if (typeof ageGroup === 'object') return ageGroup
        return null
      }).filter(Boolean) as AgeGroup[]
      ageGroups = filteredSelected
    }
  } catch (error) {
    console.error('Error fetching age groups:', error)
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

        {ageGroups.length > 0 ? (
          <>
            {layout === 'grid' && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {ageGroups.map((ageGroup) => (
                  <AgeGroupCard key={ageGroup.id} ageGroup={ageGroup} />
                ))}
              </div>
            )}
            
            {layout === 'list' && (
              <div className="space-y-8">
                {ageGroups.map((ageGroup) => (
                  <AgeGroupCard key={ageGroup.id} ageGroup={ageGroup} />
                ))}
              </div>
            )}
            
            {layout === 'timeline' && (
              <div className="max-w-4xl mx-auto">
                {ageGroups.map((ageGroup, index) => (
                  <div key={ageGroup.id} className="relative">
                    {index !== ageGroups.length - 1 && (
                      <div className="absolute left-4 top-12 w-0.5 h-full bg-gray-200 z-0"></div>
                    )}
                    <div className="relative flex items-start space-x-4 pb-8">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold z-10">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <AgeGroupCard ageGroup={ageGroup} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Geen leeftijdsgroepen gevonden
            </h3>
            <p className="text-gray-600">
              Kom later terug voor meer inhoud.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
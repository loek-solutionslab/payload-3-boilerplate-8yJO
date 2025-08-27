'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { RelumeGalleryBlock } from '@/payload-types'
import { Media } from '@/components/Media'

interface RelumeGalleryProps {
  block: RelumeGalleryBlock
}

const GalleryImage: React.FC<{
  image: any
  link?: any
  className?: string
  priority?: boolean
}> = ({ image, link, className, priority = false }) => {
  const imageContent = (
    <Media
      resource={image}
      className={`size-full object-cover ${className || ''}`}
      priority={priority}
    />
  )

  if (!link || link.type === 'none') {
    return imageContent
  }

  if (link.type === 'reference' && link.reference?.value?.slug) {
    return (
      <Link href={`/${link.reference.value.slug}`} className="block">
        {imageContent}
      </Link>
    )
  }

  if (link.type === 'custom' && link.url) {
    return (
      <a href={link.url} className="block" target="_blank" rel="noopener noreferrer">
        {imageContent}
      </a>
    )
  }

  return imageContent
}

// Gallery 04 - Grid Layout
const Gallery04: React.FC<{ block: RelumeGalleryBlock }> = ({ block }) => {
  const { title, description, images } = block

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {title}
          </h2>
          {description && (
            <p className="md:text-md">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 items-start justify-center gap-6 md:gap-8 lg:grid-cols-4">
          {images?.map((item, index) => (
            <GalleryImage
              key={index}
              image={item.image}
              link={item.link}
              className="rounded-image"
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Gallery 08 - Masonry Layout
const Gallery08: React.FC<{ block: RelumeGalleryBlock }> = ({ block }) => {
  const { title, description, images } = block

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {title}
          </h2>
          {description && (
            <p className="md:text-md">
              {description}
            </p>
          )}
        </div>
        <div className="gap-x-8 md:columns-2">
          {images?.map((item, index) => {
            const aspectRatio = index % 3 === 0 ? 'pt-[100%]' : 'pt-[66.66%]'
            
            return (
              <div key={index} className="mb-8 inline-block w-full">
                <div className={`relative inline-block w-full ${aspectRatio}`}>
                  <GalleryImage
                    image={item.image}
                    link={item.link}
                    className="absolute inset-0 rounded-image"
                    priority={index < 2}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export const RelumeGalleryComponent: React.FC<RelumeGalleryProps> = ({ block }) => {
  const { variant = 'gallery-04', backgroundColor } = block

  const galleryContent = (() => {
    switch (variant) {
      case 'gallery-08':
        return <Gallery08 block={block} />
      case 'gallery-04':
      default:
        return <Gallery04 block={block} />
    }
  })()

  if (backgroundColor) {
    return <div className={backgroundColor}>{galleryContent}</div>
  }

  return galleryContent
}
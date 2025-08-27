import type { Post, Category, PostsArchiveBlock as PostsArchiveBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import { PostsArchiveClient } from './Component.client'

const PostCard: React.FC<{ post: Post; layout?: 'grid' | 'list' | 'magazine' }> = ({ post, layout = 'grid' }) => {
  const isListLayout = layout === 'list'
  const isMagazineLayout = layout === 'magazine'
  
  return (
    <Link href={`/blogs/${post.slug}`} className="block group">
      <article className={`
        rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden
        ${isListLayout ? 'flex' : 'flex flex-col'}
        ${isMagazineLayout ? 'h-full' : ''}
      `}>
        {post.meta?.image && typeof post.meta.image === 'object' && (
          <div className={`
            relative overflow-hidden
            ${isListLayout ? 'w-48 flex-shrink-0' : 'aspect-video'}
            ${isMagazineLayout ? 'aspect-[4/3]' : ''}
          `}>
            <Media 
              resource={post.meta.image}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        )}
        
        <div className={`
          p-6 flex-1 flex flex-col
          ${isListLayout ? 'justify-center' : ''}
        `}>
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {post.categories.slice(0, 2).map((category) => {
                  if (typeof category === 'string') return null
                  const cat = category as Category
                  return (
                    <span 
                      key={cat.id}
                      className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium"
                    >
                      {cat.title}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
          
          <h3 className={`
            font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3
            ${isMagazineLayout ? 'text-xl leading-tight' : 'text-lg'}
            ${isListLayout ? 'text-lg' : ''}
          `}>
            {post.title}
          </h3>
          
          {post.meta?.description && (
            <p className={`
              text-gray-600 mb-4 line-clamp-3 flex-1
              ${isListLayout ? 'text-sm' : 'text-sm'}
            `}>
              {post.meta.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center space-x-3">
              {post.authors && post.authors.length > 0 && (
                <span>
                  Door {post.authors.map(author => {
                    if (typeof author === 'string') return author
                    return author.name || 'Onbekend'
                  }).join(', ')}
                </span>
              )}
              {post.publishedAt && (
                <span>
                  {formatDateTime(post.publishedAt)}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Lees meer
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export const PostsArchiveBlock: React.FC<
  PostsArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { 
    id, 
    title = 'Blog',
    description,
    introContent, 
    populateBy, 
    categories,
    selectedPosts,
    limit: limitFromProps,
    showCategories = true,
    layout = 'grid'
  } = props

  const limit = limitFromProps || 10
  let posts: Post[] = []
  let allCategories: Category[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    if (populateBy === 'collection') {
      const result = await payload.find({
        collection: 'posts',
        depth: 2,
        limit,
        where: {
          _status: {
            equals: 'published',
          },
        },
        sort: '-publishedAt',
      })
      posts = result.docs
    } else if (populateBy === 'category' && categories?.length) {
      const flattenedCategories = categories.map((cat) => {
        if (typeof cat === 'object') return cat.id
        else return cat
      })

      const result = await payload.find({
        collection: 'posts',
        depth: 2,
        limit,
        where: {
          _status: {
            equals: 'published',
          },
          categories: {
            in: flattenedCategories,
          },
        },
        sort: '-publishedAt',
      })
      posts = result.docs
    } else if (populateBy === 'selection' && selectedPosts?.length) {
      const filteredSelected = selectedPosts.map((post) => {
        if (typeof post === 'object') return post
        return null
      }).filter(Boolean) as Post[]
      posts = filteredSelected
    }

    // Get all categories for filtering
    if (showCategories) {
      const categoriesResult = await payload.find({
        collection: 'categories',
        depth: 1,
        limit: 50,
      })
      allCategories = categoriesResult.docs
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
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

        <PostsArchiveClient
          posts={posts}
          allCategories={allCategories}
          showCategories={showCategories}
          layout={layout}
        />
      </div>
    </div>
  )
}
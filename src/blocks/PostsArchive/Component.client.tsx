'use client'

import type { Post, Category } from '@/payload-types'
import React, { useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

interface PostsArchiveClientProps {
  posts: Post[]
  allCategories: Category[]
  showCategories: boolean
  layout: 'grid' | 'list' | 'magazine'
}

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
                    if (typeof author === 'number') return 'Onbekend'
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

export const PostsArchiveClient: React.FC<PostsArchiveClientProps> = ({
  posts,
  allCategories,
  showCategories,
  layout
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory
    ? posts.filter(post => 
        post.categories?.some(cat => 
          typeof cat === 'object' && cat.id.toString() === activeCategory
        )
      )
    : posts

  // Get categories that are actually used in posts
  const usedCategories = allCategories.filter(category =>
    posts.some(post =>
      post.categories?.some(cat =>
        typeof cat === 'object' && cat.id === category.id
      )
    )
  )

  return (
    <>
      {showCategories && usedCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Alle Posts
          </button>
          {usedCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id.toString())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id.toString() 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <>
          {layout === 'grid' && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} layout={layout} />
              ))}
            </div>
          )}
          
          {layout === 'list' && (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} layout={layout} />
              ))}
            </div>
          )}
          
          {layout === 'magazine' && (
            <div className="grid gap-8">
              {filteredPosts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Featured post */}
                  <div className="lg:col-span-1">
                    <PostCard post={filteredPosts[0]} layout="magazine" />
                  </div>
                  
                  {/* Secondary posts */}
                  {filteredPosts.length > 1 && (
                    <div className="grid gap-6">
                      {filteredPosts.slice(1, 3).map((post) => (
                        <PostCard key={post.id} post={post} layout="list" />
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Remaining posts in grid */}
              {filteredPosts.length > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {filteredPosts.slice(3).map((post) => (
                    <PostCard key={post.id} post={post} layout="grid" />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {activeCategory 
              ? 'Geen blog posts gevonden in deze categorie'
              : 'Geen blog posts gevonden'
            }
          </h3>
          <p className="text-gray-600">
            Probeer een andere categorie of kom later terug.
          </p>
        </div>
      )}
    </>
  )
}
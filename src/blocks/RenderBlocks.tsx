import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FeaturesBlock } from '@/blocks/FeaturesBlock/Component'
import { NewsletterCTA } from '@/blocks/NewsletterCTA/Component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'
import { FAQBlock } from '@/blocks/FAQBlock/Component'
import { CourseArchiveBlock } from '@/blocks/CourseArchive/Component'
import { AgeGroupsArchiveBlock } from '@/blocks/AgeGroupsArchive/Component'
import { PostsArchiveBlock } from '@/blocks/PostsArchive/Component'
import { RelumeHeaderBlockComponent } from '@/blocks/RelumeHeader/Component'
import { RelumeLayoutBlockComponent } from '@/blocks/RelumeLayout/Component'
import { RelumeCTABlockComponent } from '@/blocks/RelumeCTA/Component'
import { RelumeGalleryComponent } from '@/blocks/RelumeGallery/Component'
import { RelumePricingComponent } from '@/blocks/RelumePricing/Component'
import { RelumeTeamComponent } from '@/blocks/RelumeTeam/Component'
import { RelumeContactComponent } from '@/blocks/RelumeContact/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  features: FeaturesBlock,
  newsletterCTA: NewsletterCTA,
  testimonials: TestimonialsBlock,
  faq: FAQBlock,
  courseArchive: CourseArchiveBlock,
  ageGroupsArchive: AgeGroupsArchiveBlock,
  postsArchive: PostsArchiveBlock,
  relumeHeader: RelumeHeaderBlockComponent,
  relumeLayout: RelumeLayoutBlockComponent,
  relumeCTA: RelumeCTABlockComponent,
  relumeGallery: RelumeGalleryComponent,
  relumePricing: RelumePricingComponent,
  relumeTeam: RelumeTeamComponent,
  relumeContact: RelumeContactComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Get background color from block data
              const backgroundColorClass = (block as any)?.backgroundColor || ''
              const backgroundClasses = backgroundColorClass ? `${backgroundColorClass}` : ''
              
              return (
                <div className={`my-16 ${backgroundClasses}`.trim()} key={index}>
                  {/* @ts-expect-error Server Component */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

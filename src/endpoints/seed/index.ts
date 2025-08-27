import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import path from 'path'
import fs from 'fs'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { image3 } from './image-3'
import { image4 } from './image-4'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { post4 } from './post-4'
import { courses } from './courses'
import { ageGroups } from './age-groups'
import { services } from './services'
import { testimonials } from './testimonials'
import { team } from './team'
import { faq } from './faq'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'courses',
  'ageGroups',
  'services',
  'testimonials',
  'team',
  'faq'
]
const globals: GlobalSlug[] = ['header', 'footer', 'siteSettings']

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET'
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength
  }
}

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  try {
    payload.logger.info('Seeding database...')

    // we need to clear the media directory before seeding
    // as well as the collections and globals
    // this is because while `yarn seed` drops the database
    // the custom `/api/seed` endpoint does not

    payload.logger.info(`— Clearing media...`)
    payload.logger.info(`— Clearing collections and globals...`)

    // First, clear the search collection to avoid ID conflicts
    await payload.delete({
      collection: 'search',
      where: {
        id: {
          exists: true
        }
      }
    })

    // clear the database
    for (const global of globals) {
      await payload.updateGlobal({
        slug: global,
        data: {
          navItems: []
        }
      })
    }

    // Then clear other collections
    for (const collection of collections.filter(c => c !== 'search')) {
      await payload.delete({
        collection: collection,
        where: {
          id: {
            exists: true
          }
        }
      })
    }

    payload.logger.info(`— Seeding demo author and user...`)

    await payload.delete({
      collection: 'users',
      where: {
        email: {
          equals: 'demo-author@payloadcms.com'
        }
      }
    })

    const demoAuthor = await payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@payloadcms.com',
        password: 'password'
      }
    })

    let demoAuthorID: number | string = demoAuthor.id

    payload.logger.info(`— Seeding media...`)

    // Load all files first
    const [image1File, image2File, image3File, hero1File, vendureFile] = await Promise.all([
      fetchFileByURL(
        'https://res.cloudinary.com/hczpmiapo/image/upload/v1732740471/Static%20assets/graphics/payload%203/payload-cover_ygdcoq.png'
      ),
      fetchFileByURL(
        'https://res.cloudinary.com/hczpmiapo/image/upload/v1732740471/Static%20assets/graphics/payload%203/payload-2-cover_ortrhb.png'
      ),
      fetchFileByURL(
        'https://res.cloudinary.com/hczpmiapo/image/upload/v1732743964/Medusa-2.0-official-release-deploy-on-railway-cover_a7knvp.png'  // Updated to use same URL as image4
      ),
      fetchFileByURL(
        'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp'
      ),
      fetchFileByURL(
        'https://res-1.cloudinary.com/hczpmiapo/image/upload/q_auto/v1/ghost-blog-images/vendure-cover.png'
      )
    ])

    payload.logger.info(`— Creating media documents...`)

    // Create media documents
    const [image1Doc, image2Doc, image3Doc, imageHomeDoc, image4Doc] = await Promise.all([
      payload.create({
        collection: 'media',
        data: image1,
        file: image1File
      }),
      payload.create({
        collection: 'media',
        data: image2,
        file: image2File
      }),
      payload.create({
        collection: 'media',
        data: image3,
        file: image3File
      }),
      payload.create({
        collection: 'media',
        data: image2,
        file: hero1File
      }),
      payload.create({
        collection: 'media',
        data: image4,
        file: vendureFile
      })
    ])

    let image1ID: number | string = image1Doc.id
    let image2ID: number | string = image2Doc.id
    let image3ID: number | string = image3Doc.id
    let image4ID: number | string = image4Doc.id
    let imageHomeID: number | string = imageHomeDoc.id

    if (payload.db.defaultIDType === 'text') {
      image1ID = `"${image1Doc.id}"`
      image2ID = `"${image2Doc.id}"`
      image3ID = `"${image3Doc.id}"`
      image4ID = `"${image4Doc.id}"`
      imageHomeID = `"${imageHomeDoc.id}"`
      demoAuthorID = `"${demoAuthorID}"`
    }

    // Create categories
    payload.logger.info(`— Seeding categories...`)
    const [technologyCategory, newsCategory, financeCategory] = await Promise.all([
      payload.create({
        collection: 'categories',
        data: {
          title: 'Technology'
        }
      }),
      payload.create({
        collection: 'categories',
        data: {
          title: 'News'
        }
      }),
      payload.create({
        collection: 'categories',
        data: {
          title: 'Finance'
        }
      })
    ])

    await Promise.all([
      payload.create({
        collection: 'categories',
        data: {
          title: 'Design'
        }
      }),
      payload.create({
        collection: 'categories',
        data: {
          title: 'Software'
        }
      }),
      payload.create({
        collection: 'categories',
        data: {
          title: 'Engineering'
        }
      })
    ])

    // Create posts
    payload.logger.info(`— Seeding posts...`)

    // Create posts without related posts first
    const [post1Doc, post2Doc, post3Doc, post4Doc] = await Promise.all([
      payload.create({
        collection: 'posts',
        data: JSON.parse(
          JSON.stringify({ ...post1, categories: [technologyCategory.id] })
            .replace(/"\{\{IMAGE_1\}\}"/g, String(image1ID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
            .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID))
        )
      }),
      payload.create({
        collection: 'posts',
        data: JSON.parse(
          JSON.stringify({ ...post2, categories: [newsCategory.id] })
            .replace(/"\{\{IMAGE_1\}\}"/g, String(image2ID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image3ID))
            .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID))
        )
      }),
      payload.create({
        collection: 'posts',
        data: JSON.parse(
          JSON.stringify({ ...post3, categories: [financeCategory.id] })
            .replace(/"\{\{IMAGE_1\}\}"/g, String(image3ID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image1ID))
            .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID))
        )
      }),
      payload.create({
        collection: 'posts',
        data: JSON.parse(
          JSON.stringify({ ...post4, categories: [technologyCategory.id] })
            .replace(/"\{\{IMAGE_1\}\}"/g, String(image4ID))
            .replace(/"\{\{IMAGE_2\}\}"/g, String(image3ID))
            .replace(/"\{\{AUTHOR\}\}"/g, String(demoAuthorID))
        )
      })
    ])

    // Clear any existing search documents
    await payload.delete({
      collection: 'search',
      where: {
        id: {
          exists: true
        }
      }
    })

    // Update related posts in order
    payload.logger.info(`— Updating related posts...`)

    await payload.update({
      id: post1Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post2Doc.id, post3Doc.id, post4Doc.id]
      }
    })

    await payload.update({
      id: post2Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id, post3Doc.id, post4Doc.id]
      }
    })

    await payload.update({
      id: post3Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id, post2Doc.id, post4Doc.id]
      }
    })

    await payload.update({
      id: post4Doc.id,
      collection: 'posts',
      data: {
        relatedPosts: [post1Doc.id, post2Doc.id, post3Doc.id]
      }
    })

    // Create custom collections for Schermblij
    payload.logger.info(`— Seeding courses...`)
    const coursePromises = courses.map(course => payload.create({
      collection: 'courses',
      data: course
    }))
    await Promise.all(coursePromises)

    payload.logger.info(`— Seeding age groups...`)
    const ageGroupPromises = ageGroups.map(ageGroup => payload.create({
      collection: 'ageGroups',
      data: ageGroup
    }))
    await Promise.all(ageGroupPromises)

    payload.logger.info(`— Seeding services...`)
    const servicePromises = services.map(service => payload.create({
      collection: 'services',
      data: service
    }))
    await Promise.all(servicePromises)

    payload.logger.info(`— Seeding testimonials...`)
    const testimonialPromises = testimonials.map(testimonial => payload.create({
      collection: 'testimonials',
      data: testimonial
    }))
    await Promise.all(testimonialPromises)

    payload.logger.info(`— Seeding team...`)
    const teamPromises = team.map(member => payload.create({
      collection: 'team',
      data: member
    }))
    await Promise.all(teamPromises)

    payload.logger.info(`— Seeding FAQ...`)
    const faqPromises = faq.map(question => payload.create({
      collection: 'faq',
      data: question
    }))
    await Promise.all(faqPromises)

    // Create home page
    payload.logger.info(`— Seeding home page...`)

    await payload.create({
      collection: 'pages',
      data: JSON.parse(
        JSON.stringify(home)
          .replace(/"\{\{IMAGE_1\}\}"/g, String(imageHomeID))
          .replace(/"\{\{IMAGE_2\}\}"/g, String(image2ID))
      )
    })

    // Create contact form
    payload.logger.info(`— Seeding contact form...`)

    const contactForm = await payload.create({
      collection: 'forms',
      data: JSON.parse(JSON.stringify(contactFormData))
    })

    let contactFormID: number | string = contactForm.id

    if (payload.db.defaultIDType === 'text') {
      contactFormID = `"${contactFormID}"`
    }

    // Create contact page
    payload.logger.info(`— Seeding contact page...`)

    const contactPage = await payload.create({
      collection: 'pages',
      data: JSON.parse(
        JSON.stringify(contactPageData).replace(/"\{\{CONTACT_FORM_ID\}\}"/g, String(contactFormID))
      )
    })

    // Update header
    payload.logger.info(`— Seeding header...`)

    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts'
            }
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id
              }
            }
          }
        ]
      }
    })

    // Update footer
    payload.logger.info(`— Seeding footer...`)

    await payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Over Lisanne',
              url: '/over-lisanne'
            }
          },
          {
            link: {
              type: 'custom',
              label: 'Cursussen',
              url: '/cursussen'
            }
          },
          {
            link: {
              type: 'custom',
              label: 'Contact',
              url: '/contact'
            }
          },
          {
            link: {
              type: 'custom',
              label: 'Privacy',
              url: '/privacy'
            }
          }
        ]
      }
    })

    // Update site settings
    payload.logger.info(`— Seeding site settings...`)

    await payload.updateGlobal({
      slug: 'siteSettings',
      data: {
        siteName: 'Schermblij',
        siteDescription: 'Hulp bij het vinden van de perfecte balans tussen schermtijd en offline activiteiten voor kinderen.',
        defaultSEO: {
          title: 'Schermblij - Gezonde schermtijd voor kinderen',
          description: 'Bij Schermblij helpen we ouders om een gezonde balans te creëren tussen online en offline activiteiten. Ontdek hoe digitale media een waardevolle aanvulling kan zijn op het leven van uw kinderen.',
          keywords: 'schermtijd, kinderen, opvoeding, digitale media, balans, ouders, educatie'
        },
        notifications: {
          enabled: false
        },
        maintenance: {
          enabled: false
        },
        forms: {
          contactEmail: 'info@schermblij.nl'
        }
      }
    })

    payload.logger.info('✨ Database seeded successfully!')
  } catch (error) {
    payload.logger.error('Error seeding database:')
    payload.logger.error(error)
    throw error
  }
}

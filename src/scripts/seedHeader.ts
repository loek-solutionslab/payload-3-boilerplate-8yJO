import { getPayload } from 'payload'
import config from '@payload-config'

const navigationItems = [
  {
    link: {
      type: 'custom',
      url: '/',
      label: 'Home',
    },
    description: 'Ga naar de homepagina',
    featured: false,
  },
  {
    link: {
      type: 'custom',
      url: '/cursussen',
      label: 'Cursussen',
    },
    description: 'Bekijk ons aanbod aan cursussen',
    featured: false,
  },
  {
    link: {
      type: 'custom',
      url: '/voor-elke-leeftijd',
      label: 'Voor Elke Leeftijd',
    },
    description: 'Tips en advies per leeftijdsgroep',
    featured: false,
  },
  {
    link: {
      type: 'custom',
      url: '/blogs',
      label: 'Blog',
    },
    description: 'Lees onze laatste artikelen en tips',
    featured: false,
  },
  {
    link: {
      type: 'custom',
      url: '/over-lisanne',
      label: 'Over Lisanne',
    },
    description: 'Meer over Lisanne en haar expertise',
    featured: false,
  },
  {
    link: {
      type: 'custom',
      url: '/contact',
      label: 'Contact',
    },
    description: 'Neem contact met ons op',
    featured: true, // Featured as it's important for conversions
  },
]

export async function seedHeader() {
  try {
    const payload = await getPayload({ config })

    // Check if header already exists
    const existingHeader = await payload.findGlobal({
      slug: 'header',
    })

    const headerData = {
      navItems: navigationItems,
      ctaButton: {
        show: true,
        link: {
          type: 'custom',
          url: '/cursussen',
          label: 'Bekijk Cursussen',
        },
        style: 'primary',
      },
      showSearch: true,
    }

    if (existingHeader) {
      // Update existing header
      await payload.updateGlobal({
        slug: 'header',
        data: headerData,
      })
      console.log('✅ Header navigation updated successfully!')
    } else {
      // Create new header
      await payload.updateGlobal({
        slug: 'header',
        data: headerData,
      })
      console.log('✅ Header navigation created successfully!')
    }

    console.log('📋 Navigation items added:')
    navigationItems.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.link.label} (${item.link.url})${item.featured ? ' [FEATURED]' : ''}`)
    })
    console.log('🔲 CTA Button: "Bekijk Cursussen" → /cursussen')
    console.log('🔍 Search: Enabled')
  } catch (error) {
    console.error('❌ Error seeding header:', error)
    throw error
  }
}

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedHeader()
    .then(() => {
      console.log('Header seed completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Header seed failed:', error)
      process.exit(1)
    })
}
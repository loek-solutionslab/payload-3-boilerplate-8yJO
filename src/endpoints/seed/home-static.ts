import type { Page } from '@/payload-types'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: Partial<Page> = {
  slug: 'home',
  _status: 'published',
  layout: [
    {
      blockType: 'relumeHeader',
      variant: 'header-46',
      title: 'Payload Website Template',
      description: 'Visit the admin dashboard to make your account and seed content for your website.',
      alignment: 'center',
    },
  ],
  meta: {
    description: 'An open-source website built with Payload and Next.js.',
    title: 'Payload Website Template',
  },
  title: 'Home',
}

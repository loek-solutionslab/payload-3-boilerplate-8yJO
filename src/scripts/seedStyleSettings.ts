import { getPayload } from 'payload'
import config from '@payload-config'

const brandColors = [
  // Neutrals
  { name: 'Neutral White', value: '#FFFFFF', category: 'neutrals', shade: 'lightest' },
  { name: 'Neutral Lightest', value: '#F2F2F2', category: 'neutrals', shade: 'lighter' },
  { name: 'Neutral Lighter', value: '#D0D0D0', category: 'neutrals', shade: 'light' },
  { name: 'Neutral Light', value: '#B8B8B5', category: 'neutrals', shade: 'base' },
  { name: 'Neutral', value: '#B8B8B5', category: 'neutrals', shade: 'base' },
  { name: 'Neutral Dark', value: '#656564', category: 'neutrals', shade: 'dark' },
  { name: 'Neutral Darker', value: '#464433', category: 'neutrals', shade: 'darker' },
  { name: 'Neutral Darkest', value: '#000000', category: 'neutrals', shade: 'darkest' },
  
  // Smalt Blue
  { name: 'Smalt Blue Lightest', value: '#EDF3F5', category: 'smalt-blue', shade: 'lightest' },
  { name: 'Smalt Blue Lighter', value: '#DBE5E8', category: 'smalt-blue', shade: 'lighter' },
  { name: 'Smalt Blue Light', value: '#B396AE', category: 'smalt-blue', shade: 'light' },
  { name: 'Smalt Blue', value: '#4F758D', category: 'smalt-blue', shade: 'base', isDefault: true },
  { name: 'Smalt Blue Dark', value: '#3F5D70', category: 'smalt-blue', shade: 'dark' },
  { name: 'Smalt Blue Darker', value: '#1F2E38', category: 'smalt-blue', shade: 'darker' },
  { name: 'Smalt Blue Darkest', value: '#17252A', category: 'smalt-blue', shade: 'darkest' },
  
  // Persian Green
  { name: 'Persian Green Lightest', value: '#E5F7F4', category: 'persian-green', shade: 'lightest' },
  { name: 'Persian Green Lighter', value: '#CCEEE6', category: 'persian-green', shade: 'lighter' },
  { name: 'Persian Green Light', value: '#40C7B8', category: 'persian-green', shade: 'light' },
  { name: 'Persian Green', value: '#01B09A', category: 'persian-green', shade: 'base' },
  { name: 'Persian Green Dark', value: '#008C7B', category: 'persian-green', shade: 'dark' },
  { name: 'Persian Green Darker', value: '#006450', category: 'persian-green', shade: 'darker' },
  { name: 'Persian Green Darkest', value: '#00432E', category: 'persian-green', shade: 'darkest' },
  
  // Merino
  { name: 'Merino Lightest', value: '#FDF4FB', category: 'merino', shade: 'lightest' },
  { name: 'Merino Lighter', value: '#FCEAF8', category: 'merino', shade: 'lighter' },
  { name: 'Merino Light', value: '#F6EEE8', category: 'merino', shade: 'light' },
  { name: 'Merino', value: '#F5E0DF', category: 'merino', shade: 'base' },
  { name: 'Merino Dark', value: '#C2BAB2', category: 'merino', shade: 'dark' },
  { name: 'Merino Darker', value: '#605059', category: 'merino', shade: 'darker' },
  { name: 'Merino Darkest', value: '#484542', category: 'merino', shade: 'darkest' },
  
  // Bittersweet
  { name: 'Bittersweet Lightest', value: '#FFF0F0', category: 'bittersweet', shade: 'lightest' },
  { name: 'Bittersweet Lighter', value: '#FFE8E1', category: 'bittersweet', shade: 'lighter' },
  { name: 'Bittersweet Light', value: '#FF7971', category: 'bittersweet', shade: 'light' },
  { name: 'Bittersweet', value: '#FF6B68', category: 'bittersweet', shade: 'base' },
  { name: 'Bittersweet Dark', value: '#CC5555', category: 'bittersweet', shade: 'dark' },
  { name: 'Bittersweet Darker', value: '#66242A', category: 'bittersweet', shade: 'darker' },
  { name: 'Bittersweet Darkest', value: '#4C2020', category: 'bittersweet', shade: 'darkest' },
  
  // Regent St Blue
  { name: 'Regent St Blue Lightest', value: '#F2F8FC', category: 'regent-st-blue', shade: 'lightest' },
  { name: 'Regent St Blue Lighter', value: '#E5F0F2', category: 'regent-st-blue', shade: 'lighter' },
  { name: 'Regent St Blue Light', value: '#B2D5EA', category: 'regent-st-blue', shade: 'light' },
  { name: 'Regent St Blue', value: '#A6D2E4', category: 'regent-st-blue', shade: 'base' },
  { name: 'Regent St Blue Dark', value: '#61A8BA', category: 'regent-st-blue', shade: 'dark' },
  { name: 'Regent St Blue Darker', value: '#60504A', category: 'regent-st-blue', shade: 'darker' },
  { name: 'Regent St Blue Darkest', value: '#353F43', category: 'regent-st-blue', shade: 'darkest' },
]

const brandFonts = [
  {
    name: 'Primary Heading Font',
    cssValue: 'Inter, system-ui, -apple-system, sans-serif',
    category: 'headings',
    isDefault: true,
    weights: [
      { name: 'Regular', value: '400' },
      { name: 'Medium', value: '500' },
      { name: 'Semibold', value: '600' },
      { name: 'Bold', value: '700' },
    ],
  },
  {
    name: 'Body Text Font',
    cssValue: 'Inter, system-ui, -apple-system, sans-serif',
    category: 'body',
    weights: [
      { name: 'Regular', value: '400' },
      { name: 'Medium', value: '500' },
    ],
  },
]

const fontSizes = [
  { name: 'Display Large', value: '4rem', category: 'display' },
  { name: 'Display Medium', value: '3rem', category: 'display' },
  { name: 'Heading 1', value: '2.5rem', category: 'heading' },
  { name: 'Heading 2', value: '2rem', category: 'heading' },
  { name: 'Heading 3', value: '1.5rem', category: 'heading' },
  { name: 'Heading 4', value: '1.25rem', category: 'heading' },
  { name: 'Body Large', value: '1.125rem', category: 'body' },
  { name: 'Body Regular', value: '1rem', category: 'body' },
  { name: 'Body Small', value: '0.875rem', category: 'body' },
  { name: 'Caption', value: '0.75rem', category: 'caption' },
]

export async function seedStyleSettings() {
  try {
    const payload = await getPayload({ config })

    // Check if StyleSettings already exists
    const existingSettings = await payload.findGlobal({
      slug: 'styleSettings',
    })

    const styleSettingsData = {
      backgroundColors: brandColors,
      textColors: [
        { name: 'Primary Text', value: '#000000', usage: 'body' },
        { name: 'Secondary Text', value: '#656564', usage: 'muted' },
        { name: 'Link Color', value: '#4F758D', usage: 'links' },
        { name: 'Accent Color', value: '#01B09A', usage: 'accent' },
      ],
      fontFamilies: brandFonts,
      fontSizes: fontSizes,
      spacing: [
        { name: 'Extra Small', value: '0.25rem', usage: 'Small gaps, fine details' },
        { name: 'Small', value: '0.5rem', usage: 'Button padding, small margins' },
        { name: 'Medium', value: '1rem', usage: 'General spacing, content margins' },
        { name: 'Large', value: '2rem', usage: 'Section spacing, large gaps' },
        { name: 'Extra Large', value: '4rem', usage: 'Major section separators' },
      ],
    }

    if (existingSettings) {
      // Update existing settings
      await payload.updateGlobal({
        slug: 'styleSettings',
        data: styleSettingsData,
      })
      console.log('✅ StyleSettings updated successfully with brand colors and typography!')
    } else {
      // Create new settings
      await payload.updateGlobal({
        slug: 'styleSettings',
        data: styleSettingsData,
      })
      console.log('✅ StyleSettings created successfully with brand colors and typography!')
    }
  } catch (error) {
    console.error('❌ Error seeding StyleSettings:', error)
    throw error
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedStyleSettings()
    .then(() => {
      console.log('Seed completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seed failed:', error)
      process.exit(1)
    })
}
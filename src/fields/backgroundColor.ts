import type { Field } from 'payload'

export const backgroundColorField: Field = {
  name: 'backgroundColor',
  type: 'select',
  label: 'Background Color',
  admin: {
    description: 'Choose a background color for this block',
    position: 'sidebar',
  },
  options: [
    { label: 'None (Transparent)', value: '' },
    
    // Note: Colors will be managed through StyleSettings global
    // This is a temporary static list until dynamic loading is implemented
    
    // Neutrals
    { label: 'Neutral White', value: 'bg-[#FFFFFF]' },
    { label: 'Neutral Lightest', value: 'bg-[#F2F2F2]' },
    { label: 'Neutral Light', value: 'bg-[#B8B8B5]' },
    { label: 'Neutral Dark', value: 'bg-[#656564]' },
    { label: 'Neutral Darkest', value: 'bg-[#000000]' },
    
    // Smalt Blue
    { label: 'Smalt Blue Lightest', value: 'bg-[#EDF3F5]' },
    { label: 'Smalt Blue Light', value: 'bg-[#B396AE]' },
    { label: 'Smalt Blue', value: 'bg-[#4F758D]' },
    { label: 'Smalt Blue Dark', value: 'bg-[#3F5D70]' },
    { label: 'Smalt Blue Darkest', value: 'bg-[#17252A]' },
    
    // Persian Green
    { label: 'Persian Green Lightest', value: 'bg-[#E5F7F4]' },
    { label: 'Persian Green Light', value: 'bg-[#40C7B8]' },
    { label: 'Persian Green', value: 'bg-[#01B09A]' },
    { label: 'Persian Green Dark', value: 'bg-[#008C7B]' },
    { label: 'Persian Green Darkest', value: 'bg-[#00432E]' },
    
    // Merino
    { label: 'Merino Lightest', value: 'bg-[#FDF4FB]' },
    { label: 'Merino Light', value: 'bg-[#F6EEE8]' },
    { label: 'Merino', value: 'bg-[#F5E0DF]' },
    { label: 'Merino Dark', value: 'bg-[#C2BAB2]' },
    { label: 'Merino Darkest', value: 'bg-[#484542]' },
    
    // Bittersweet
    { label: 'Bittersweet Lightest', value: 'bg-[#FFF0F0]' },
    { label: 'Bittersweet Light', value: 'bg-[#FF7971]' },
    { label: 'Bittersweet', value: 'bg-[#FF6B68]' },
    { label: 'Bittersweet Dark', value: 'bg-[#CC5555]' },
    { label: 'Bittersweet Darkest', value: 'bg-[#4C2020]' },
    
    // Regent St Blue
    { label: 'Regent St Blue Lightest', value: 'bg-[#F2F8FC]' },
    { label: 'Regent St Blue Light', value: 'bg-[#B2D5EA]' },
    { label: 'Regent St Blue', value: 'bg-[#A6D2E4]' },
    { label: 'Regent St Blue Dark', value: 'bg-[#61A8BA]' },
    { label: 'Regent St Blue Darkest', value: 'bg-[#353F43]' },
  ],
  defaultValue: '',
}
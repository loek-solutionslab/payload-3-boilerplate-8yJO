'use client'

import React from 'react'
import Link from 'next/link'
import { Linkedin, Twitter, Instagram, Facebook, Github, Globe } from 'lucide-react'
import { FaDribbble } from 'react-icons/fa'
import type { RelumeTeamBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'

interface RelumeTeamProps {
  block: RelumeTeamBlock
}

const SocialIcon: React.FC<{ platform: string; className?: string }> = ({ platform, className = "size-6" }) => {
  switch (platform) {
    case 'linkedin':
      return <Linkedin className={className} />
    case 'twitter':
      return <Twitter className={className} />
    case 'instagram':
      return <Instagram className={className} />
    case 'facebook':
      return <Facebook className={className} />
    case 'dribbble':
      return <FaDribbble className={className} />
    case 'github':
      return <Github className={className} />
    case 'website':
      return <Globe className={className} />
    default:
      return <Globe className={className} />
  }
}

const TeamMember: React.FC<{ member: any; index: number; socialLinks: any[] }> = ({ member, index, socialLinks }) => {
  const { photo, name, position, bio } = member
  
  // Filter social links for this specific team member
  const memberSocialLinks = socialLinks?.filter(link => 
    link.teamMember === name || link.teamMember === member.name
  ) || []

  return (
    <div className="flex flex-col items-start">
      <div className="mb-5 md:mb-6">
        <Media
          resource={photo}
          className="size-20 min-h-20 min-w-20 rounded-full object-cover"
          priority={index < 4}
        />
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">
          {name}
        </h5>
        <h6 className="text-muted-foreground md:text-md">{position}</h6>
      </div>
      <p className="text-sm">{bio}</p>
      {memberSocialLinks && memberSocialLinks.length > 0 && (
        <div className="mt-6 flex gap-3.5">
          {memberSocialLinks.map((link: any, linkIndex: number) => (
            <a
              key={linkIndex}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={`${name} on ${link.platform}`}
            >
              <SocialIcon platform={link.platform} />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export const RelumeTeamComponent: React.FC<RelumeTeamProps> = ({ block }) => {
  const { 
    tagline, 
    title, 
    description, 
    teamMembers = [], 
    socialLinks = [],
    hiringSection,
    backgroundColor 
  } = block

  const getHiringButtonHref = () => {
    if (!hiringSection?.show || !hiringSection?.buttonLink) return '#'
    
    if (hiringSection.buttonLink.type === 'reference' && hiringSection.buttonLink.reference?.value) {
      const page = hiringSection.buttonLink.reference.value
      if (typeof page === 'object' && 'slug' in page && page.slug) {
        return `/${page.slug}`
      }
    }
    
    if (hiringSection.buttonLink.type === 'custom' && hiringSection.buttonLink.url) {
      return hiringSection.buttonLink.url
    }
    
    return '#'
  }
  
  const ButtonComponent = (hiringSection?.buttonLink?.type === 'reference' ? Link : 'a') as any
  const buttonProps = hiringSection?.buttonLink?.type === 'custom' 
    ? { target: '_blank', rel: 'noopener noreferrer' } 
    : {}

  const content = (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          {tagline && (
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          )}
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {title}
          </h2>
          {description && (
            <p className="md:text-md text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        
        {/* Team Members Grid */}
        {teamMembers && teamMembers.length > 0 && (
          <div className={`grid gap-x-8 gap-y-12 md:gap-y-16 ${
            teamMembers.length <= 2 
              ? 'grid-cols-1 md:grid-cols-2' 
              : teamMembers.length <= 3
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} index={index} socialLinks={socialLinks || []} />
            ))}
          </div>
        )}

        {/* Hiring Section */}
        {hiringSection?.show && (
          <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24">
            <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
              {hiringSection.title || 'We werven!'}
            </h4>
            {hiringSection.description && (
              <p className="md:text-md text-muted-foreground">
                {hiringSection.description}
              </p>
            )}
            <div className="mt-6 md:mt-8">
              <ButtonComponent
                href={getHiringButtonHref()}
                {...buttonProps}
              >
                <Button variant="secondary">
                  {hiringSection.buttonText || 'Open posities'}
                </Button>
              </ButtonComponent>
            </div>
          </div>
        )}
      </div>
    </section>
  )

  if (backgroundColor) {
    return <div className={backgroundColor}>{content}</div>
  }

  return content
}
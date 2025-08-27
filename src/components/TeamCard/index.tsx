import React from 'react'
import type { Team } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { RxGlobe } from 'react-icons/rx'
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { cn } from '@/utilities/cn'

interface TeamCardProps {
  member: Team
  className?: string
  showFullBio?: boolean
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, className, showFullBio = false }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram className="size-5" />
      case 'twitter':
        return <FaTwitter className="size-5" />
      case 'linkedin':
        return <FaLinkedin className="size-5" />
      case 'website':
        return <RxGlobe className="size-5" />
      default:
        return null
    }
  }

  const socialLinks = [
    { platform: 'linkedin', url: member.socialMedia?.linkedin },
    { platform: 'twitter', url: member.socialMedia?.twitter },
    { platform: 'instagram', url: member.socialMedia?.instagram },
    { platform: 'website', url: member.socialMedia?.website },
  ].filter(link => link.url)

  return (
    <div className={cn('overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200', className)}>
      <div className="aspect-square overflow-hidden">
        {member.image && typeof member.image === 'object' && (
          <Media
            resource={member.image}
            className="size-full object-cover"
          />
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-medium mb-4">{member.role}</p>
        
        {showFullBio ? (
          <div className="prose prose-sm max-w-none text-gray-600">
            <RichText content={member.bio} enableGutter={false} />
          </div>
        ) : (
          <div className="text-gray-600 mb-4">
            {/* Extract first paragraph from rich text for preview */}
            {typeof member.bio === 'object' && member.bio?.root?.children?.[0] && (
              <p>{member.bio.root.children[0].children?.[0]?.text}</p>
            )}
          </div>
        )}
        
        {member.expertise && member.expertise.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Expertise:</h4>
            <div className="flex flex-wrap gap-2">
              {member.expertise.slice(0, 3).map((exp, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {exp.area}
                </span>
              ))}
              {member.expertise.length > 3 && (
                <span className="inline-block rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                  +{member.expertise.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
        
        {showFullBio && member.qualifications && member.qualifications.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Kwalificaties:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {member.qualifications.map((qual, index) => (
                <li key={index}>
                  <span className="font-medium">{qual.qualification}</span>
                  {qual.institution && <span className="text-gray-500"> - {qual.institution}</span>}
                  {qual.year && <span className="text-gray-500"> ({qual.year})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {member.featuredQuote && (
          <blockquote className="italic text-gray-700 border-l-4 border-blue-200 pl-4 my-4">
            &ldquo;{member.featuredQuote}&rdquo;
          </blockquote>
        )}
        
        {socialLinks.length > 0 && (
          <div className="flex gap-3 mt-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
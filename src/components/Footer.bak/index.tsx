'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Footer } from '@/payload-types'
import { RxGlobe } from 'react-icons/rx'
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa'

interface FooterProps {
  footer: Footer
}

export const FooterComponent: React.FC<FooterProps> = ({ footer }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // TODO: Implement newsletter signup
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
    }, 1000)
  }

  const getHref = (link: any) => {
    if (!link) return '#'
    
    if (link.type === 'custom') {
      return link.url || '#'
    }
    
    if (link.type === 'reference' && link.reference) {
      if (typeof link.reference === 'object' && link.reference.slug) {
        return `/${link.reference.slug}`
      }
    }
    
    return '#'
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram className="size-5" />
      case 'facebook':
        return <FaFacebook className="size-5" />
      case 'linkedin':
        return <FaLinkedin className="size-5" />
      case 'youtube':
        return <FaYoutube className="size-5" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-gray-50 px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-4 lg:gap-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-4">
              {footer.logo && typeof footer.logo === 'object' ? (
                <Media resource={footer.logo} className="h-8 w-auto" />
              ) : (
                <span className="text-xl font-bold">Schermblij</span>
              )}
            </Link>
            
            {footer.description && (
              <p className="text-gray-600 mb-6">{footer.description}</p>
            )}

            {/* Social Media */}
            <div className="flex gap-4">
              {footer.socialMedia?.instagram && (
                <a 
                  href={footer.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {getSocialIcon('instagram')}
                </a>
              )}
              {footer.socialMedia?.facebook && (
                <a 
                  href={footer.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {getSocialIcon('facebook')}
                </a>
              )}
              {footer.socialMedia?.linkedin && (
                <a 
                  href={footer.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {getSocialIcon('linkedin')}
                </a>
              )}
              {footer.socialMedia?.youtube && (
                <a 
                  href={footer.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {getSocialIcon('youtube')}
                </a>
              )}
            </div>
          </div>

          {/* Footer Columns */}
          {footer.footerColumns?.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links?.map((linkItem, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={getHref(linkItem.link)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {linkItem.link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          {footer.newsletterSignup?.enabled && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {footer.newsletterSignup.title}
              </h3>
              {footer.newsletterSignup.description && (
                <p className="text-gray-600 mb-4">{footer.newsletterSignup.description}</p>
              )}
              
              {isSubscribed ? (
                <div className="rounded-md bg-green-50 p-3 text-green-800">
                  <p className="font-medium">Bedankt!</p>
                  <p className="text-sm">Je bent ingeschreven voor onze nieuwsbrief.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Voer je e-mailadres in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? 'Bezig...' : 'Inschrijven'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600">
              {footer.copyrightText || '© 2024 Schermblij. Alle rechten voorbehouden.'}
            </p>
            
            {footer.legalLinks && footer.legalLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {footer.legalLinks.map((linkItem, index) => (
                  <Link
                    key={index}
                    href={getHref(linkItem.link)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {linkItem.link?.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Contact Info */}
          {footer.contactInfo && (
            <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {footer.contactInfo.email && (
                  <p>
                    <strong>E-mail:</strong>{' '}
                    <a href={`mailto:${footer.contactInfo.email}`} className="hover:text-gray-900">
                      {footer.contactInfo.email}
                    </a>
                  </p>
                )}
                {footer.contactInfo.phone && (
                  <p>
                    <strong>Telefoon:</strong>{' '}
                    <a href={`tel:${footer.contactInfo.phone}`} className="hover:text-gray-900">
                      {footer.contactInfo.phone}
                    </a>
                  </p>
                )}
                {footer.contactInfo.address && (
                  <p><strong>Adres:</strong> {footer.contactInfo.address}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
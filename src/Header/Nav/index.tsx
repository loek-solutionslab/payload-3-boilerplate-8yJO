'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon, MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const ctaButton = header?.ctaButton
  const showSearch = header?.showSearch !== false // Default to true
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map((navItem, i) => {
          const { link, description, featured } = navItem
          return (
            <CMSLink 
              key={i} 
              {...link} 
              appearance="link"
              className={`
                transition-colors hover:text-primary 
                ${featured ? 'font-semibold text-primary' : ''}
              `}
            />
          )
        })}
        
        {/* CTA Button */}
        {ctaButton?.show && ctaButton.link && (
          <CMSLink
            {...ctaButton.link}
            appearance="default"
            size="sm"
            className={`
              ml-2 
              ${ctaButton.style === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : ''}
              ${ctaButton.style === 'secondary' ? 'border border-primary text-primary hover:bg-primary hover:text-white' : ''}
              ${ctaButton.style === 'accent' ? 'bg-accent text-white hover:bg-accent/90' : ''}
            `}
          />
        )}
        
        {/* Search Icon */}
        {showSearch && (
          <Link 
            href="/search" 
            className="p-2 hover:text-primary transition-colors"
            title="Search"
          >
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5" />
          </Link>
        )}
      </nav>

      {/* Mobile Navigation Button */}
      <div className="md:hidden flex items-center gap-2">
        {showSearch && (
          <Link 
            href="/search" 
            className="p-2 hover:text-primary transition-colors"
            title="Search"
          >
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5" />
          </Link>
        )}
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:text-primary transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <XIcon className="w-6" />
          ) : (
            <MenuIcon className="w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg md:hidden z-50">
          <nav className="container py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((navItem, i) => {
                const { link, description, featured } = navItem
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    appearance="link"
                    className={`
                      block py-2 px-1 transition-colors hover:text-primary
                      ${featured ? 'font-semibold text-primary' : ''}
                    `}
                  />
                )
              })}
              
              {/* Mobile CTA Button */}
              {ctaButton?.show && ctaButton.link && (
                <div className="pt-4 border-t border-border mt-4">
                  <CMSLink
                    {...ctaButton.link}
                    appearance="default"
                    className={`
                      w-full justify-center
                      ${ctaButton.style === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : ''}
                      ${ctaButton.style === 'secondary' ? 'border border-primary text-primary hover:bg-primary hover:text-white' : ''}
                      ${ctaButton.style === 'accent' ? 'bg-accent text-white hover:bg-accent/90' : ''}
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

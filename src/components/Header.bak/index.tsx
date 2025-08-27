'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Header } from '@/payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { RxChevronDown, RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { cn } from '@/utilities/cn'

interface HeaderNavProps {
  header: Header
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ header }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const toggleDropdown = (itemLabel: string) => {
    setOpenDropdown(prev => prev === itemLabel ? null : itemLabel)
  }

  const renderNavLink = (item: any) => {
    if (item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0) {
      return (
        <div 
          key={item.label} 
          className="relative"
          onMouseEnter={() => setOpenDropdown(item.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            className="flex items-center gap-2 py-3 text-md lg:px-4 lg:py-6 lg:text-base hover:text-gray-600 transition-colors"
            onClick={() => toggleDropdown(item.label)}
          >
            <span>{item.label}</span>
            <motion.span
              animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <RxChevronDown className="size-4" />
            </motion.span>
          </button>
          
          <AnimatePresence>
            {openDropdown === item.label && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 lg:block hidden"
              >
                {item.dropdownItems.map((dropdownItem: any, index: number) => (
                  <Link
                    key={index}
                    href={getHref(dropdownItem.link)}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    {dropdownItem.link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {openDropdown === item.label && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                {item.dropdownItems.map((dropdownItem: any, index: number) => (
                  <Link
                    key={index}
                    href={getHref(dropdownItem.link)}
                    className="block py-2 pl-4 text-sm text-gray-600 hover:text-gray-900"
                  >
                    {dropdownItem.link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <Link
        key={item.label}
        href={getHref(item.link)}
        className="block py-3 text-md lg:px-4 lg:py-6 lg:text-base hover:text-gray-600 transition-colors"
      >
        {item.label}
      </Link>
    )
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

  return (
    <header className="relative z-[999] flex min-h-16 w-full items-center border-b border-gray-200 bg-white px-[5%] md:min-h-18">
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {header.logo && typeof header.logo === 'object' ? (
            <Media resource={header.logo} className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-bold">Schermblij</span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-center lg:gap-2">
          {header.navItems?.map((item, index) => (
            <div key={index}>
              {renderNavLink(item)}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          {header.ctaButton?.enabled && header.ctaButton.link && (
            <Link
              href={getHref(header.ctaButton.link)}
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              {header.ctaButton.link.label}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <RxCross1 className="size-6" />
          ) : (
            <RxHamburgerMenu className="size-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden"
            >
              <nav className="px-[5%] py-4 space-y-2">
                {header.navItems?.map((item, index) => (
                  <div key={index}>
                    {renderNavLink(item)}
                  </div>
                ))}
                
                {header.ctaButton?.enabled && header.ctaButton.link && (
                  <Link
                    href={getHref(header.ctaButton.link)}
                    className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors mt-4"
                  >
                    {header.ctaButton.link.label}
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
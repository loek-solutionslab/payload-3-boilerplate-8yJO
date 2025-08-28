'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RxChevronDown, RxChevronRight } from 'react-icons/rx'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

interface HeaderClientProps {
  header: Header
}

// Custom hook for managing navbar state
const useNavbarState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const openDropdownMenu = () => setIsDropdownOpen(true)
  const closeDropdownMenu = () => setIsDropdownOpen(false)
  const toggleDropdownMenu = () => setIsDropdownOpen((prev) => !prev)
  
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close"
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed"
  const animateDropdownMenu = isDropdownOpen ? "open" : "close"
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial"
  
  return {
    toggleMobileMenu,
    openDropdownMenu,
    closeDropdownMenu,
    toggleDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
    isMobileMenuOpen,
    isDropdownOpen,
  }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navState = useNavbarState()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Find dropdown nav item (if exists)
  const dropdownNavItem = header?.navItems?.find(item => item.type === 'dropdown')
  const regularNavItems = header?.navItems?.filter(item => item.type !== 'dropdown') || []

  return (
    <section
      className="relative z-[999] flex min-h-16 w-full items-center border-b border-border bg-background px-[5%] md:min-h-18"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        {/* Logo */}
        <Link href="/">
          {header?.logo && typeof header.logo === 'object' && header.logo.url ? (
            <Image 
              src={header.logo.url} 
              alt={header.logo.alt || 'Site Logo'}
              className="h-8 md:h-10 w-auto"
              width={120}
              height={40}
              priority
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute hidden h-screen overflow-auto border-b border-border bg-background px-[5%] pt-4 pb-24 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            {/* Regular Navigation Items */}
            {regularNavItems.map((navItem, index) => (
              <Link
                key={index}
                href={navItem.link?.url || navItem.link?.reference?.value?.slug ? `/${navItem.link.reference.value.slug}` : '#'}
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base hover:text-primary transition-colors"
              >
                {navItem.link?.label || 'Link'}
              </Link>
            ))}

            {/* Dropdown Menu */}
            {dropdownNavItem && (
              <div
                onMouseEnter={navState.openDropdownMenu}
                onMouseLeave={navState.closeDropdownMenu}
              >
                <button
                  className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base hover:text-primary transition-colors"
                  onClick={navState.toggleDropdownMenu}
                >
                  <span>{dropdownNavItem.link?.label || 'More'}</span>
                  <motion.span
                    animate={navState.animateDropdownMenuIcon}
                    variants={{
                      rotated: { rotate: 180 },
                      initial: { rotate: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RxChevronDown />
                  </motion.span>
                </button>

                {/* Dropdown Content */}
                <AnimatePresence>
                  <motion.nav
                    variants={{
                      open: {
                        opacity: 1,
                        display: "block",
                        height: "var(--height-open, auto)",
                      },
                      close: {
                        opacity: 0,
                        display: "none",
                        height: "var(--height-close, 0)",
                      },
                    }}
                    animate={navState.animateDropdownMenu}
                    initial="close"
                    exit="close"
                    transition={{ duration: 0.2 }}
                    className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background lg:absolute lg:w-screen lg:border-b lg:border-border lg:px-[5%] lg:[--height-close:auto]"
                  >
                    <div className="mx-auto flex size-full max-w-full items-center justify-between">
                      <div className="flex w-full flex-col lg:flex-row">
                        <div className={`grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 ${
                          dropdownNavItem?.dropdownSections?.length 
                            ? `md:grid-cols-${Math.min(dropdownNavItem.dropdownSections.length, 3)}` 
                            : 'md:grid-cols-1'
                        } md:gap-y-0 md:py-8 lg:pr-8`}>
                          {/* Render dropdown sections */}
                          {dropdownNavItem?.dropdownSections?.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="grid auto-cols-fr grid-cols-1 gap-y-2 md:gap-y-4">
                              <h4 className="text-sm leading-[1.3] font-semibold">
                                {section.title}
                              </h4>
                              {section.links?.map((linkItem, linkIndex) => (
                                <Link
                                  key={linkIndex}
                                  href={linkItem.link?.type === 'custom' 
                                    ? linkItem.link.url || '#'
                                    : linkItem.link?.reference?.value?.slug 
                                      ? `/${linkItem.link.reference.value.slug}`
                                      : '#'}
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 hover:bg-muted/50 rounded-md transition-colors"
                                >
                                  <div className="flex size-6 flex-col items-center justify-center">
                                    {linkItem.icon && typeof linkItem.icon === 'object' && linkItem.icon.url ? (
                                      <Image
                                        src={linkItem.icon.url}
                                        alt={linkItem.icon.alt || 'Icon'}
                                        width={24}
                                        height={24}
                                        className="shrink-0"
                                      />
                                    ) : (
                                      <div className="w-6 h-6 bg-primary/10 rounded-sm flex items-center justify-center">
                                        <div className="w-3 h-3 bg-primary/30 rounded-sm" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-start justify-center">
                                    <h5 className="font-semibold">{linkItem.link?.label || 'Link'}</h5>
                                    {linkItem.description && (
                                      <p className="hidden text-sm text-muted-foreground md:block">
                                        {linkItem.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                        
                        {/* Featured Content */}
                        {dropdownNavItem?.featuredContent?.show && (
                          <div className={`relative mb-4 flex max-w-none flex-1 p-6 md:max-w-[50rem] md:p-8 lg:mb-0 lg:max-w-xxs lg:py-8 lg:pr-0 lg:pl-8 ${
                            dropdownNavItem.featuredContent.backgroundColor === 'secondary' ? 'bg-secondary' :
                            dropdownNavItem.featuredContent.backgroundColor === 'muted' ? 'bg-muted' :
                            'bg-background'
                          }`}>
                            <div className="relative z-10 grid w-full grid-cols-1 grid-rows-[auto_max-content] gap-y-4">
                              <h4 className="text-sm leading-[1.3] font-semibold">
                                {dropdownNavItem.featuredContent.title}
                              </h4>
                              <div className="grid w-full max-w-none grid-cols-1 grid-rows-[auto_auto_auto_auto] items-start gap-y-2 md:block">
                                <Link 
                                  href={dropdownNavItem.featuredContent.link?.type === 'custom' 
                                    ? dropdownNavItem.featuredContent.link.url || '#'
                                    : dropdownNavItem.featuredContent.link?.reference?.value?.slug 
                                      ? `/${dropdownNavItem.featuredContent.link.reference.value.slug}`
                                      : '#'}
                                  className="flex flex-col py-2 group"
                                >
                                  {dropdownNavItem.featuredContent.image && typeof dropdownNavItem.featuredContent.image === 'object' && dropdownNavItem.featuredContent.image.url && (
                                    <div className="relative mb-3 w-full overflow-hidden pt-[56.25%] rounded-lg">
                                      <Image
                                        src={dropdownNavItem.featuredContent.image.url}
                                        alt={dropdownNavItem.featuredContent.image.alt || 'Featured image'}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                  <div className="mt-2 flex max-w-[18rem] flex-col justify-start md:mt-0">
                                    <h5 className="mb-1 font-semibold group-hover:text-primary transition-colors">
                                      {dropdownNavItem.featuredContent.link?.label || 'Featured Item'}
                                    </h5>
                                    {dropdownNavItem.featuredContent.description && (
                                      <p className="text-sm text-muted-foreground">
                                        {dropdownNavItem.featuredContent.description}
                                      </p>
                                    )}
                                    <div className="mt-2">
                                      <span className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                                        Learn more
                                        <RxChevronRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {header?.showSearch && (
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            )}
            {header?.ctaButton?.show && header.ctaButton.link && (
              <>
                <Button 
                  variant={header.ctaButton.style === 'secondary' ? 'outline' : 'default'}
                  size="sm"
                  asChild
                >
                  <Link href={
                    header.ctaButton.link.type === 'custom' 
                      ? header.ctaButton.link.url || '#'
                      : header.ctaButton.link.reference?.value?.slug 
                        ? `/${header.ctaButton.link.reference.value.slug}`
                        : '#'
                  }>
                    {header.ctaButton.link.label || 'Get Started'}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={navState.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-foreground"
            animate={navState.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-foreground"
            animate={navState.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.5rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-foreground"
            animate={navState.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
          animate={navState.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute top-full right-0 left-0 w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: "-100%" } }}
            animate={navState.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 left-0 block h-dvh overflow-auto border-b border-border bg-background px-[5%] pt-4 pb-8"
          >
            <div className="flex flex-col">
              {/* Mobile Navigation Items */}
              {regularNavItems.map((navItem, index) => (
                <Link
                  key={index}
                  href={navItem.link?.url || navItem.link?.reference?.value?.slug ? `/${navItem.link.reference.value.slug}` : '#'}
                  className="relative block w-auto py-3 text-md hover:text-primary transition-colors"
                >
                  {navItem.link?.label || 'Link'}
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              {header?.ctaButton?.show && header.ctaButton.link && (
                <div className="mt-6 flex flex-col gap-4">
                  <Button 
                    variant={header.ctaButton.style === 'secondary' ? 'outline' : 'default'}
                    size="sm"
                    asChild
                  >
                    <Link href={
                      header.ctaButton.link.type === 'custom' 
                        ? header.ctaButton.link.url || '#'
                        : header.ctaButton.link.reference?.value?.slug 
                          ? `/${header.ctaButton.link.reference.value.slug}`
                          : '#'
                    }>
                      {header.ctaButton.link.label || 'Get Started'}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

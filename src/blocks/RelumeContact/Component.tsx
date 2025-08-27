'use client'

import React from 'react'
import { Mail, Phone, MapPin, Calendar, MessageCircle, Clock } from 'lucide-react'
import type { RelumeContactBlock } from '@/payload-types'

interface RelumeContactProps {
  block: RelumeContactBlock
}

const ContactIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = "size-12" }) => {
  switch (icon) {
    case 'email':
      return <Mail className={className} />
    case 'phone':
      return <Phone className={className} />
    case 'location':
      return <MapPin className={className} />
    case 'calendar':
      return <Calendar className={className} />
    case 'message':
      return <MessageCircle className={className} />
    case 'clock':
      return <Clock className={className} />
    default:
      return <Mail className={className} />
  }
}

const ContactMethod: React.FC<{ method: any }> = ({ method }) => {
  const { icon, title, description, contactInfo, link } = method

  const content = (
    <>
      <div className="mb-5 lg:mb-6">
        <ContactIcon icon={icon} className="size-12 text-primary" />
      </div>
      <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
        {title}
      </h3>
      <p className="mb-5 text-muted-foreground md:mb-6">
        {description}
      </p>
      <div className="text-primary underline">
        {contactInfo}
      </div>
    </>
  )

  if (link) {
    return (
      <a href={link} className="block transition-opacity hover:opacity-80">
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}

export const RelumeContactComponent: React.FC<RelumeContactProps> = ({ block }) => {
  const { contactMethods = [], backgroundColor } = block

  const content = (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className={`grid auto-cols-fr gap-x-12 gap-y-12 md:gap-y-16 ${
          contactMethods?.length === 1 
            ? 'grid-cols-1 max-w-md' 
            : contactMethods?.length === 2 
              ? 'grid-cols-1 md:grid-cols-2' 
              : contactMethods?.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : contactMethods?.length === 4
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {contactMethods?.map((method, index) => (
            <ContactMethod key={index} method={method} />
          ))}
        </div>
      </div>
    </section>
  )

  if (backgroundColor) {
    return <div className={backgroundColor}>{content}</div>
  }

  return content
}
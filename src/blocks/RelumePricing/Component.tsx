'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import type { RelumePricingBlock } from '@/payload-types'

interface RelumePricingProps {
  block: RelumePricingBlock
}

const PricingPlan: React.FC<{
  plan: any
  period: 'monthly' | 'yearly'
}> = ({ plan, period }) => {
  const { name, monthlyPrice, yearlyPrice, yearlyDiscount, features, buttonText, buttonLink } = plan
  
  const currentPrice = period === 'monthly' ? monthlyPrice : yearlyPrice
  
  const getButtonHref = () => {
    if (!buttonLink) return '#'
    
    if (buttonLink.type === 'reference' && buttonLink.reference?.value?.slug) {
      return `/${buttonLink.reference.value.slug}`
    }
    
    if (buttonLink.type === 'custom' && buttonLink.url) {
      return buttonLink.url
    }
    
    return '#'
  }
  
  const ButtonComponent = buttonLink?.type === 'reference' ? Link : 'a'
  const buttonProps = buttonLink?.type === 'custom' 
    ? { target: '_blank', rel: 'noopener noreferrer' } 
    : {}

  return (
    <div className="flex h-full flex-col justify-between rounded-lg border bg-card px-6 py-8 shadow-sm md:p-8">
      <div>
        <div className="mb-6 text-center md:mb-8">
          <h6 className="text-md font-bold leading-[1.4] md:text-xl">
            {name}
          </h6>
          <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
            {currentPrice}
          </h1>
          {period === 'yearly' && yearlyDiscount && (
            <p className="mt-2 font-medium text-muted-foreground">
              {yearlyDiscount}
            </p>
          )}
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 py-2">
          {features?.map((feature: any, index: number) => (
            <div key={index} className="flex self-start">
              <div className="mr-4 flex-none self-start">
                <Check className="size-6 text-primary" />
              </div>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <ButtonComponent
          href={getButtonHref()}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          title={buttonText || 'Aan de slag'}
          {...buttonProps}
        >
          {buttonText || 'Aan de slag'}
        </ButtonComponent>
      </div>
    </div>
  )
}

export const RelumePricingComponent: React.FC<RelumePricingProps> = ({ block }) => {
  const { 
    tagline, 
    title, 
    description, 
    monthlyTabLabel = 'Maandelijks',
    yearlyTabLabel = 'Jaarlijks',
    plans = [],
    backgroundColor 
  } = block
  
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const content = (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-6xl">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
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
        
        {/* Period Toggle */}
        <div className="mx-auto mb-12 flex w-fit rounded-md border p-1">
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
              selectedPeriod === 'monthly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {monthlyTabLabel}
          </button>
          <button
            onClick={() => setSelectedPeriod('yearly')}
            className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
              selectedPeriod === 'yearly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {yearlyTabLabel}
          </button>
        </div>

        {/* Pricing Plans */}
        {plans && plans.length > 0 && (
          <div className={`grid gap-8 ${
            plans.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : plans.length === 2 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {plans.map((plan, index) => (
              <PricingPlan
                key={index}
                plan={plan}
                period={selectedPeriod}
              />
            ))}
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
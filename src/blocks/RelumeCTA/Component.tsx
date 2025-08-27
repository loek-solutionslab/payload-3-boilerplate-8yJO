"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React from "react";
import type { RelumeCTABlock } from "@/payload-types";

interface RelumeCTABlockProps extends RelumeCTABlock {}

export const RelumeCTABlockComponent: React.FC<RelumeCTABlockProps> = (props) => {
  const {
    variant = 'cta-02',
    title,
    description,
    image,
    buttonText = 'Inschrijven',
    buttonVariant = 'primary',
    emailPlaceholder = 'Voer je e-mail in',
    privacyText = 'Door je aan te melden ga je akkoord met onze Algemene Voorwaarden.',
    alignment = 'left',
  } = props;

  // Get image URL
  const imageUrl = typeof image === 'object' && image?.url ? image.url : null;

  // CTA 02 - Two Column with Image
  if (variant === 'cta-02') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h2>
              {description && (
                <p className="md:text-md">
                  {description}
                </p>
              )}
              <div className="mt-6 w-full max-w-sm md:mt-8">
                <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={emailPlaceholder || undefined}
                  />
                  <Button 
                    title={buttonText || undefined}
                    variant={buttonVariant as any}
                  >
                    {buttonText}
                  </Button>
                </form>
                {privacyText && (
                  <p className="text-xs">
                    {privacyText}
                  </p>
                )}
              </div>
            </div>
            <div>
              <img
                src={
                  imageUrl || 
                  'https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg'
                }
                className="w-full rounded-image object-cover"
                alt={title || 'CTA image'}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // CTA 20 - Simple Left Aligned
  if (variant === 'cta-20') {
    const alignmentClass = alignment === 'center' ? 'text-center' : '';
    
    return (
      <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className={`w-full max-w-lg ${alignmentClass}`}>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {title}
            </h2>
            {description && (
              <p className="md:text-md">
                {description}
              </p>
            )}
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={emailPlaceholder || undefined}
                />
                <Button 
                  title={buttonText || undefined}
                  variant={buttonVariant as any}
                >
                  {buttonText}
                </Button>
              </form>
              {privacyText && (
                <p className="text-xs">
                  {privacyText}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // CTA 26 - Centered
  if (variant === 'cta-26') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-lg text-center">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {title}
            </h2>
            {description && (
              <p className="md:text-md">
                {description}
              </p>
            )}
            <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
              <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={emailPlaceholder || undefined}
                />
                <Button
                  title={buttonText}
                  variant={buttonVariant as any}
                  size="sm"
                  className="items-center justify-center px-6 py-3"
                >
                  {buttonText}
                </Button>
              </form>
              {privacyText && (
                <p className="text-xs">
                  {privacyText}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to cta-02
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {title}
            </h2>
            {description && (
              <p className="md:text-md">
                {description}
              </p>
            )}
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={emailPlaceholder || undefined}
                />
                <Button 
                  title={buttonText}
                >
                  {buttonText}
                </Button>
              </form>
              {privacyText && (
                <p className="text-xs">
                  {privacyText}
                </p>
              )}
            </div>
          </div>
          <div>
            <img
              src={
                imageUrl || 
                'https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg'
              }
              className="w-full rounded-image object-cover"
              alt={title || 'CTA image'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
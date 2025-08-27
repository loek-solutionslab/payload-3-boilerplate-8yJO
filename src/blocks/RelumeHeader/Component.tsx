"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import type { RelumeHeaderBlock } from "@/payload-types";

interface RelumeHeaderProps extends RelumeHeaderBlock {}

export const RelumeHeaderBlockComponent: React.FC<RelumeHeaderProps> = (props) => {
  const {
    variant = 'header-01',
    title,
    description,
    primaryButton,
    secondaryButton,
    image,
    backgroundImage,
    imagePosition = 'right',
    features = [],
    alignment = 'left',
    overlayOpacity = 50,
  } = props;

  // Get image URLs
  const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
  const backgroundImageUrl = typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : null;

  // Header 01 - Side by Side with Image
  if (variant === 'header-01') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className={`grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center ${imagePosition === 'left' ? 'lg:grid-cols-2' : ''}`}>
            {imagePosition === 'left' && imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Header image'}
                />
              </div>
            )}
            <div>
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                {title}
              </h1>
              {description && (
                <p className="md:text-md">
                  {description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {primaryButton?.show && primaryButton?.text && (
                  <Button >
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton?.show && secondaryButton?.text && (
                  <Button  variant="secondary">
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            </div>
            {imagePosition === 'right' && imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Header image'}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Header 05 - Full Background Image
  if (variant === 'header-05') {
    return (
      <section id="relume" className="relative px-[5%]">
        <div className="relative z-10 container">
          <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
            <div className="max-w-md">
              <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
                {title}
              </h1>
              {description && (
                <p className="text-text-alternative md:text-md">
                  {description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {primaryButton?.show && primaryButton?.text && (
                  <Button >
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton?.show && secondaryButton?.text && (
                  <Button  variant="secondary-alt">
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImageUrl || 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg'}
            className="size-full object-cover"
            alt={title || 'Background image'}
          />
          <div className={`absolute inset-0 bg-black/${overlayOpacity}`} />
        </div>
      </section>
    );
  }

  // Header 46 - Centered Simple
  if (variant === 'header-46') {
    const alignmentClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : '';
    
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className={`w-full max-w-lg ${alignmentClass}`}>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              {title}
            </h1>
            {description && (
              <p className="md:text-md">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Header 47 - Centered with Background
  if (variant === 'header-47') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="flex flex-col gap-5 md:flex-row md:gap-12 lg:gap-20">
            <div className="w-full max-w-lg">
              <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
                {title}
              </h1>
            </div>
            <div className="w-full max-w-lg">
              {description && (
                <p className="md:text-md">
                  {description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {primaryButton?.show && primaryButton?.text && (
                  <Button >
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton?.show && secondaryButton?.text && (
                  <Button  variant="secondary">
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Header 50 - Simple Centered
  if (variant === 'header-50') {
    const alignmentClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : '';
    
    return (
      <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
        <div className="relative z-10 container">
          <div className={`w-full max-w-lg ${alignmentClass}`}>
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              {title}
            </h1>
            {description && (
              <p className="text-text-alternative md:text-md">
                {description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {primaryButton?.show && primaryButton?.text && (
                <Button >
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton?.show && secondaryButton?.text && (
                <Button  variant="secondary-alt">
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
        </div>
        {backgroundImageUrl && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={backgroundImageUrl}
                className="size-full object-cover"
                alt={title || 'Background image'}
              />
              <div className={`absolute inset-0 bg-black/${overlayOpacity}`} />
            </div>
          </>
        )}
      </section>
    );
  }

  // Header 54 - Two Column
  if (variant === 'header-54') {
    return (
      <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
        <div className="relative z-10 container">
          <div className="w-full max-w-lg">
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              {title}
            </h1>
            {description && (
              <p className="text-text-alternative md:text-md">
                {description}
              </p>
            )}
          </div>
        </div>
        {backgroundImageUrl && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={backgroundImageUrl}
                className="size-full object-cover"
                alt={title || 'Background image'}
              />
              <div className={`absolute inset-0 bg-black/${overlayOpacity}`} />
            </div>
          </>
        )}
      </section>
    );
  }

  // Header 62 - Feature List
  if (variant === 'header-62') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-lg text-center">
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            {title}
          </h1>
          {description && (
            <p className="md:text-md">
              {description}
            </p>
          )}
          {features && features.length > 0 && (
            <div className="mt-6 space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {primaryButton?.show && primaryButton?.text && (
              <Button >
                {primaryButton.text}
              </Button>
            )}
            {secondaryButton?.show && secondaryButton?.text && (
              <Button  variant="secondary">
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback to header-01 if variant not found
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              {title}
            </h1>
            {description && (
              <p className="md:text-md">
                {description}
              </p>
            )}
          </div>
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                className="w-full rounded-image object-cover"
                alt={title || 'Header image'}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
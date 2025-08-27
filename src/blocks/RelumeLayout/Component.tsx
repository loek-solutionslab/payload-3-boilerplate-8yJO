"use client";

import { Button } from "@relume_io/relume-ui";
import Image from 'next/image';
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import type { RelumeLayoutBlock } from "@/payload-types";

interface RelumeLayoutBlockProps extends RelumeLayoutBlock {}

export const RelumeLayoutBlockComponent: React.FC<RelumeLayoutBlockProps> = (props) => {
  const {
    variant = 'layout-03',
    tagline,
    title,
    description,
    primaryButton,
    secondaryButton,
    mainImage,
    imagePosition = 'right',
    features = [],
    columns = [],
    textAlignment = 'left',
  } = props;

  // Get image URL
  const imageUrl = typeof mainImage === 'object' && mainImage?.url ? mainImage.url : null;
  
  // Get text alignment classes
  const alignmentClass = textAlignment === 'center' ? 'text-center' : textAlignment === 'right' ? 'text-right' : '';

  // Layout 01 - Two Column with Tagline & Buttons
  if (variant === 'layout-01') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            {imagePosition === 'left' && imageUrl && (
              <div>
                <Image
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Layout image'}
                  width={600}
                  height={400}
                />
              </div>
            )}
            <div>
              {tagline && (
                <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              )}
              <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h1>
              {description && (
                <p className="md:text-md">
                  {description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {primaryButton?.show && primaryButton?.text && (
                  <Button 
                    title={primaryButton.text} 
                    variant={primaryButton.variant as any}
                  >
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton?.show && secondaryButton?.text && (
                  <Button
                    title={secondaryButton.text}
                    variant={secondaryButton.variant as any}
                    size={secondaryButton.variant === 'link' ? 'link' : undefined}
                    iconRight={secondaryButton.variant === 'link' ? <RxChevronRight /> : undefined}
                  >
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            </div>
            {imagePosition === 'right' && imageUrl && (
              <div>
                <Image
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Layout image'}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Layout 03 - Simple Two Column
  if (variant === 'layout-03') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            {imagePosition === 'left' && imageUrl && (
              <div>
                <Image
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Layout image'}
                  width={600}
                  height={400}
                />
              </div>
            )}
            <div>
              <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
                {title}
              </h1>
              {description && (
                <p className="md:text-md">
                  {description}
                </p>
              )}
            </div>
            {imagePosition === 'right' && imageUrl && (
              <div>
                <Image
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Layout image'}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Layout 10 - Two Column with Feature Grid
  if (variant === 'layout-10') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div>
              {tagline && (
                <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              )}
              <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h1>
              {description && (
                <p className="mb-6 md:mb-8 md:text-md">
                  {description}
                </p>
              )}
              {features && features.length > 0 && (
                <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index}>
                      <div className="mb-3 md:mb-4">
                        <Image
                          src={
                            typeof feature.icon === 'object' && feature.icon?.url 
                              ? feature.icon.url 
                              : 'https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg'
                          }
                          className="size-12"
                          alt={feature.title || `Feature ${index + 1}`}
                          width={48}
                          height={48}
                        />
                      </div>
                      <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                        {feature.title}
                      </h6>
                      {feature.description && (
                        <p>{feature.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {primaryButton?.show && primaryButton?.text && (
                  <Button 
                    title={primaryButton.text} 
                    variant={primaryButton.variant as any}
                  >
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton?.show && secondaryButton?.text && (
                  <Button
                    title={secondaryButton.text}
                    variant={secondaryButton.variant as any}
                    size={secondaryButton.variant === 'link' ? 'link' : undefined}
                    iconRight={secondaryButton.variant === 'link' ? <RxChevronRight /> : undefined}
                  >
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            </div>
            {imageUrl && (
              <div>
                <Image
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Layout image'}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Layout 192 - Two Column with Image Left
  if (variant === 'layout-192') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div className="order-2 md:order-1">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  className="w-full rounded-image object-cover"
                  alt={title || 'Layout image'}
                  width={600}
                  height={400}
                />
              )}
            </div>
            <div className="order-1 lg:order-2">
              {tagline && (
                <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              )}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h2>
              {description && (
                <p className="md:text-md">
                  {description}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {primaryButton?.show && primaryButton?.text && (
                  <Button 
                    title={primaryButton.text} 
                    variant={primaryButton.variant as any}
                  >
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton?.show && secondaryButton?.text && (
                  <Button
                    title={secondaryButton.text}
                    variant={secondaryButton.variant as any}
                    size={secondaryButton.variant === 'link' ? 'link' : undefined}
                    iconRight={secondaryButton.variant === 'link' ? <RxChevronRight /> : undefined}
                  >
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

  // Layout 238 - Three Column with Icons
  if (variant === 'layout-238') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className={`rb-12 mb-12 ${alignmentClass} md:mb-18 lg:mb-20`}>
            <div className="mx-auto w-full max-w-lg">
              <h2 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
                {title}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {columns && columns.length > 0 && columns.slice(0, 3).map((column, index) => (
              <div key={index} className={`flex flex-col items-center ${alignmentClass}`}>
                <div className="mb-5 md:mb-6">
                  <Image
                    src={
                      typeof column.icon === 'object' && column.icon?.url 
                        ? column.icon.url 
                        : 'https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg'
                    }
                    alt={column.title || `Column ${index + 1}`}
                    className="size-12"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
                  {column.title}
                </h3>
                {column.description && (
                  <p>{column.description}</p>
                )}
                {column.buttonText && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                    <Button 
                      iconRight={<RxChevronRight />} 
                      variant="link" 
                      size="link"
                    >
                      {column.buttonText}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Layout 239 - Three Column with Images & Center Header
  if (variant === 'layout-239') {
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
              <div className="w-full max-w-lg">
                {tagline && (
                  <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
                )}
                <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                  {title}
                </h2>
                {description && (
                  <p className="md:text-md">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
              {columns && columns.length > 0 && columns.slice(0, 3).map((column, index) => (
                <div key={index} className="flex w-full flex-col items-center text-center">
                  <div className="rb-6 mb-6 md:mb-8">
                    <Image
                      src={
                        typeof column.icon === 'object' && column.icon?.url 
                          ? column.icon.url 
                          : 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg'
                      }
                      alt={column.title || `Column ${index + 1}`}
                      className="rounded-image"
                      width={400}
                      height={300}
                    />
                  </div>
                  <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                    {column.title}
                  </h3>
                  {column.description && (
                    <p>{column.description}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {primaryButton?.show && primaryButton?.text && (
                <Button 
                  variant={primaryButton.variant as any}
                >
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton?.show && secondaryButton?.text && (
                <Button 
                  iconRight={<RxChevronRight />} 
                  variant="link" 
                  size="link"
                >
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to layout-03
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
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
              <Image
                src={imageUrl}
                className="w-full rounded-image object-cover"
                alt={title || 'Layout image'}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
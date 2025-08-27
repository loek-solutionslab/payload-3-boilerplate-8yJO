"use client";

import React from "react";

export function Gallery8() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Afbeeldingen Galerij
          </h2>
          <p className="md:text-md">
            Ontdek de visuele verhalen van onze aanpak.
          </p>
        </div>
        <div className="gap-x-8 md:columns-2">
          <a href="#" className="mb-8 inline-block w-full">
            <div className="relative inline-block w-full pt-[100%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
          <a href="#" className="mb-8 inline-block w-full">
            <div className="relative inline-block w-full pt-[66.66%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 2"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
          <a href="#" className="mb-8 inline-block w-full">
            <div className="relative inline-block w-full pt-[66.66%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 3"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
          <a href="#" className="mb-8 inline-block w-full">
            <div className="relative inline-block w-full pt-[100%]">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 4"
                className="absolute inset-0 size-full rounded-image object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

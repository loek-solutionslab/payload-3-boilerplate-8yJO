"use client";

import { Card } from "@relume_io/relume-ui";
import React from "react";

export function Blog3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Ontdek onze aanbevolen blogs
            </h1>
            <p className="md:text-md">Blogs voor een gezonde schermbalans</p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="mb-12 ml-[-5vw] flex no-scrollbar w-screen items-center justify-start overflow-scroll pl-[5vw] md:mb-16 md:ml-0 md:w-full md:justify-center md:overflow-hidden md:pl-0">
            <a
              href="#"
              className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary bg-background-primary border px-4 py-2 border-border-primary"
            >
              Bekijk alles
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Ouderschap tips
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Schermgebruik advies
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Gezinsactiviteiten
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Online veiligheid
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            <Card>
              <a href="#" className="w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image 1"
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="px-5 py-6 md:p-6">
                <a href="#" className="mb-2 flex text-sm font-semibold">
                  Categorie
                </a>
                <a href="#" className="mb-2 block max-w-full">
                  <h5 className="text-xl font-bold md:text-2xl">
                    Hoe schermtijd een positieve ervaring kan zijn
                  </h5>
                </a>
                <p>
                  Ontdek hoe je schermtijd kunt integreren in het gezinsleven.
                </p>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 shrink-0">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder avatar 1"
                      className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold">Lisanne Jansen</h6>
                    <div className="flex items-center">
                      <p className="text-sm">11 Jan 2022</p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">5 min lezen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <a href="#" className="w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image 1"
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="px-5 py-6 md:p-6">
                <a href="#" className="mb-2 flex text-sm font-semibold">
                  Categorie
                </a>
                <a href="#" className="mb-2 block max-w-full">
                  <h5 className="text-xl font-bold md:text-2xl">
                    Tips voor het veilig gebruik van media
                  </h5>
                </a>
                <p>
                  Leer hoe je kinderen veilig kunnen omgaan met digitale media.
                </p>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 shrink-0">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder avatar 1"
                      className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold">Mark de Vries</h6>
                    <div className="flex items-center">
                      <p className="text-sm">15 Feb 2022</p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">7 min lezen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <a href="#" className="w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image 1"
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="px-5 py-6 md:p-6">
                <a href="#" className="mb-2 flex text-sm font-semibold">
                  Categorie
                </a>
                <a href="#" className="mb-2 block max-w-full">
                  <h5 className="text-xl font-bold md:text-2xl">
                    Creatieve offline activiteiten voor gezinnen
                  </h5>
                </a>
                <p>
                  Ontdek leuke manieren om offline tijd door te brengen met je
                  gezin.
                </p>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 shrink-0">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder avatar 1"
                      className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold">Sophie Meijer</h6>
                    <div className="flex items-center">
                      <p className="text-sm">20 Mrt 2022</p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">6 min lezen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <a href="#" className="w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image 1"
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="px-5 py-6 md:p-6">
                <a href="#" className="mb-2 flex text-sm font-semibold">
                  Categorie
                </a>
                <a href="#" className="mb-2 block max-w-full">
                  <h5 className="text-xl font-bold md:text-2xl">
                    Balans tussen schermtijd en spel
                  </h5>
                </a>
                <p>Leer hoe je een gezonde balans kunt vinden.</p>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 shrink-0">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder avatar 1"
                      className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold">Tom Bakker</h6>
                    <div className="flex items-center">
                      <p className="text-sm">05 Apr 2022</p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">4 min lezen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <a href="#" className="w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image 1"
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="px-5 py-6 md:p-6">
                <a href="#" className="mb-2 flex text-sm font-semibold">
                  Categorie
                </a>
                <a href="#" className="mb-2 block max-w-full">
                  <h5 className="text-xl font-bold md:text-2xl">
                    De voordelen van digitale media
                  </h5>
                </a>
                <p>Ontdek de positieve impact van technologie op kinderen.</p>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 shrink-0">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder avatar 1"
                      className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold">Eva van Dijk</h6>
                    <div className="flex items-center">
                      <p className="text-sm">12 Mei 2022</p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">3 min lezen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <a href="#" className="w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image 1"
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="px-5 py-6 md:p-6">
                <a href="#" className="mb-2 flex text-sm font-semibold">
                  Categorie
                </a>
                <a href="#" className="mb-2 block max-w-full">
                  <h5 className="text-xl font-bold md:text-2xl">
                    Effectieve communicatie met kinderen
                  </h5>
                </a>
                <p>Leer hoe je open gesprekken met je kinderen kunt voeren.</p>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 shrink-0">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder avatar 1"
                      className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold">Jasper Klein</h6>
                    <div className="flex items-center">
                      <p className="text-sm">30 Jun 2022</p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">8 min lezen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

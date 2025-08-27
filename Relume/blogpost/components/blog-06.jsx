"use client";

import { Badge, Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Ontdek Onze Laatste Blogs
            </h1>
            <p className="md:text-md">
              Verken de wereld van schermblij opvoeden
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="rb-12 mb-12 grid grid-cols-1 items-center gap-6 md:mb-16 md:grid-cols-2 md:gap-12">
            <a href="#" className="w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder featured image"
                className="aspect-[3/2] size-full rounded-image object-cover"
              />
            </a>
            <div className="flex h-full flex-col items-start justify-center">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Ouderschap</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2" href="#">
                <h3 className="mb-2 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Tips voor een gezonde schermtijd
                </h3>
              </a>
              <p>
                Leer hoe je schermtijd kunt balanceren met offline activiteiten.
              </p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
          </div>
          <div className="mb-12 ml-[-5vw] flex no-scrollbar w-screen items-center justify-start overflow-scroll py-1 pl-[5vw] md:mb-16 md:ml-0 md:w-full md:overflow-hidden md:pl-0">
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
              Ouderschapstips
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Schermtijdbeheer
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
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Ouderschap</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  De voordelen van schermblij opvoeden
                </h2>
              </a>
              <p>
                Ontdek hoe digitale media kan bijdragen aan gezinsconnecties.
              </p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Educatie</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Strategieën voor online veiligheid
                </h2>
              </a>
              <p>Leer hoe je kinderen veilig online kunt laten zijn.</p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Activiteiten</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Balans tussen scherm en spel
                </h2>
              </a>
              <p>
                Tips voor het combineren van schermtijd met actieve spelletjes.
              </p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Gezinsleven</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Versterk gezinsconnecties met technologie
                </h2>
              </a>
              <p>Ontdek hoe technologie kan helpen bij gezinsbinding.</p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Tips</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  Effectieve communicatie met kinderen
                </h2>
              </a>
              <p>Leer hoe je open gesprekken kunt voeren over schermgebruik.</p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
            <div className="flex size-full flex-col items-start justify-start text-start">
              <a href="#" className="mb-6 w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <Badge className="mr-4">Educatie</Badge>
                <p className="inline text-sm font-semibold">5 min lezen</p>
              </div>
              <a className="mb-2 flex justify-start text-start" href="#">
                <h2 className="text-xl font-bold md:text-2xl">
                  De rol van technologie in opvoeding
                </h2>
              </a>
              <p>Ontdek hoe technologie een positieve impact kan hebben.</p>
              <Button
                title="Lees meer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                Lees meer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout10() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Mediawijs</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Opleiding voor mediawijze pedagogisch medewerkers
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Het opleiden van pedagogisch medewerkers is cruciaal voor een
              mediawijze kinderopvang. Zij spelen een sleutelrol in het
              begeleiden van kinderen naar verantwoord mediagebruik.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Kennisdeling
                </h6>
                <p>
                  Trainingen helpen medewerkers om mediawijsheid effectief te
                  integreren in hun dagelijkse werk.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo 1"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Praktische tools
                </h6>
                <p>
                  Medewerkers krijgen toegang tot hulpmiddelen voor het
                  ondersteunen van kinderen in hun mediagebruik.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Leer" variant="secondary">
                Leer
              </Button>
              <Button
                title="Ontdek"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Ontdek
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

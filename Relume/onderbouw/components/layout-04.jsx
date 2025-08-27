"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Balans</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              De voordelen van een gezonde balans
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Een gezonde balans tussen online en offline activiteiten bevordert
              de ontwikkeling van kinderen. Het helpt hen om sociale
              vaardigheden te ontwikkelen en creatief te zijn.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Fysieke Activiteit
                </h6>
                <p>
                  Stimuleert de motorische ontwikkeling en houdt kinderen actief
                  en gezond.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Sociale Vaardigheden
                </h6>
                <p>
                  Versterkt interactie met leeftijdsgenoten en bevordert
                  teamwork en communicatie.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Ontdek" variant="secondary">
                Ontdek
              </Button>
              <Button
                title="Leer"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Leer
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

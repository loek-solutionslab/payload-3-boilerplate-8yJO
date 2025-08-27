"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Gezondheid</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Schermtijd voor Kleuters: Wat je Moet Weten
            </h1>
            <p className="md:text-md">
              Volgens de WHO-richtlijnen is één uur schermtijd per dag gezond
              voor kleuters tussen de 3 en 5 jaar. Dit helpt hen om op een
              verantwoorde manier met technologie om te gaan en tegelijkertijd
              te genieten van leerzame ervaringen.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Meer" variant="secondary">
                Meer
              </Button>
              <Button
                title="Aanmelden"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Aanmelden
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

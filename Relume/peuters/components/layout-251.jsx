"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout251() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Balans</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              De 6 W's van Gezond Schermgebruik
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              Het begrijpen van de 6 W's helpt ouders om de schermtijd van hun
              peuters effectief te beheren. Deze richtlijnen zorgen ervoor dat
              schermgebruik niet alleen veilig is, maar ook educatief en leuk.
              Door bewust om te gaan met schermtijd, kunnen ouders de
              ontwikkeling van hun kinderen ondersteunen.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Wat is het doel van de schermtijd?
            </h3>
            <p>
              Het doel van schermtijd moet altijd educatief of verbindend zijn.
            </p>
          </div>
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Waarop wordt er gekeken?
            </h3>
            <p>
              Kies voor kwalitatieve content die aansluit bij de ontwikkeling.
            </p>
          </div>
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="rounded-image"
              />
            </div>
            <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
              Waarom is schermtijd belangrijk voor peuters?
            </h3>
            <p>Schermtijd kan de ontwikkeling van vaardigheden bevorderen.</p>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
          <Button variant="secondary">Leer Meer</Button>
          <Button iconRight={<RxChevronRight />} variant="link" size="link">
            Aanmelden
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Schermtijd weer helemaal in balans
            </h1>
            <p className="md:text-md">
              Bij Schermblij helpen we ouders om een gezonde balans te creëren
              tussen online en offline activiteiten. Ontdek hoe digitale media
              een waardevolle aanvulling kan zijn op het leven van uw kinderen.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Leer">Leer</Button>
              <Button title="Aanmelden" variant="secondary">
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

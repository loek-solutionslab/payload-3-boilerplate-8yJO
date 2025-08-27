"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React from "react";

export function Cta26() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Schrijf je in voor updates
          </h2>
          <p className="md:text-md">
            Ontvang exclusieve content en blijf op de hoogte van onze nieuwste
            artikelen en cursussen.
          </p>
          <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
            <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
              <Input id="email" type="email" placeholder="Voer je e-mail in" />
              <Button
                title="Aanmelden"
                variant="primary"
                size="sm"
                className="items-center justify-center px-6 py-3"
              >
                Aanmelden
              </Button>
            </form>
            <p className="text-xs">
              Door je aan te melden ga je akkoord met onze Algemene Voorwaarden.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

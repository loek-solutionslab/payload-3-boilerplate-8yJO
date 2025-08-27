"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React from "react";

export function Cta20() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="w-full max-w-lg">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Schrijf je in voor de cursus
          </h2>
          <p className="md:text-md">
            Meld je vandaag nog aan en ontdek de voordelen van een gebalanceerde
            schermtijd voor je kinderen.
          </p>
          <div className="mt-6 w-full max-w-sm md:mt-8">
            <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
              <Input id="email" type="email" placeholder="Vul je e-mail in" />
              <Button title="Aanmelden">Aanmelden</Button>
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

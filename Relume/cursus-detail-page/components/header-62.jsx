"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header62() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Ontdek</p>
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          Cursus voor Ouders
        </h1>
        <p className="md:text-md">
          Leer hoe je een gezonde balans tussen schermtijd en offline
          activiteiten kunt creëren.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Aanmelden">Aanmelden</Button>
          <Button title="Meer Informatie" variant="secondary">
            Meer Informatie
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout216() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 font-semibold md:mb-4">Ontwikkeling</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              De impact van schermtijd op baby's ontwikkeling
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Schermtijd kan leiden tot gemiste ontwikkelingsmomenten voor
              baby's. Het is essentieel dat zij actief betrokken zijn bij hun
              omgeving voor een gezonde groei.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  50%
                </h3>
                <p>Actieve betrokkenheid is cruciaal voor ontwikkeling.</p>
              </div>
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  50%
                </h3>
                <p>Echte interactie bevordert leerprocessen bij baby's.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Meer" variant="secondary">
                Meer
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
        </div>
      </div>
    </section>
  );
}

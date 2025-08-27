"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout201() {
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
            <p className="mb-3 font-semibold md:mb-4">Kleuters</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Schermgebruik bij kleuters: een gezonde aanpak
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Kleuters maken veel gebruik van schermen voor video's, games en
              leer-apps. Het is belangrijk om dit op een gezonde manier te
              begeleiden.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Interactief leren
                </h6>
                <p>
                  Begeleide schermtijd stimuleert de ontwikkeling en versterkt
                  de band tussen ouder en kind.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo"
                  />
                </div>
                <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                  Gezonde balans
                </h6>
                <p>
                  Zorg voor duidelijke regels en vaste momenten voor
                  schermgebruik en andere activiteiten.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Leer Meer" variant="secondary">
                Leer Meer
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
        </div>
      </div>
    </section>
  );
}

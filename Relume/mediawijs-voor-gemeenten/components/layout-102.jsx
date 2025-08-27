"use client";

import React from "react";

export function Layout102() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <h3 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              Versterk de mediawijsheid van ouders met ons unieke programma
            </h3>
          </div>
          <div>
            <p className="mb-6 md:mb-8 md:text-md">
              Ons programma biedt ouders de kennis en tools die ze nodig hebben
              om hun kinderen veilig en verantwoord met media om te laten gaan.
              Samen bouwen we aan een mediawijze toekomst voor onze kinderen.
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
                  Leer ouders over digitale media en hoe ze deze effectief
                  kunnen gebruiken.
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
                  Praktische Tools
                </h6>
                <p>
                  Ontvang handige tips en strategieën om mediawijsheid te
                  bevorderen in gezinnen.
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
          className="w-full rounded-image object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}

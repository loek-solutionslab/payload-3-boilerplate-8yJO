"use client";

import React from "react";

export function Layout209() {
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
            <h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              De impact van overmatige schermtijd op de ontwikkeling van baby's
            </h3>
            <p className="mb-5 md:mb-6 md:text-md">
              Overmatige schermtijd kan ernstige gevolgen hebben voor de
              ontwikkeling van uw baby. Het is cruciaal om een balans te vinden
              tussen schermgebruik en actieve, ontwikkelingsgerichte
              activiteiten.
            </p>
            <div className="grid grid-cols-1 gap-4 py-2">
              <div className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo"
                    className="size-6"
                  />
                </div>
                <p>Vertraagde taalontwikkeling door te veel schermtijd.</p>
              </div>
              <div className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo"
                    className="size-6"
                  />
                </div>
                <p>
                  Motorische vaardigheden lijden onder langdurig schermgebruik.
                </p>
              </div>
              <div className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo"
                    className="size-6"
                  />
                </div>
                <p>
                  Sociale vaardigheden ontwikkelen zich beter zonder schermen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

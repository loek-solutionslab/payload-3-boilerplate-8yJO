"use client";

import {
  Button,
  Card,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React from "react";
import { BiCheck } from "react-icons/bi";

export function Pricing14() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
          <p className="mb-3 font-semibold md:mb-4">Prijzen</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Prijsplan
          </h2>
          <p className="md:text-md">
            Ontdek onze flexibele cursusopties voor ouders.
          </p>
        </div>
        <Tabs defaultValue="monthly">
          <TabsList className="mx-auto mb-12 w-fit">
            <TabsTrigger value="monthly">Maandelijks</TabsTrigger>
            <TabsTrigger value="yearly">Jaarlijks</TabsTrigger>
          </TabsList>
          <TabsContent
            value="monthly"
            className="grid grid-cols-1 gap-8 data-[state=active]:animate-tabs md:grid-cols-2"
          >
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Basisplan
                  </h6>
                  <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $19/mo
                  </h1>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Toegang tot alle cursussen</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Ondersteuning van experts</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Flexibele leeropties</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Aan de slag" className="w-full">
                  Aan de slag
                </Button>
              </div>
            </Card>
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Zakelijk plan
                  </h6>
                  <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $29/mo
                  </h1>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Toegang tot exclusieve content</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Persoonlijke coaching sessies</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Groepsworkshops inbegrepen</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Netwerk met andere ouders</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Korting op vervolg cursussen</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Aan de slag" className="w-full">
                  Aan de slag
                </Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent
            value="yearly"
            className="grid grid-cols-1 gap-8 data-[state=active]:animate-tabs md:grid-cols-2"
          >
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Basisplan
                  </h6>
                  <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $180/yr
                  </h1>
                  <p className="mt-2 font-medium">
                    Bespaar 20% met het jaarplan
                  </p>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Toegang tot alle cursussen</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Ondersteuning van experts</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Flexibele leeropties</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Aan de slag" className="w-full">
                  Aan de slag
                </Button>
              </div>
            </Card>
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Zakelijk plan
                  </h6>
                  <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $280/yr
                  </h1>
                  <p className="mt-2 font-medium">
                    Bespaar 20% met het jaarplan
                  </p>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Toegang tot exclusieve content</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Persoonlijke coaching sessies</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Groepsworkshops inbegrepen</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Netwerk met andere ouders</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Korting op vervolg cursussen</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Aan de slag" className="w-full">
                  Aan de slag
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

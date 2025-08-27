"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
} from "@relume_io/relume-ui";
import React from "react";
import { RxPlus } from "react-icons/rx";

export function Faq5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Veelgestelde vragen
          </h2>
          <p className="md:text-md">
            Hier vind je antwoorden op veelgestelde vragen over schermtijd voor
            kinderen in de onderbouw.
          </p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <Card>
            <AccordionItem value="item-0" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Wat is schermtijd?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Schermtijd verwijst naar de tijd die kinderen doorbrengen met
                digitale apparaten zoals tablets, smartphones en computers. Het
                is belangrijk om deze tijd in balans te houden met offline
                activiteiten. Een gezonde schermtijd kan educatief en
                ontspannend zijn.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-1" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Hoeveel schermtijd is gezond?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                De aanbevolen schermtijd voor kinderen varieert afhankelijk van
                hun leeftijd. Voor kinderen in de onderbouw is 1 tot 2 uur per
                dag een goede richtlijn. Het is cruciaal om ook voldoende tijd
                voor fysieke activiteiten en sociale interactie te waarborgen.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-2" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Hoe schermtijd beheren?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Stel duidelijke regels op voor schermgebruik en bespreek deze
                met je kinderen. Gebruik timers om de tijd te beheren en zorg
                voor afwisseling met andere activiteiten. Betrek je kinderen bij
                het maken van deze afspraken voor meer betrokkenheid.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-3" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Wat zijn goede apps?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Er zijn tal van educatieve apps die kinderen helpen leren
                terwijl ze spelen. Zoek naar apps die interactief zijn en
                aansluiten bij de interesses van je kind. Voorbeelden zijn taal-
                en rekenspellen die ook sociale vaardigheden bevorderen.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-4" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                Hoe schermtijd evalueren?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Evalueer regelmatig het schermgebruik van je kinderen en
                bespreek hun ervaringen. Vraag hen wat ze leuk vonden en wat
                niet. Dit helpt om een beter begrip te krijgen van hun behoeften
                en om eventuele aanpassingen te maken.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Heb je nog vragen?
          </h4>
          <p className="md:text-md">
            Neem contact met ons op voor meer informatie.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

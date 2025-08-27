export const services = [
  {
    title: 'Ouderworkshop Gezonde Schermtijd',
    serviceType: 'parents' as const,
    description: 'Een interactieve workshop voor ouders over het creëren van gezonde schermgewoonten thuis.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'In deze workshop leren ouders praktische strategieën om gezonde schermgewoonten te ontwikkelen. We bespreken leeftijdsspecifieke richtlijnen, kwaliteit van content en het stellen van duidelijke grenzen.'
              }
            ]
          }
        ]
      }
    },
    duration: '2 uur',
    price: 35,
    features: [
      { feature: 'Praktische tips' },
      { feature: 'Handouts' },
      { feature: 'Q&A sessie' },
      { feature: 'Netwerkmogelijkheden' }
    ],
    active: true,
  },
  {
    title: 'Professionele Training voor Kinderopvang',
    serviceType: 'daycare' as const,
    description: 'Maatwerk training voor kinderdagverblijven en buitenschoolse opvang over schermbeleid.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Een op maat gemaakte training voor kinderopvangorganisaties. We helpen bij het ontwikkelen van een consistent schermbeleid dat aansluit bij de pedagogische visie van uw organisatie.'
              }
            ]
          }
        ]
      }
    },
    duration: 'Halve dag',
    price: 450,
    features: [
      { feature: 'Maatwerk programma' },
      { feature: 'Teamtraining' },
      { feature: 'Beleidsadvies' },
      { feature: 'Follow-up sessie' }
    ],
    active: true,
  },
  {
    title: 'Schoolworkshop Digitale Geletterdheid',
    serviceType: 'school' as const,
    description: 'Lessen voor basisscholen over veilig en bewust internetgebruik voor kinderen.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Interactieve lessen voor kinderen over internetveiligheid, privacy en kritisch denken over online content. Aangepast aan verschillende leeftijdsgroepen binnen de basisschool.'
              }
            ]
          }
        ]
      }
    },
    duration: 'Per klas 1 uur',
    price: 125,
    features: [
      { feature: 'Leeftijdsspecifiek' },
      { feature: 'Interactieve lessen' },
      { feature: 'Docentenmateriaal' },
      { feature: 'Ouderinformatie' }
    ],
    active: true,
  },
  {
    title: 'Gemeente Advies & Beleid',
    serviceType: 'municipality' as const,
    description: 'Ondersteuning voor gemeenten bij het ontwikkelen van lokaal mediabeleid voor gezinnen.',
    fullDescription: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Gemeenten kunnen rekenen op onze expertise voor het ontwikkelen van breed gedragen mediabeleid. Van onderzoek naar lokale behoeften tot implementatie van concrete acties.'
              }
            ]
          }
        ]
      }
    },
    duration: 'Traject op maat',
    price: 0, // Op aanvraag
    features: [
      { feature: 'Behoefteonderzoek' },
      { feature: 'Beleidsadvies' },
      { feature: 'Implementatieplan' },
      { feature: 'Evaluatie' }
    ],
    active: true,
  }
]
export const courses = [
  {
    title: 'Schermtijd Basiscursus voor Ouders',
    description: 'Leer hoe je een gezonde balans creëert tussen schermtijd en offline activiteiten voor jouw kinderen.',
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
                text: 'Deze basiscursus helpt ouders om bewuste keuzes te maken over schermtijd. Je leert praktische strategieën om gezonde gewoonten te ontwikkelen en begrijpt hoe verschillende leeftijden verschillende benaderingen vereisen.'
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: 'Wat leer je:'
              }
            ]
          },
          {
            type: 'list',
            listType: 'bullet',
            start: 1,
            tag: 'ul',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Leeftijdsspecifieke richtlijnen voor schermtijd'
                  }
                ]
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Kwaliteit versus kwantiteit van content'
                  }
                ]
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Praktische tips voor het stellen van grenzen'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    price: 89,
    duration: '4 sessies van 1,5 uur',
    targetAudience: ['parents'],
    features: [
      { feature: 'Online lessen' },
      { feature: 'Werkboek' },
      { feature: '3 maanden toegang' },
      { feature: 'Community support' }
    ],
    slug: 'basiscursus-schermtijd',
    _status: 'published' as const,
  },
  {
    title: 'Schermvrije Tijd Workshop',
    description: 'Ontdek creatieve alternatieven voor schermactiviteiten en leer je kinderen te enthousiasmeren voor offline spel.',
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
                text: 'In deze interactieve workshop ontdek je honderden ideeën voor schermvrije activiteiten. Perfect voor ouders die hun kinderen willen inspireren tot meer creativiteit en beweging.'
              }
            ]
          }
        ]
      }
    },
    price: 45,
    duration: '3 uur workshop',
    targetAudience: ['parents', 'schools'],
    features: [
      { feature: 'Live workshop' },
      { feature: 'Activiteitenboek' },
      { feature: 'Materiaallijst' },
      { feature: 'Opname beschikbaar' }
    ],
    slug: 'schermvrije-tijd-workshop',
    _status: 'published' as const,
  },
  {
    title: 'Digitale Geletterdheid voor Kinderen',
    description: 'Leer je kinderen veilig en bewust omgaan met technologie in de moderne wereld.',
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
                text: 'Een uitgebreide cursus over hoe je kinderen voorbereidt op de digitale wereld. Van internetveiligheid tot kritisch denken over online content.'
              }
            ]
          }
        ]
      }
    },
    price: 125,
    duration: '6 sessies van 2 uur',
    targetAudience: ['parents', 'schools'],
    features: [
      { feature: 'Interactieve modules' },
      { feature: 'Kindvriendelijke materialen' },
      { feature: 'Ouder-kind activiteiten' },
      { feature: 'Certificaat' }
    ],
    slug: 'digitale-geletterdheid',
    _status: 'published' as const,
  }
]
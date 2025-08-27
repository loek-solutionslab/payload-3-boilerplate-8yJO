import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(): Promise<Response> {
  try {
    const payload = await getPayload({ config: configPromise })
    
    console.log('Creating Payload CMS pages...')

    // Create Cursussen page
    const cursussenPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Cursussen & Trainingen',
        slug: 'cursussen',
        _status: 'published',
        meta: {
          title: 'Cursussen & Trainingen | Schermblij',
          description: 'Ontdek onze cursussen en trainingen voor gezonde schermtijd. Voor ouders, scholen en kinderdagverblijven.',
        },
        hero: {
          type: 'lowImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Cursussen & Trainingen'
                    }
                  ],
                  tag: 'h1'
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Ontdek onze cursussen en trainingen voor gezonde schermtijd. Voor ouders, scholen en kinderdagverblijven.'
                    }
                  ]
                }
              ]
            }
          }
        },
        layout: [
          {
            blockType: 'content',
            content: {
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
                        text: 'Bij Schermblij helpen we ouders, scholen en organisaties om een gezonde balans te vinden in het gebruik van schermen. Onze cursussen en trainingen zijn gebaseerd op de nieuwste wetenschappelijke inzichten en jarenlange praktijkervaring.'
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    })

    // Create Over Lisanne page
    const overLisannePage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Over Lisanne',
        slug: 'over-lisanne',
        _status: 'published',
        meta: {
          title: 'Over Lisanne | Schermblij',
          description: 'Leer meer over Lisanne, oprichtster van Schermblij en expert in gezonde schermtijd voor kinderen.',
        },
        hero: {
          type: 'lowImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Over Lisanne'
                    }
                  ],
                  tag: 'h1'
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Mediapedagoog gespecialiseerd in gezonde schermgewoonten voor kinderen'
                    }
                  ]
                }
              ]
            }
          }
        },
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Mijn Missie'
                      }
                    ],
                    tag: 'h2'
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Als mediapedagoog met meer dan 10 jaar ervaring in het onderwijs en de kinderopvang, zie ik dagelijks hoe digitale media het leven van kinderen beïnvloedt. Mijn missie is om ouders en professionals praktische tools te geven zodat technologie een positieve rol kan spelen in de ontwikkeling van kinderen.'
                      }
                    ]
                  },
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Mijn Aanpak'
                      }
                    ],
                    tag: 'h2'
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Ik geloof in een praktische en empathische benadering. Geen oordelen, wel begrip en concrete hulp. Samen kijken we naar wat werkt voor jouw gezin of organisatie.'
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    })

    // Create Contact page
    const contactPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Contact',
        slug: 'contact',
        _status: 'published',
        meta: {
          title: 'Contact | Schermblij',
          description: 'Neem contact op voor vragen over cursussen, workshops of maatwerk advies.',
        },
        hero: {
          type: 'lowImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Contact'
                    }
                  ],
                  tag: 'h1'
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Heb je vragen of wil je meer informatie? Neem contact met me op!'
                    }
                  ]
                }
              ]
            }
          }
        },
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Neem Contact Op'
                      }
                    ],
                    tag: 'h2'
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Email: info@schermblij.nl'
                      }
                    ]
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Voor vragen over cursussen, workshops, maatwerk trainingen of advies ben je altijd welkom. Ik reageer meestal binnen 24 uur.'
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    })

    // Create Baby page
    const babyPage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Baby (0-1 jaar)',
        slug: 'baby',
        _status: 'published',
        meta: {
          title: 'Schermtijd voor Baby\'s (0-1 jaar) | Schermblij',
          description: 'Praktische tips voor gezonde schermtijd bij baby\'s van 0-1 jaar. Wetenschappelijk onderbouwde richtlijnen.',
        },
        hero: {
          type: 'lowImpact',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Schermtijd voor Baby\'s (0-1 jaar)'
                    }
                  ],
                  tag: 'h1'
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Wetenschappelijk onderbouwde richtlijnen voor de allerkleinsten'
                    }
                  ]
                }
              ]
            }
          }
        },
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Schermtijd voor Baby\'s: Wat Zegt de Wetenschap?'
                      }
                    ],
                    tag: 'h2'
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Voor baby\'s onder de 18 maanden wordt schermtijd afgeraden, behalve voor videobellen met familie. De hersenen van baby\'s ontwikkelen zich het beste door directe interactie met ouders en verzorgers.'
                      }
                    ]
                  },
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Praktische Tips'
                      }
                    ],
                    tag: 'h2'
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
                            text: 'Videobellen met familie is toegestaan'
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
                            text: 'Vermijd passieve schermtijd (TV op de achtergrond)'
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
                            text: 'Focus op face-to-face interactie'
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
                            text: 'Lezen, zingen en spelen hebben voorrang'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    })

    console.log('✨ All Payload pages created successfully!')
    return Response.json({ 
      success: true, 
      message: 'All pages created successfully!',
      pages: [
        { title: cursussenPage.title, slug: cursussenPage.slug },
        { title: overLisannePage.title, slug: overLisannePage.slug },
        { title: contactPage.title, slug: contactPage.slug },
        { title: babyPage.title, slug: babyPage.slug }
      ]
    })

  } catch (error) {
    console.error('Error creating pages:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
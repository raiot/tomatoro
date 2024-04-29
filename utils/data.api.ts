import { PAGES } from '~/utils/config'

export function getAllStaticPages () {
  return [
    ...Object.keys(PAGES['en']).map((key) => ({
      slug: PAGES['en'][key as keyof typeof PAGES['en']],
    })),
    ...Object.keys(PAGES['es']).map((key) => ({
      slug: `es/${PAGES['es'][key as keyof typeof PAGES['es']]}`,
    })),
  ]
}

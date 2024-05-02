import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Grid, Heading } from 'theme-ui'

import { BackCta } from '~/components/atoms/back-cta'
import { Hero } from '~/components/atoms/hero'
import { QuestionCard } from '~/components/atoms/question-card'
import { Screen } from '~/components/atoms/screen'
import { RichTextRenderer } from '~/components/organisms/rich-text-renderer'
import { Page } from '~/components/templates/page'
import { getQuestions, getSingleType } from '~/utils/cms.api'
import { createFaqStructuredData } from '~/utils/structured-data.utils'

export const getServerSideProps: GetServerSideProps<{}> = async ({ locale }) => {
  try {
    const fieldParameters = ['seo', 'seo.metaImage', 'hero'].join('&populate[]=')
    const [page, questions] = await Promise.all([
      getSingleType<BasicPage>('faq', fieldParameters, locale),
      getQuestions(locale),
    ])
    return { props: { questions, page } }
  } catch (e) {
    Sentry.captureException(e)
    return { props: { questions: [], page: null } }
  }
}

interface RouteProps {
  questions: Question[]
  page: BasicPage | null
}

export default function Faq ({ page, questions }: RouteProps) {
  if (!page) {
    return null
  }

  const showHero = !!page.attributes.hero?.data

  return (
    <Page
      subtitle={ page.attributes.title }
      //@ts-ignore
      seo={ {
        ...page.attributes.seo,
        structuredData: JSON.stringify(createFaqStructuredData(questions)),
      } }
    >
      <Screen pt={ showHero && 'inherit !important' }>
        { showHero && (
          <Hero
            sx={ { backgroundImage: `url(${ page.attributes.hero!.data!.attributes.url })` } }
            role="img"
            aria-label={ page.attributes.hero!.data!.attributes.caption }
          />
        ) }
        <Grid
          variant="contained"
          sx={ {
            gap: 3,
            lineHeight: 2,
            justifyItems: 'start',
            paddingTop: showHero && 5,
          } }>
          <Heading as="h1">{ page.attributes.title }</Heading>
          <RichTextRenderer content={ page.attributes.content }/>

          { questions.map((question) => (
            <QuestionCard key={ question.attributes.question }
              question={ question.attributes.question }
              answer={ question.attributes.content }/>
          )) }

          <BackCta/>
        </Grid>
      </Screen>
    </Page>
  )
}

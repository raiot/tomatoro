import { GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import { Flex, Grid, Heading } from 'theme-ui'

import { BackCta } from '~/components/atoms/back-cta'
import { Screen } from '~/components/atoms/screen'
import { RichTextRenderer } from '~/components/organisms/rich-text-renderer'
import { Page } from '~/components/templates/page'
import graphicTakeBreak from '~/public/svg/graphic-take-break.svg'
import { getSingleType } from '~/utils/cms.api'

const fallbackPage: Error404Page = {
  id: 'fallback',
  attributes: {
    title: 'Oops! 🍅 Time\'s Up!',
    // eslint-disable-next-line max-len
    content: 'We couldn\'t find the page you\'re looking for.\n\nLet\'s get you back on track!\n\n[Return to Tomatoro Home](/)',
    createdAt: '2023-04-29T00:35:43.151Z',
    updatedAt: '2023-04-29T00:40:25.617Z',
    publishedAt: '2023-04-29T00:40:25.617Z',
    locale: 'en',
    hero: {
      data: null,
    },
    seo: null,
  },
}

export const getStaticProps: GetStaticProps<
  { page: Error404Page },
  {}
> = async ({ locale }) => {
  const fieldParameters = ['seo', 'seo.metaImage', 'hero'].join('&populate[]=')
  let page = await getSingleType<Error404Page>('error-404', fieldParameters, locale)

  if (!page) {
    page = fallbackPage
  }

  return { props: { page } }
}

export default function Custom404 ({ page }: { page: Post }) {
  return (
    <Page subtitle={ page.attributes.title }>
      <Screen>
        <Grid variant="contained" columns={ 2 }>
          <Grid gap={ 3 } sx={ { justifyItems: 'start' } }>
            <Heading as="h1">{ page.attributes.title }</Heading>
            <div>
              <RichTextRenderer content={ page.attributes.content }/>
            </div>
            <BackCta/>
          </Grid>
          <Flex sx={ { justifyContent: 'center' } }>
            <Image
              src={ graphicTakeBreak }
              alt="Tomato taking a break"
              width={ 180 }
              height={ 180 }
            />
          </Flex>
        </Grid>
      </Screen>
    </Page>
  )
}

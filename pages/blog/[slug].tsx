import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Grid, Heading } from 'theme-ui'

import { BackCta } from '~/components/atoms/back-cta'
import { Hero } from '~/components/atoms/hero'
import { Screen } from '~/components/atoms/screen'
import { RichTextRenderer } from '~/components/organisms/rich-text-renderer'
import { Page } from '~/components/templates/page'
import { getPostBySlug } from '~/utils/cms.api'

export const getServerSideProps: GetServerSideProps<
  { post: Post },
  { slug: string }
> = async ({ locale,params }) => {
  try {
    const post = await getPostBySlug(params?.slug || '', locale)

    if (!post) {
      return { notFound: true }
    }

    return { props: { post } }
  } catch (e) {
    Sentry.captureException(e)
    return { notFound: true }
  }
}

export default function PostBySlug ({ post }: { post: Post }) {
  if (!post) {
    return null
  }

  const showHero = !!post.attributes.hero?.data

  return (
    <Page subtitle={ post.attributes.title } seo={ post.attributes.seo }>
      <Screen pt={ showHero && 'inherit !important' }>
        { showHero && (
          <Hero
            sx={ { backgroundImage: `url(${ post.attributes.hero!.data!.attributes.url })` } }
            role="img"
            aria-label={ post.attributes.hero!.data!.attributes.caption }
          />
        ) }
        <Grid variant="contained"
          sx={ {
            gap: 3,
            lineHeight: 2,
            justifyItems: 'start',
            paddingTop: showHero && 5,
          } }>
          <Heading as="h1">{ post.attributes.title }</Heading>
          <RichTextRenderer content={ post.attributes.content }/>
          <BackCta/>
        </Grid>
      </Screen>
    </Page>
  )
}

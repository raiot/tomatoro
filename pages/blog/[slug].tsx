import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import posthog from 'posthog-js'
import React from 'react'
import { Box, Grid, Heading } from 'theme-ui'
import { useIsClient } from 'usehooks-ts'

import { BackCta } from '~/components/atoms/back-cta'
import { FeedbackForPage } from '~/components/organisms/feedback-for-page'
import { RichTextRenderer } from '~/components/organisms/rich-text-renderer'
import { Page } from '~/components/templates/page'
import { getPostBySlug } from '~/utils/cms.api'

export const getServerSideProps: GetServerSideProps<
  { post: Post },
  { slug: string }
> = async ({ locale, params }) => {
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
  const isClient = useIsClient()
  const isPageRatingEnabled = posthog.isFeatureEnabled('page-rating')

  console.log('[DEBUG] isPageRatingEnabled', posthog.isFeatureEnabled('page-rating'))

  if (!post) {
    return null
  }

  const showHero = !!post.attributes.hero?.data?.attributes.url

  return (
    <Page
      hero={ {
        imageUrl: post.attributes.hero?.data?.attributes.url,
        caption: post.attributes.hero?.data?.attributes.caption,
      } }
      seo={ post.attributes.seo }
      subtitle={ post.attributes.title }
      isWrapped
    >
      <Grid variant="contained"
        sx={ {
          gap: 3,
          lineHeight: 2,
          justifyItems: 'start',
          paddingTop: showHero && 5,
        } }>
        <Heading as="h1">{ post.attributes.title }</Heading>
        <RichTextRenderer content={ post.attributes.content }/>
        { isClient && isPageRatingEnabled && (
          <Box sx={ { my: 5 } }>
            <FeedbackForPage pageId={ post.attributes.slug }/>
          </Box>
        ) }
        <BackCta/>
      </Grid>
    </Page>
  )
}

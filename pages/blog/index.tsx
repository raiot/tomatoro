import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Grid, Heading } from 'theme-ui'

import { PostsList } from '~/components/molecules/posts-list'
import { Page } from '~/components/templates/page'
import { getAllPosts } from '~/utils/cms.api'

export const getServerSideProps: GetServerSideProps<{}> = async ({ locale = 'en' }) => {
  try {
    const posts = await getAllPosts(locale as Locale)
    return { props: { posts } }
  } catch (e) {
    Sentry.captureException(e)
    return { props: { posts: [] } }
  }
}

export default function Blog ({ posts }: { posts: Post[] }) {
  return (
    <Page subtitle="Articles" isWrapped>
      <Grid variant="contained">
        <Heading as="h1">Blog</Heading>

        <PostsList posts={ posts }/>
      </Grid>
    </Page>
  )
}

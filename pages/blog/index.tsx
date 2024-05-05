import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Grid, Heading } from 'theme-ui'

import { BlogsList } from '~/components/molecules/blogs-list'
import { Page } from '~/components/templates/page'
import { getAllBlogs } from '~/utils/cms.api'

export const getServerSideProps: GetServerSideProps<{}> = async ({ locale = 'en' }) => {
  try {
    const posts = await getAllBlogs(locale as Locale)
    return { props: { posts } }
  } catch (e) {
    Sentry.captureException(e)
    return { props: { posts: [] } }
  }
}

export default function Blog ({ posts }: { posts: CmsPageEntry[] }) {
  return (
    <Page subtitle="Articles" isWrapped>
      <Grid variant="contained">
        <Heading as="h1">Blog</Heading>

        <BlogsList blogs={ posts }/>
      </Grid>
    </Page>
  )
}

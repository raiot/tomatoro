import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Grid, Heading } from 'theme-ui'

import { BlogsList } from '~/components/molecules/blogs-list'
import { Page } from '~/components/templates/page'
import { getAllHelpEntries } from '~/utils/cms.api'

export const getServerSideProps: GetServerSideProps<{}> = async ({ locale = 'en' }) => {
  try {
    const posts = await getAllHelpEntries(locale as Locale)
    return { props: { posts } }
  } catch (e) {
    Sentry.captureException(e)
    return { props: { posts: [] } }
  }
}

export default function Help ({ posts }: { posts: CmsPageEntry[] }) {
  const { locale } = useRouter()

  return (
    <Page subtitle="Articles" isWrapped>
      <Grid variant="contained">
        <Heading as="h1">Help Center</Heading>

        <BlogsList blogs={ posts } path={ locale === 'es' ? 'ayuda' : 'help' }/>
      </Grid>
    </Page>
  )
}

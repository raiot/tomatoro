import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'

import { getAllPosts } from '~/utils/cms.api'
import { getAllStaticPages } from '~/utils/data.api'

interface SiteMapData {
  posts: {
    en: Post[]
    es: Post[]
  }
  domain: string
  staticPages: Array<{ slug: string }>
}

function generateSiteMap ({ domain, posts, staticPages }: SiteMapData) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://tomatoro.com</loc>
        <lastmod>${ new Date().toISOString() }</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
     ${ staticPages.map(({ slug }) => `
        <url>
            <loc>${ `${ domain }${ slug }` }</loc>
            <lastmod>${ new Date().toISOString() }</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>`).join('') }
     ${ posts.en.map(({ attributes: { slug, updatedAt } }) => `
        <url>
            <loc>${ `${ domain }/blog/${ slug }` }</loc>
            <lastmod>${ updatedAt }</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>`).join('') }
     ${ posts.es.map(({ attributes: { slug, updatedAt } }) => `
        <url>
            <loc>${ `${ domain }/es/blog/${ slug }` }</loc>
            <lastmod>${ updatedAt }</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>`).join('') }
   </urlset>
 `
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
  try {
    const staticPages = getAllStaticPages()
    const [postsEn, postsEs] = await Promise.all([
      getAllPosts('en'),
      getAllPosts('es'),
    ])
    const sitemap = generateSiteMap({
      posts: { en: postsEn, es: postsEs },
      domain: 'https://tomatoro.com',
      staticPages,
    })

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
      props: {},
    }
  } catch (e) {
    Sentry.captureException(e)
    return { props: {} }
  }
}

export default function SiteMap () {
  // Empty.
}

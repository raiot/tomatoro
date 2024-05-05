import Link from 'next/link'
import React, { FC } from 'react'
import { Heading, Link as TuiLink } from 'theme-ui'

import { Date } from '~/components/atoms/date'

import { List, ListItem } from './blogs-list.styles'

interface Props {
  blogs: CmsPageEntry[]
  path?: string
}

export const BlogsList: FC<Props> = ({ blogs, path = 'blog' }) => {
  return (
    <List>
      { blogs.map((post) => (
        <ListItem key={ post.id }>
          <Heading as="h4" mr={ 3 }>
            <Date dateString={ post.attributes.publishedAt }/>
          </Heading>
          <TuiLink as={ Link } href={ `/${ path }/${ post.attributes.slug }` }>
            { post.attributes.title }
          </TuiLink>
        </ListItem>
      )) }
    </List>
  )
}

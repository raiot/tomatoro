import Link from 'next/link'
import React, { FC } from 'react'
import { Heading, Link as TuiLink } from 'theme-ui'

import { Date } from '~/components/atoms/date'

import { List, ListItem } from './blogs-list.styles'

interface Props {
  blogs: CmsPageEntry[]
}

export const BlogsList: FC<Props> = ({ blogs }) => {
  return (
    <List>
      { blogs.map((post) => (
        <ListItem key={ post.id }>
          <Heading as="h4" mr={ 3 }>
            <Date dateString={ post.attributes.publishedAt }/>
          </Heading>
          <TuiLink as={ Link } href={ `/blog/${ post.attributes.slug }` }>
            { post.attributes.title }
          </TuiLink>
        </ListItem>
      )) }
    </List>
  )
}

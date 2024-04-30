import React, { FC } from 'react'
import { Card, Heading } from 'theme-ui'

import { RichTextRenderer } from '~/components/organisms/rich-text-renderer'

interface Props {
  question: Question['attributes']['question']
  answer: Question['attributes']['content']
}

export const QuestionCard: FC<Props> = ({ answer, question }) => {
  return (
    <Card variant='question' sx={{ mt: 2, mb: 4 }}>
      <Heading as="h2">{ question }</Heading>
      <RichTextRenderer content={ answer }/>
    </Card>
  )
}

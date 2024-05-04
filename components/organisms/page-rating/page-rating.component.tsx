import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import { Button, Card, Flex, Heading, Paragraph } from 'theme-ui'
import { useLocalStorage } from 'usehooks-ts'

import { postRating, RatingBody } from '~/utils/cms.api'

interface Props {
  pageId: string
}

interface RatedPages {
  [key: string]: RatingBody['rate']
}

export const PageRating: FC<Props> = ({ pageId }) => {
  const { t } = useTranslation('feedback')
  const [ratedPages, setRatedPages] = useLocalStorage('rated-pages', {} as RatedPages)
  const [isRating, setIsRating] = useState(false)
  const isRateDisabled = Boolean(ratedPages[pageId] || isRating)

  async function handleRateClick (rate: RatingBody['rate']) {
    setIsRating(true)
    await postRating({ slug: pageId, rate })
    setIsRating(false)
    setRatedPages({
      ...ratedPages,
      [pageId]: rate,
    })
  }

  return (
    <Card sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Heading as="h2" m={ 0 }>{ t('title') }</Heading>
      <Flex sx={ { gap: 4 } }>
        {
          ['great', 'good', 'bad'].map((rate) => (
            <Button
              key={ rate }
              variant="rate"
              disabled={ isRateDisabled }
              onClick={ () => handleRateClick(rate as RatingBody['rate']) }
            >
              { ratedPages[pageId] === rate ? '✅' : t(`rate.${ rate }`) }
            </Button>
          ))
        }
      </Flex>
      <Paragraph>{ t('caption') }</Paragraph>
    </Card>
  )
}

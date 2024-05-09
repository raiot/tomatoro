import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { Flex, Grid, Heading, Paragraph } from 'theme-ui'

import graphicCommunity from '~/public/svg/graphic-community.svg'

export const WhoUses: FC = () => {
  const { t } = useTranslation('home')

  return (
    <Grid variant="contained" gap={ 4 }>
      <Heading as="h2" variant="text.title" sx={ { textAlign: 'center' } }>
        { t('whoUses.title') }
      </Heading>

      <Flex sx={ {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: ['column', 'row'],
      } }>
        <Flex sx={ { flexDirection: 'column', gap: 3, justifyContent: 'center' } }>
          <Heading as="h3" sx={ { textAlign: 'center' } }>
            { t('whoUses.content.title') }
          </Heading>
          <Paragraph sx={ { textAlign: 'center' } }>
            { t('whoUses.content.line1') }
          </Paragraph>
          <Paragraph sx={ { mt: 2, textAlign: 'center' } }>
            { t('whoUses.content.line2') }
          </Paragraph>
        </Flex>
        <Image
          src={ graphicCommunity }
          alt={ t('whoUses.imageAlt') }
          width={ 300 }
          height={ 300 }
          sizes="100vw"
          sx={ {
            width: ['100%', '50%'],
            height: 'auto',
          } }
        />
      </Flex>
    </Grid>
  )
}

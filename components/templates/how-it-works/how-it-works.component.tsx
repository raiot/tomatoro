import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { Box, Flex, Grid, Heading, Link as TuiLink, Paragraph } from 'theme-ui'

import graphicProcess from '~/public/svg/graphic-process.svg'
import { PAGES } from '~/utils/config'

export const HowItWorks: FC = () => {
  const { locale = 'en' } = useRouter()
  const { t } = useTranslation('home')

  return (
    <Grid variant="contained" gap={ 4 }>
      <Heading as="h2" variant="text.title" sx={ { textAlign: 'center' } }>
        { t('howItWorks.title') }
      </Heading>

      <Flex sx={ {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: ['column', 'row'],
      } }>
        <Image
          src={ graphicProcess }
          alt={ t('howItWorks.imageAlt') }
          width={ 300 }
          height={ 300 }
          sizes="100vw"
          sx={ {
            width: '50%',
            height: 'auto',
          } }
        />
        <Flex sx={ { flexDirection: 'column', justifyContent: 'center' } }>
          <Heading as="h3" sx={ { textAlign: 'center' } }>
            { t('howItWorks.content.title') }
          </Heading>
          <Paragraph sx={ { textAlign: 'center' } }>
            { t('howItWorks.content.text') }
          </Paragraph>
          <ol>
            <li>
              <Paragraph>
                { t('howItWorks.content.step1') }
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                { t('howItWorks.content.step2') }
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                { t('howItWorks.content.step3') }
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                { t('howItWorks.content.step4') }
              </Paragraph>
            </li>
          </ol>
        </Flex>
      </Flex>

      <Box mx="auto">
        {/* @ts-ignore */ }
        <TuiLink as={ Link } href={ PAGES[locale].HOW_IT_WORKS }>
          { t('howItWorks.cta') }
        </TuiLink>
      </Box>
    </Grid>
  )
}

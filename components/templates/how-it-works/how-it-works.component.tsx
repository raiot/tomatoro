import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Box, Grid, Heading, Link as TuiLink, Paragraph } from 'theme-ui'

import graphicRepeat from '~/public/svg/graphic-repeat.svg'
import graphicSetTime from '~/public/svg/graphic-set-time.svg'
import graphicTakeBreak from '~/public/svg/graphic-take-break.svg'
import { PAGES } from '~/utils/config'

const sections = [
  { key: 'work', graphic: graphicSetTime },
  { key: 'short', graphic: graphicTakeBreak },
  { key: 'long', graphic: graphicRepeat },
]

export const HowItWorks: FC = () => {
  const { locale = 'en' } = useRouter()
  const { t } = useTranslation('home')

  return (
    <Grid variant="contained" gap={ 5 }>
      <Heading as="h2" variant="text.title" sx={ { textAlign: 'center' } }>
        { t('howItWorks.title') }
      </Heading>

      <Grid columns={ [2, 3] }>
        { sections.map(({ graphic, key }) => (
          <Box key={ key } sx={ { textAlign: 'center' } }>
            <Image
              src={ graphic }
              alt={ t(`howItWorks.sections.${ key }`) }
              width={ 150 }
              height={ 150 }
            />
            <Heading as="h3">{ t(`howItWorks.sections.${ key }`) }</Heading>
          </Box>
        )) }
      </Grid>

      <Box>
        <Paragraph mb={ 3 }>
          { t('howItWorks.contentOne') }
        </Paragraph>
        <Paragraph>
          { t('howItWorks.contentTwo') }
        </Paragraph>
      </Box>

      <Box mx="auto">
        {/* @ts-ignore */}
        <TuiLink as={ Link } href={ PAGES[locale].HOW_IT_WORKS }>
          { t('howItWorks.cta') }
        </TuiLink>
      </Box>
    </Grid>
  )
}

import useTranslation from 'next-translate/useTranslation'
import { FC, useState } from 'react'
import { Flex, Heading } from 'theme-ui'

import { useCreateTomatoForInterval } from '~/components/molecules/tomato-counter/tomato-counter.utils'
import { Interval } from '~/stores/intervals'

export const TomatoCounterSkeleton: FC = () => {
  const { t } = useTranslation('timer')
  const [intervals, setIntervals] = useState<Interval[]>([
    { type: 'WORK' },
    { type: 'SHORT' },
    { type: 'WORK' },
    { type: 'SHORT' },
    { type: 'WORK' },
    { type: 'LONG' },
  ])
  const { createTomatoForInterval } = useCreateTomatoForInterval()

  return (
    <Flex sx={ { gap: '1em', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' } }>
      <Heading as="h4" variant="text.paragraph">
        {t('alternativeTitle')}
      </Heading>

      <Flex sx={ { gap: '0.25em' } }>
        { intervals.map(createTomatoForInterval) }
      </Flex>
    </Flex>
  )
}

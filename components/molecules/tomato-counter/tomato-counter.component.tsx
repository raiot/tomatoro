import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Button, Flex, Heading } from 'theme-ui'

import { TomatoCounterSkeleton } from '~/components/molecules/tomato-counter/tomato-counter-skeleton.component'
import { useCreateTomatoForInterval } from '~/components/molecules/tomato-counter/tomato-counter.utils'
import { useIntervalsStore } from '~/stores/intervals'

export const TomatoCounter: FC = () => {
  const { t } = useTranslation('timer')
  const { intervals, resetIntervals } = useIntervalsStore()
  const { createTomatoForInterval } = useCreateTomatoForInterval()

  if (intervals.length === 0) {
    return <TomatoCounterSkeleton/>
  }

  function resetIntervalsRequested () {
    if (window.confirm(t('restartWarning'))) {
      resetIntervals()
    }
  }

  return (
    <Flex sx={ { gap: '1em', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' } }>
      <Heading as="h4" variant="text.paragraph">
        { t('title') }
      </Heading>

      <Flex sx={ { gap: '0.25em', justifyContent: 'center', width: 200, flexWrap: 'wrap' } }>
        { intervals.map(createTomatoForInterval) }
      </Flex>

      <Button variant="underlined" onClick={ resetIntervalsRequested }>
        { t('restart') }
      </Button>
    </Flex>
  )
}

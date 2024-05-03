import { FC, useMemo } from 'react'
import { Button, Flex } from 'theme-ui'

import { Interval, useIntervalsStore } from '~/stores/intervals'

export const TomatoCounter: FC = () => {
  const { intervals, lastReset, resetIntervals } = useIntervalsStore()
  const workIntervals = useMemo(() => intervals.filter(isWorkInterval).length, [intervals])

  return (
    <Flex sx={ { gap: '1em', justifyContent: 'center' } }>
      <h3>Tomatoros: { workIntervals }</h3>
      <Button onClick={ resetIntervals }>
        Restart
      </Button>
      <span>Last reset: { lastReset }</span>
    </Flex>
  )
}

function isWorkInterval (interval: Interval) {
  return interval.type === 'WORK'
}

import { FC } from 'react'
import { Flex } from 'theme-ui'

import { Interval, useIntervalsStore } from '~/stores/intervals'

export const TomatoCounter: FC = () => {
  const { intervals } = useIntervalsStore()

  function isWorkInterval (interval: Interval) {
    return interval.type === 'WORK'
  }

  return (
    <Flex sx={ { gap: '1em', justifyContent: 'center' } }>
      <h3>Tomatoros: { intervals.filter(isWorkInterval).length }</h3>
    </Flex>
  )
}

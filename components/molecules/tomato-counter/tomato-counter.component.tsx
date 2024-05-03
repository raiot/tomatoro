import { FC } from 'react'
import { Button, Flex, Heading } from 'theme-ui'

import { Tomato } from '~/components/atoms/tomato'
import { useIntervalsStore } from '~/stores/intervals'

export const TomatoCounter: FC = () => {
  const { intervals, resetIntervals } = useIntervalsStore()

  if (intervals.length === 0) {
    return null
  }

  return (
    <Flex sx={ { gap: '1em', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' } }>
      <Heading as="h4" variant="text.paragraph">
        Your day:
      </Heading>

      <Flex sx={ { gap: '0.25em' } }>
        { intervals.map((interval, index) => (
          <Tomato
            key={ `${ interval.type }-${ index }` }
            height={ 28 }
            type={ interval.type }
          />
        )) }
      </Flex>

      <Button onClick={ resetIntervals }>
        Restart
      </Button>
    </Flex>
  )
}

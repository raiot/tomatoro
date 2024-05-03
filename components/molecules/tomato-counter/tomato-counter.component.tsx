import { FC, ReactNode } from 'react'
import { Button, Card, Flex, Heading, Paragraph } from 'theme-ui'

import { Popup } from '~/components/atoms/popup'
import { Tomato } from '~/components/atoms/tomato'
import { Interval, useIntervalsStore } from '~/stores/intervals'
import { SegmentType } from '~/utils/config'

const popupBody: Record<SegmentType, ReactNode> = {
  WORK: 'Tomato earned by finishing a working interval!',
  SHORT: 'Tomato earned by finishing a short break!',
  LONG: 'Tomato earned by finishing a long break!',
}

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
        { intervals.map(createTomatoForInterval) }
      </Flex>

      <Button onClick={ resetIntervals }>
        Restart
      </Button>
    </Flex>
  )
}

function createTomatoForInterval (interval: Interval, index: number) {
  return (
    <Popup
      key={ `${ interval.type }-${ index }` }
      content={ (
        <Card variant="popup">
          <Paragraph variant="text.popup">{ popupBody[interval.type] }</Paragraph>
        </Card>
      ) }
    >
      <Tomato
        height={ 28 }
        type={ interval.type }
      />
    </Popup>
  )
}

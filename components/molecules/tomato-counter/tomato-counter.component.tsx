import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Button, Card, Flex, Heading, Paragraph } from 'theme-ui'

import { Popup } from '~/components/atoms/popup'
import { Tomato } from '~/components/atoms/tomato'
import { Interval, useIntervalsStore } from '~/stores/intervals'
import { SegmentType } from '~/utils/config'

const popupBody: Record<SegmentType, string> = {
  WORK: 'popup.work',
  SHORT: 'popup.short',
  LONG: 'popup.long',
}

export const TomatoCounter: FC = () => {
  const { t } = useTranslation('timer')
  const { intervals, resetIntervals } = useIntervalsStore()

  if (intervals.length === 0) {
    return null
  }

  function resetIntervalsRequested () {
    if (window.confirm(t('restartWarning'))) {
      resetIntervals()
    }
  }

  function createTomatoForInterval (interval: Interval, index: number) {
    return (
      <Popup
        key={ `${ interval.type }-${ index }` }
        content={ (
          <Card variant="popup">
            <Paragraph variant="text.popup">{ t(popupBody[interval.type]) }</Paragraph>
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

  return (
    <Flex sx={ { gap: '1em', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' } }>
      <Heading as="h4" variant="text.paragraph">
        { t('yourDay') }
      </Heading>

      <Flex sx={ { gap: '0.25em' } }>
        { intervals.map(createTomatoForInterval) }
      </Flex>

      <Button onClick={ resetIntervalsRequested }>
        { t('restart') }
      </Button>
    </Flex>
  )
}

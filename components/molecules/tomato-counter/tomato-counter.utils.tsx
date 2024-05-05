import useTranslation from 'next-translate/useTranslation'
import { Card, Paragraph } from 'theme-ui'

import { Popup } from '~/components/atoms/popup'
import { Tomato } from '~/components/atoms/tomato'
import { Interval } from '~/stores/intervals'
import { SegmentType } from '~/utils/config'

const popupBody: Record<SegmentType, string> = {
  WORK: 'popup.work',
  SHORT: 'popup.short',
  LONG: 'popup.long',
}

export function useCreateTomatoForInterval () {
  const { t } = useTranslation('timer')
  const createTomatoForInterval = (interval: Interval, index: number) => (
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

  return { createTomatoForInterval }
}

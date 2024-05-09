import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Box, Divider } from 'theme-ui'

import { Screen } from '~/components/atoms/screen'
import { TomatoCounter } from '~/components/molecules/tomato-counter'
import { NotificationsWarn } from '~/components/organisms/notifications-warn'
import { HowItWorks } from '~/components/templates/how-it-works'
import { Page } from '~/components/templates/page'
import { TimerWithSelector } from '~/components/templates/timer-with-selector'
import { WhoUses } from '~/components/templates/who-uses'
import { useSettingsStore } from '~/stores/settings'
import { useTimerStore } from '~/stores/time'
import { getBanners } from '~/utils/cms.api'
import { formatTime } from '~/utils/timer.utils'

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  try {
    const banners = await getBanners('home')
    return { props: { banners } }
  } catch (e) {
    Sentry.captureException(e)
    return { props: { banners: [] } }
  }
}

export default function Home ({ banners }: { banners: Banner[] }) {
  const [isStarted, time] = useTimerStore(state => [state.isStarted, state.time])
  const showTimer = useSettingsStore(state => state.showTimer)
  const title = showTimer && isStarted ? formatTime(time) : undefined

  return (
    <Page subtitle={ title } banners={ banners }>
      <Box pt={ 4 } pb={ 5 }>
        <NotificationsWarn/>
        <TimerWithSelector/>
        <TomatoCounter/>
      </Box>

      <Divider/>

      <Screen id="how-it-works">
        <HowItWorks/>
      </Screen>

      <Divider/>

      <Screen id="who-uses-tomatoro">
        <WhoUses/>
      </Screen>
    </Page>
  )
}

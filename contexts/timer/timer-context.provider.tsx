import React, { ReactNode, useCallback, useEffect, useRef } from 'react'

import { useNotificationsContext } from '~/contexts/notifications'
import { useIntervalsStore } from '~/stores/intervals'
import { useSettingsStore } from '~/stores/settings'
import { useTimerStore } from '~/stores/time'
import { trackEvent } from '~/utils/analytics'
import { NOTIFICATION } from '~/utils/config'

export const TimerContext = React.createContext<{
  onStartTimer(): void;
  onStopTimer(): void;
  onResetTimer(): void;
} | undefined>(undefined)

export const useTimerContext = () => {
  const context = React.useContext(TimerContext)

  if (context === undefined) {
    throw new Error(
      'useTimerContext must be used within a TimerContextType.Provider',
    )
  }

  return context
}

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { notify } = useNotificationsContext()
  const { addInterval } = useIntervalsStore()
  const { isRunning, reset, setTotalTime, start, stop, tick, time } = useTimerStore()
  const [currentSegment, workLength, shortLength, longLength] = useSettingsStore(state => [
    state.currentSegment,
    state.workLength,
    state.shortLength,
    state.longLength,
  ])

  const onTick = useCallback(() => {
    tick()
  }, [tick])

  const onStartTimer = useCallback(() => {
    if (time < 1) {
      reset()
    }
    start()
    workerRef.current?.postMessage('start')
    trackEvent('TIMER_STARTED')
  }, [reset, start, time])

  const onStopTimer = useCallback(() => {
    stop()
    workerRef.current?.postMessage('stop')
    trackEvent('TIMER_STOPPED')
  }, [stop])

  const onResetTimer = useCallback(() => {
    reset()
    workerRef.current?.postMessage('stop')
    trackEvent('TIMER_RESET')
  }, [reset])

  useEffect(() => {
    if (time < 1 && isRunning) {
      onStopTimer()
      addInterval({
        type: currentSegment,
      })
      notify(NOTIFICATION)
      trackEvent('TIMER_EXPIRED')
    }
  }, [addInterval, currentSegment, isRunning, notify, onStopTimer, time])

  const onSegmentChange = useCallback((totalTime: number) => {
    setTotalTime(totalTime)
    onResetTimer()
  }, [onResetTimer, setTotalTime])

  useEffect(() => {
    if (currentSegment === 'WORK') {
      onSegmentChange(workLength)
      trackEvent('TIMER_SEGMENT_CHANGED', { segment: 'WORK' })
    }
    if (currentSegment === 'SHORT') {
      onSegmentChange(shortLength)
      trackEvent('TIMER_SEGMENT_CHANGED', { segment: 'SHORT' })
    }
    if (currentSegment === 'LONG') {
      onSegmentChange(longLength)
      trackEvent('TIMER_SEGMENT_CHANGED', { segment: 'LONG' })
    }
  }, [currentSegment, longLength, onSegmentChange, shortLength, workLength])

  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(new URL('~/utils/worker.ts', import.meta.url))

    workerRef.current.onmessage = (event: MessageEvent<string>) => {
      if (event.data === 'tick') {
        onTick()
      }
    }

    return () => {
      workerRef.current?.terminate()
    }
  }, [onTick])

  const value = {
    onStartTimer,
    onStopTimer,
    onResetTimer,
  }

  return (
    <TimerContext.Provider value={ value }>
      { children }
    </TimerContext.Provider>
  )
}

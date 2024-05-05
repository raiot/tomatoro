import Posthog from 'posthog-js'

const EVENT = {
  // Legacy stuff from the olv 2017 project
  LEGACY_WORKER_UNINSTALLED: 'legacy_worker_uninstalled',
  // Timer events
  TIMER_STARTED: 'timer_started',
  TIMER_STOPPED: 'timer_stopped',
  TIMER_RESET: 'timer_reset',
  TIMER_EXPIRED: 'timer_expired',
  TIMER_SEGMENT_CHANGED: 'timer_segment_changed',
  // App events
  INTERVALS_RESET: 'intervals_reset',
  // Settings events
  SETTINGS_CHANGED: 'settings_changed',
  // Other
  PAGE_VIEW: '$pageview',
  LANGUAGE_CHANGED: '$language_changed',
}

export function init () {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
    Posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
      {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        autocapture: true,
      },
    )
  }
}

export function trackEvent (event: keyof typeof EVENT, properties?: Record<string, any>) {
  Posthog?.capture(EVENT[event], properties)
}

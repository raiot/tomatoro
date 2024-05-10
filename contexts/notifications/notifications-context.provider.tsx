import React, { useCallback, useEffect } from 'react'

import { useSettingsStore } from '~/stores/settings'
import { isIOS } from '~/utils/is-ios'

import { NotificationPayload } from './notifications-context.types'

export const NotificationsContext = React.createContext<{
  hasPermissions: boolean
  requestPermission(): void
  notify(payload: NotificationPayload): void
} | undefined>(undefined)

export const useNotificationsContext = () => {
  const context = React.useContext(NotificationsContext)

  if (context === undefined) {
    throw new Error(
      'useNotificationsContext must be used within a NotificationsContext.Provider',
    )
  }

  return context
}

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showNotifications = useSettingsStore(state => state.showNotifications)
  const [hasPermissions, setHasPermissions] = React.useState<boolean>(true)

  useEffect(() => {
    if (!('Notification' in window) || isIOS()) {
      return
    }
    showNotifications && setHasPermissions(Notification?.permission === 'granted')
  }, [showNotifications])

  const requestPermission = () => {
    if (!('Notification' in window) || isIOS()) {
      return
    }
    Notification?.requestPermission()
      .then(() => {
        setHasPermissions(Notification?.permission === 'granted')
      })
  }

  const notify = useCallback(({ title, ...options }: NotificationPayload) => {
    if (!('Notification' in window) || isIOS()) {
      return
    }
    if (showNotifications && !!Notification && hasPermissions) {
      new Notification(title, options).onclick = (event) => {
        window.focus()
        // @ts-ignore
        event.target?.close()
      }
    }
  }, [hasPermissions, showNotifications])

  const value = {
    hasPermissions,
    requestPermission,
    notify,
  }

  return (
    <NotificationsContext.Provider
      value={ value }
    >
      { children }
    </NotificationsContext.Provider>
  )
}

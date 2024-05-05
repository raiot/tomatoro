import { create, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { Interval, IntervalsState, IntervalsStore } from './intervals-store.types'

const initialState: IntervalsState = {
  intervals: [],
  lastReset: null,
}

const intervalsStore = create<
  IntervalsStore,
  [
    ['zustand/devtools', never],
    ['zustand/persist', IntervalsState],
  ]
>(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        addInterval: (payload: Interval) => set(
          (state) => {
            return { intervals: [...state.intervals, payload] }
          },
          false,
          { type: 'intervals/addInterval', payload },
        ),

        resetIntervals: () => set(
          () => ({
            ...initialState,
            lastReset: new Date().toISOString(),
          }),
          false,
          { type: 'intervals/resetSetting' },
        ),
      }),
      {
        name: 'intervals',
      },
    ),
  ),
)

// bounded stored
export function useIntervalsStore (): IntervalsStore
export function useIntervalsStore<T> (
  selector: (state: IntervalsStore) => T,
  equals?: (a: T, b: T) => boolean,
): T
export function useIntervalsStore<T> (
  selector?: (state: IntervalsStore) => T,
  equals?: (a: T, b: T) => boolean,
) {
  return useStore(intervalsStore, selector!, equals)
}

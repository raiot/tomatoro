import { SegmentType } from '~/utils/config'

export interface Interval {
  type: SegmentType
}

export interface IntervalsState {
  intervals: Interval[]
}

export interface IntervalsStore extends IntervalsState {
  addInterval(interval: Interval): void

  resetIntervals(): void
}

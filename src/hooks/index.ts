import { useEffect, useRef } from 'react'
import {
  createCacheSelectionListener,
  createSelectionChangeListener,
} from 'selection-extra'

function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}

type Target<T> = React.RefObject<T> | (() => T | null)

export function useSelectionChangeListener<N extends Node, T extends Target<N>>(
  target?: T | null,
  callback?: (node: N) => void,
) {
  const callbackRef = useLatest(callback)

  useEffect(() => {
    if (!target) {
      return
    }

    const mergedCallback = callbackRef.current || (() => {})

    if (typeof target === 'function') {
      if (!target()) {
        return
      }
      const disposer = createSelectionChangeListener(target()!, mergedCallback)

      return () => disposer()
    }

    if (!target.current) {
      return
    }

    const disposer = createSelectionChangeListener(
      target.current,
      mergedCallback,
    )

    return () => disposer()
  }, [callbackRef, target])
}

export function useCacheSelectionListener<N extends Node, T extends Target<N>>(
  target: T,
) {
  const restorerRef = useRef<() => void>()

  useEffect(() => {
    if (!target) {
      return
    }

    if (typeof target === 'function') {
      if (!target()) {
        return
      }
      const { disposer, restorer } = createCacheSelectionListener(target()!)
      restorerRef.current = restorer

      return () => disposer()
    }

    if (!target.current) {
      return
    }

    const { disposer, restorer } = createCacheSelectionListener(target.current)
    restorerRef.current = restorer

    return () => disposer()
  }, [target])

  return restorerRef
}

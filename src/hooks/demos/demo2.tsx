/**
 * @title useCacheSelectionListener
 * @description useCacheSelectionListener
 */

import React, { useRef } from 'react'
import { useCacheSelectionListener } from 'use-selection-extra'

export default function Demo() {
  const nonEditableDivRef = useRef<HTMLDivElement>(null)

  const nonEditableRestorerRef = useCacheSelectionListener(nonEditableDivRef)

  const editableRestorerRef = useCacheSelectionListener(() =>
    document.querySelector<HTMLDivElement>('#editable-selection-restore'),
  )

  return (
    <div>
      <div
        ref={nonEditableDivRef}
        style={{
          border: '1px solid gray',
        }}
      >
        <p>non-editable</p>
        hello
        <p>world</p>
      </div>
      <p>
        <button onClick={() => nonEditableRestorerRef.current?.()}>
          restore
        </button>
      </p>
      <div
        id='editable-selection-restore'
        contentEditable
        style={{
          border: '1px solid gray',
        }}
      >
        <p>editable</p>
        hello
        <p>world</p>
      </div>
      <p>
        <button onClick={() => editableRestorerRef.current?.()}>restore</button>
      </p>
    </div>
  )
}

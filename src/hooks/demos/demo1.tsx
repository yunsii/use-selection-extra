/**
 * @title useSelectionChangeListener
 * @description useSelectionChangeListener
 */

/* eslint-disable no-console */

import React, { useRef } from 'react'
import { useSelectionChangeListener } from 'use-selection-extra'

export default function Demo() {
  const nonEditableDivRef = useRef<HTMLDivElement>(null)

  useSelectionChangeListener(nonEditableDivRef, () => {
    console.log('non-editable selection change', window.getSelection())
  })

  useSelectionChangeListener(
    () => document.querySelector<HTMLDivElement>('#editable-selection-change'),
    () => {
      console.log('editable selection change', window.getSelection())
    },
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
      <div
        id='editable-selection-change'
        contentEditable
        style={{
          border: '1px solid gray',
        }}
      >
        <p>editable</p>
        hello
        <p>world</p>
      </div>
    </div>
  )
}

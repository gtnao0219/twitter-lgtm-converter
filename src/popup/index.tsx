import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { CHROME_STORAGE_KEY_ENABLED } from '../common/const'

chrome.storage.local.get(CHROME_STORAGE_KEY_ENABLED, value => {
  let enabled = true
  const v = value[CHROME_STORAGE_KEY_ENABLED]
  if (v != null) {
    enabled = v
  }
  ReactDOM.render(
    <App defaultEnabled={enabled} />,
    document.querySelector('#app')
  )
})

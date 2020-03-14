import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { CHROME_STORAGE_KEY_ENABLED } from '../common/const'

type IProps = { defaultEnabled: boolean }
export const App: React.SFC<IProps> = ({ defaultEnabled }) => {
  const [enabled, setEnabled] = React.useState(defaultEnabled)
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={() => {
              sendChangeEnabledMessage(!enabled)
              storeEnabled(!enabled)
              setEnabled(!enabled)
            }}
          />
        }
        label={enabled ? 'ON' : 'OFF'}
      />
    </>
  )
}

function sendChangeEnabledMessage(enabled: boolean): void {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0].id === undefined) return
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'changeEnabled',
      payload: enabled
    })
  })
}

function storeEnabled(enabled: boolean) {
  const v: { [key: string]: any } = {}
  v[CHROME_STORAGE_KEY_ENABLED] = enabled
  chrome.storage.local.set(v, () => {})
}

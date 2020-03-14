import { Message } from '../common/types'
import { CHROME_STORAGE_KEY_ENABLED } from '../common/const'

const FAVORITE_PATH =
  'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'
const CLICKED_FAVORITE_PATH =
  'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z'
const LGTM_PATH =
  'M14.19 5.4h53.86v149.45h90.05v44.87H14.19zM288.4 93.77h100.79q1.29 25-5.66 45.39a96.79 96.79 0 01-20.33 34.89 92 92 0 01-32.13 22.45 104 104 0 01-40.95 7.93 109.71 109.71 0 01-76-29.92 104.05 104.05 0 01-23-32.56 95.46 95.46 0 01-8.47-39.88 94.78 94.78 0 018.47-39.87 104.38 104.38 0 0123-32.42A107.71 107.71 0 01248.23 8a110.79 110.79 0 01118.48 22.49l-35.07 35.08a51.25 51.25 0 00-17.75-15 52.83 52.83 0 00-44.67-1.23 52.92 52.92 0 00-17 12 57.07 57.07 0 00-11.45 18.11 60 60 0 00-4.23 22.77 60 60 0 004.23 22.68 56.57 56.57 0 0011.45 18.19 52.62 52.62 0 0017 12 50.5 50.5 0 0020.9 4.36q20.19 0 31.07-7.51a35.75 35.75 0 0014.46-20.55h-47.39zM51.29 279.55H0v-44.86h156v44.86h-51.13V429H51.29zM283.36 381.71l-41.72-62V429h-53.86V234.69h47.47L290 312l55.9-77.29h46.9V429h-53.86V320.27l-42.43 61.44z'
const INTERVAL_MSEC = 1000

function convert2Lgtm() {
  const elements: SVGPathElement[] = [].slice.call(
    document.getElementsByTagName('path')
  )
  elements
    .filter(element => {
      const d = element.getAttribute('d')
      return d === FAVORITE_PATH || d === CLICKED_FAVORITE_PATH
    })
    .forEach(element => {
      element.setAttribute('d', LGTM_PATH)
      element.setAttribute('transform', 'scale(0.05,0.05)')
    })
}

function convert2Favorite() {
  const elements: SVGPathElement[] = [].slice.call(
    document.getElementsByTagName('path')
  )
  elements
    .filter(element => {
      return element.getAttribute('d') === LGTM_PATH
    })
    .forEach(element => {
      element.setAttribute('d', FAVORITE_PATH)
      element.setAttribute('transform', 'scale(1,1)')
    })
}

let timerId: number | null = null

chrome.storage.local.get(CHROME_STORAGE_KEY_ENABLED, value => {
  let enabled = true
  const v = value[CHROME_STORAGE_KEY_ENABLED]
  if (v != null) {
    enabled = v
  }
  if (enabled) {
    convert2Lgtm()
    timerId = setInterval(() => {
      convert2Lgtm()
    }, INTERVAL_MSEC)
  }
})

chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    switch (message.type) {
      case 'changeEnabled': {
        if (timerId) clearInterval(timerId)
        if (message.payload) {
          convert2Lgtm()
          timerId = setInterval(() => {
            convert2Lgtm()
          }, INTERVAL_MSEC)
        } else {
          convert2Favorite()
        }
      }
    }
  }
)

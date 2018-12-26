import { GAPI_URL, GAPI_SCRIPT_ID } from './contants'
import { createScriptTag } from './utils'

const registerYoutubeClient = (gapi, token, callback) => {
  gapi.load('client', () => {
    gapi.client.setApiKey(token)
    gapi.client.load('youtube', 'v3', callback)
  })
}

export const loadYoutubeAPI = (token) => {
  let gapi = window.gapi
  if(gapi !== undefined) {
    return new Promise((resolve) => {
      registerYoutubeClient(gapi, token, () => resolve(gapi))
    }
  })

  const googleScript = createScriptTag({ src: GAPI_URL, id: GAPI_SCRIPT_ID })
  return new Promise((resolve) => {
    googleScript.onload = () => {
      gapi = window.gapi
      return registerYoutubeClient(gapi, token, () => resolve(gapi)) 
    }
  })
}

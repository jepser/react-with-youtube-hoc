import { GAPI_URL, GAPI_SCRIPT_ID } from './contants'
import { createScriptTag } from './utils'

declare global {
  interface Window {
    gapi: any;
  }
}

const registerYoutubeClient = (gapi: any, token: string, callback: () => void) => {
  gapi.load('client', () => {
    gapi.client.setApiKey(token)
    gapi.client.load('youtube', 'v3', callback)
  })
}

export const loadYoutubeAPI = (token: string): Promise<any> => {
  let gapi: any = window.gapi
  if(gapi !== undefined) {
    return new Promise((resolve) => {
      registerYoutubeClient(gapi, token, () => resolve(gapi))
    })
  }  

  const googleScript = createScriptTag({ src: GAPI_URL, id: GAPI_SCRIPT_ID })
  return new Promise((resolve) => {
    googleScript.onload = () => {
      gapi = window.gapi
      return registerYoutubeClient(gapi, token, () => resolve(gapi)) 
    }
  })
}

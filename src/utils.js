import { GAPI_URL } from './contants'

const getScriptTags = () => {
  const scriptTags = document.getElementsByTagName('head')[0].childNodes
  const gapiEmbedScriptTags = [].filter.call(scriptTags, script => {
    return script.src === GAPI_URL
  })
  return gapiEmbedScriptTags
}

export const scriptTagExists = () => {
  const scriptTags = getScriptTags()

  return !!scriptTags.length
}

export const createGoogleScriptTag = () => {
  const googleScript = document.createElement('script')
  googleScript.src = GAPI_URL
  googleScript.id = 'gapi-youtube'
  googleScript.async = true
  googleScript.defer = true
  document.body.appendChild(googleScript)

  return googleScript
}

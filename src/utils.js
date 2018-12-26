const getScriptTags = (src) => {
  const scriptTags = document.getElementsByTagName('head')[0].childNodes
  const filteredScriptTags = [].filter.call(scriptTags, script => {
    return script.src === src
  })
  return filteredScriptTags
}

export const scriptTagExists = (src) => {
  const scriptTags = getScriptTags(src)

  return !!scriptTags.length
}

export const createScriptTag = ({ id, src }) => {
  const scriptTag = document.createElement('script')
  scriptTag.src = src
  scriptTag.id = id
  scriptTag.async = true
  scriptTag.defer = true
  document.body.appendChild(scriptTag)

  return scriptTag
}

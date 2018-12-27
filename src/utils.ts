const getScriptTags = (src: string): Array<HTMLScriptElement> => {
  const scriptTags = document.getElementsByTagName('head')[0].childNodes
  const filteredScriptTags = [].filter.call(scriptTags, (script: HTMLScriptElement) => {
    return script.src === src
  })
  return filteredScriptTags
}

export const scriptTagExists = (src: string): boolean => {
  const scriptTags = getScriptTags(src)

  return !!scriptTags.length
}

interface scriptTagParams {
  id: string;
  src: string;
}

export const createScriptTag = ({ id, src }: scriptTagParams): HTMLScriptElement => {
  const scriptTag = document.createElement('script')
  scriptTag.src = src
  scriptTag.id = id
  scriptTag.async = true
  scriptTag.defer = true
  document.body.appendChild(scriptTag)

  return scriptTag
}

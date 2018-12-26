import { Component } from 'react'
import { GAPI_URL } from './contants'
import { createGoogleScriptTag } from './utils'

function registerYoutubeClient = (gapi, token, callback) => {
  gapi.load('client', () => {
    gapi.client.setApiKey(token)
    gapi.client.load('youtube', 'v3', callback)
  })
}

function loadYoutubeAPI (token) {
  let gapi = window.gapi
  if(gapi !== undefined) {
    return new Promise((resolve) => {
      registerYoutubeClient(gapi, token, () => resolve(gapi))
    }
  })

  const googleScript = createGoogleScriptTag()
  return new Promise((resolve) => {
    googleScript.onload = () => {
      gapi = window.gapi
      return registerYoutubeClient(gapi, token, () => resolve(gapi)) 
    }
  })
}

const withYoutube = token => WrappedComponent => {
  return class extends Component {
    constructor () {
      super()
      this.state = {
        loaded: false,
        api: null
      }
    }

    componentDidMount () {
      loadYoutubeAPI(token).then((gapi) => {
        this.setState({
          loaded: true,
          api: gapi.client.youtube
        })
      })
    }

    render () {
      const {
        loaded,
        api
      } = this.state

      return loaded && <WrappedComponent {...this.props} youtubeApi={api} />
    }
  }
}

export default withYoutube

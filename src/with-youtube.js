import { Component } from 'react'
import { GAPI_URL } from './contants'
import { loadYoutubeAPI } from './youtube-api'

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

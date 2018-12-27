import * as React from 'react'
import { loadYoutubeAPI } from './youtube-api'

interface WithYoutubeState {
  loaded: boolean
  api: any
}

interface WithYoutubeProps {
  youtubeApi: any
}

const withYoutube = (token: string) => 
  <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class extends React.Component<P & WithYoutubeProps, WithYoutubeState> {
    state: WithYoutubeState = {
      loaded: false,
      api: null
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

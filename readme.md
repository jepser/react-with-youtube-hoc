# React with Youtube HOC

HOC that adds Youtube API as a prop.

## Install

```
yarn add react-with-youtube

npm install react-with-youtube --save
```

### Usage

``` js
import { Component } from 'react'
import withYoutube from 'react-with-youtube'

class ComponentWithApi extends Component {
  componentDidMount () {
    const request = this.props.youtubeApi.search.list({
      q: `Drop it like it's hot`,
      part: 'snippet',
      type: 'video'
    })

    request.then(({ result }) => {
      this.setState(() => {
        videos: result.items
      })
    })
  }
  render() {
    return (
      <ul>
        {this.state.videos.map(video => (
          <li>{video.snippet.title}</li>
        ))}
      </ul>
    )
  }
}

export default withYoutube(YOUTUBE_TOKEN)(ComponentWithApi)


```

import _ from 'lodash'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

const API_KEY = '<insert-youtube-api-key>';

class App extends Component {
    constructor(props) {
        super(props);
        
          this.state = {
              videos: [], 
              selectedVideo: null
          };

          this.videoSearch('tomate');
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300); // Throttle down calls
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                  videos={this.state.videos}
                  onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));

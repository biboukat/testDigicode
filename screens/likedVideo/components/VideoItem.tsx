import React, {PureComponent} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

interface VideoItemProps {
  url: string;
  isActive: boolean;
}

export class VideoItem extends PureComponent<VideoItemProps> {
  state = {
    loading: true,
  };

  onBuffer = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.url}} // Can be a URL or a local file.
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          style={styles.backgroundVideo}
          posterResizeMode={'contain'}
          paused={!this.props.isActive}
          controls={true}
        />

        {this.state.loading ? (
          <ActivityIndicator
            color={'red'}
            size={'large'}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    padding: 16,
    paddingBottom: 48,
    marginTop: 16,
  },
  backgroundVideo: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

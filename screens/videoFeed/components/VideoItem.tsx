import React, {PureComponent} from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
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
        <Text>{this.props.url}</Text>
        <Text>{`${this.props.isActive}`}</Text>
        {/* <Video
          source={{
            uri:
              'https://www.sampleposts.com/wp-content/uploads/2020/10/Never-Trust-Too-Much-Funny-Whatsapp-Status-Video.mp4?_=5',
          }} // Can be a URL or a local file.
          // ref={(ref) => {
          //   this.player = ref;
          // }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          posterResizeMode={'contain'}
          paused={true}
        />

        {this.state.loading ? (
          <ActivityIndicator
            style={[StyleSheet.absoluteFill, styles.activityIndicator]}
          />
        ) : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  activityIndicator: {},
});

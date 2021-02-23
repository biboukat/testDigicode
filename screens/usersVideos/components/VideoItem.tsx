import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

interface VideoItemProps {
  url: string;
  isActive: boolean;
}

export class VideoItem extends PureComponent<VideoItemProps> {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.url}}
          style={styles.backgroundVideo}
          resizeMode={'contain'}
          paused={!this.props.isActive}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
    padding: 32,
  },
  backgroundVideo: {
    flex: 1,
  },
});

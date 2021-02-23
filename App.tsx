import React from 'react';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';
import Video from 'react-native-video';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const videoError = (e) => {
    console.log('bla error', e);
  };

  const onBuffer = () => {
    console.log('bla onBuffer');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'blue', flex: 1}}>
        <Video
          source={{
            uri:
              'https://www.sampleposts.com/wp-content/uploads/2020/10/Never-Trust-Too-Much-Funny-Whatsapp-Status-Video.mp4?_=5',
          }} // Can be a URL or a local file.
          // ref={(ref) => {
          //   this.player = ref;
          // }} // Store reference
          onBuffer={onBuffer} // Callback when remote video is buffering
          onError={videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;

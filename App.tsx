import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';

import {VideoFeed} from './screens/videoFeed';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <VideoFeed />
    </View>
  );
};

export default App;

import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {VideoFeed} from './screens/videoFeed';
import {Camera} from './screens/camera';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={() => <View />} initialRouteName={'Home'}>
        <Tab.Screen name="Settings" component={Camera} />
        <Tab.Screen name="Home" component={VideoFeed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

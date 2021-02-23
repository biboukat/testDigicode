import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {VideoFeed} from './screens/videoFeed';
import {Camera} from './screens/camera';
import {UserVideos} from './screens/usersVideos';
import {UsersVideosContext, useUserVideos} from './Providers';
import {LikedVideo} from './screens/likedVideo';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator tabBar={() => <View />} initialRouteName={'VideoFeed'}>
      <Tab.Screen name={'Camera'} component={Camera} />
      <Tab.Screen name={'VideoFeed'} component={VideoFeed} />
    </Tab.Navigator>
  );
};

const App = () => {
  const usersVideosValue = useUserVideos();
  return (
    <UsersVideosContext.Provider value={usersVideosValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Tabs'} headerMode={'none'}>
          <Stack.Screen name={'Tabs'} component={Tabs} />

          <Stack.Screen name={'UserVideos'} component={UserVideos} />

          <Stack.Screen name={'LikedVideo'} component={LikedVideo} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersVideosContext.Provider>
  );
};

export default App;

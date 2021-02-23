import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

import {videoList} from '../../data/videos';
import {useUserVideos} from '../../Providers';
import {VideoItem} from './components/VideoItem';

const {height, width} = Dimensions.get('screen');

interface IItem {
  item: string;
  index: number;
}

export const LikedVideo = ({}) => {
  const isFocused = useIsFocused();
  const {likedVideo} = useUserVideos();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const renderItem = ({item, index}: IItem) => {
    return (
      <VideoItem url={item} isActive={index === activeItemIndex && isFocused} />
    );
  };
  return (
    <View style={styles.container}>
      <Carousel
        data={likedVideo}
        renderItem={renderItem}
        itemHeight={height}
        sliderHeight={height}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={width}
        vertical
        onSnapToItem={(index) => {
          setActiveItemIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 30,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

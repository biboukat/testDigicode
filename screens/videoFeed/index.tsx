import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {videoList} from '../../data/videos';
import {VideoItem} from './components/VideoItem';

const {height, width} = Dimensions.get('screen');

interface IItem {
  item: string;
  index: number;
}

export const VideoFeed = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const renderItem = ({item, index}: IItem) => {
    return <VideoItem url={item} isActive={index === activeItemIndex} />;
  };
  return (
    <View style={{flex: 1}}>
      <Carousel
        data={videoList}
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

import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {useUserVideos} from '../../Providers';
import {VideoItem} from './components/VideoItem';

const {height, width} = Dimensions.get('screen');

interface IItem {
  item: string;
  index: number;
}

export const UserVideos = () => {
  const {data} = useUserVideos();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const renderItem = ({item, index}: IItem) => {
    return <VideoItem url={item} isActive={index === activeItemIndex} />;
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
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
  container: {},
});

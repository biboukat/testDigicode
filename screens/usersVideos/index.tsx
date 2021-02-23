import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
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
    <View>
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

      {data.length > 0 ? (
        <View style={styles.count}>
          <View style={styles.countContainer}>
            <Text>{`${activeItemIndex + 1} / ${data.length}`}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  count: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  countContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
});

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

import {videoList} from '../../data/videos';
import {VideoItem} from './components/VideoItem';

const {height, width} = Dimensions.get('screen');

interface IItem {
  item: string;
  index: number;
}

export const VideoFeed = ({}) => {
  const navigation = useNavigation();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const onMyVideoPress = () => {
    navigation.navigate('UserVideos');
  };

  const renderItem = ({item, index}: IItem) => {
    return <VideoItem url={item} isActive={index === activeItemIndex} />;
  };
  return (
    <View style={styles.container}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onMyVideoPress}>
          <Text>{'my videos'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>{'liked videos'}</Text>
        </TouchableOpacity>
      </View>
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

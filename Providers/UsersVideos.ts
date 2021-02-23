import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'UserVideos';
const storageLikedVideoKey = 'storageLikedVideoKey';

interface UserVideos {
  data: string[];
  likedVideo: string[];
  saveVideo: (videeoLink: string) => void;
  likeVideo: (videeoLink: string) => void;
  unlikeVideo: (videeoLink: string) => void;
}

const usersVideosContextDefaultValue: UserVideos = {
  data: [],
  saveVideo: () => null,
  likedVideo: [],
  likeVideo: () => null,
  unlikeVideo: () => null,
};

export const UsersVideosContext = createContext<UserVideos>(
  usersVideosContextDefaultValue,
);

export const useUserVideos = (): UserVideos => {
  const [data, setData] = useState<string[]>([]);
  const [likedVideo, setLikedVideo] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(storageKey);
        const likedValue = await AsyncStorage.getItem(storageLikedVideoKey);
        if (value !== null) {
          setData(JSON.parse(value));
        }
        if (likedValue !== null) {
          setLikedVideo(JSON.parse(likedValue));
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const likeVideo = (videoLink: string) => {
    const newData = [videoLink, ...likedVideo];
    try {
      AsyncStorage.setItem(storageLikedVideoKey, JSON.stringify(newData));
    } catch (e) {
      // saving error
    }
    setLikedVideo(newData);
  };
  const unlikeVideo = (videoLink: string) => {
    const newData = likedVideo.filter((v) => v !== videoLink);
    try {
      AsyncStorage.setItem(storageLikedVideoKey, JSON.stringify(newData));
    } catch (e) {
      // saving error
    }
    setLikedVideo(newData);
  };

  const saveVideo = (videoLink: string) => {
    const newData = [videoLink, ...data];
    try {
      AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch (e) {
      // saving error
    }
    setData(newData);
  };

  return {
    data,
    saveVideo,
    likedVideo,
    likeVideo,
    unlikeVideo,
  };
};

import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'UserVideos';

interface UserVideos {
  data: string[];
  saveVideo: (videeoLink: string) => void;
}

const usersVideosContextDefaultValue: UserVideos = {
  data: [],
  saveVideo: () => null,
};

export const UsersVideosContext = createContext<UserVideos>(
  usersVideosContextDefaultValue,
);

export const useUserVideos = (): UserVideos => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(storageKey);
        if (value !== null) {
          setData(JSON.parse(value));
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

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
  };
};

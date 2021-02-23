import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {RNCamera, Constants} from 'react-native-camera';

export const Camera = () => {
  const isFocused = useIsFocused();
  const [isRecording, setRecording] = useState<boolean>(false);
  const [type, setType] = useState<keyof Constants['Type']>(
    RNCamera.Constants.Type.front,
  );

  const startRecording = (camera: RNCamera) => async () => {
    if (camera) {
      try {
        const promise = camera.recordAsync({maxDuration: 10});

        if (promise) {
          setRecording(true);
          const data = await promise;
          console.warn('takeVideo', data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setRecording(false);
      }
    }
  };

  const stopRecording = (camera: RNCamera) => async () => {
    if (camera) {
      setRecording(false);
      try {
        camera.stopRecording();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const changeCameraType = () => {
    if (type === RNCamera.Constants.Type.back) {
      setType(RNCamera.Constants.Type.front);
    } else {
      setType(RNCamera.Constants.Type.back);
    }
  };

  if (isFocused) {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={type}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            if (status === 'NOT_AUTHORIZED') {
              return (
                <View style={styles.textContainer}>
                  <Text style={styles.infoText}>
                    {'no permission for camera or audio recording'}
                  </Text>
                </View>
              );
            }
            if (status === 'PENDING_AUTHORIZATION') {
              return (
                <View style={styles.textContainer}>
                  <Text style={styles.infoText}>{'waiting...'}</Text>
                </View>
              );
            }
            return (
              <View style={styles.buttonContainer}>
                {!isRecording ? (
                  <TouchableOpacity
                    onPress={changeCameraType}
                    style={styles.capture}>
                    <Text style={styles.buttonText}>
                      {type === RNCamera.Constants.Type.back ? 'front' : 'back'}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  onPress={
                    isRecording ? stopRecording(camera) : startRecording(camera)
                  }
                  style={styles.capture}>
                  <Text style={styles.buttonText}>
                    {isRecording ? 'Stop' : 'Start'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>

        {isRecording ? <View style={styles.recordingIndicator} /> : null}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  pendingView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recordingIndicator: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 20,
    right: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {usedImages} from '../../assets/images';
import SettingsScreen from '../settingsScreen';

export const imageStatus = {
  constant: 'constant',
  flipping: 'flipping',
  result: 'result',
};
import EncryptedStorage from 'react-native-encrypted-storage';

const HomeScreen = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState(null);
  const rotation = useRef(new Animated.Value(0)).current;
  const [coinStatus, setcoinStatus] = useState(imageStatus.default);
  const [settingsModalVisible, setsettingsModalVisible] = useState(false);
  const [selectedImageUrl, setselectedImageUrl] = useState('');
  const coinRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const flipTheCoin = () => {
    if (isFlipping) return;
    setcoinStatus(imageStatus.constant);
    setIsFlipping(true);
    setFlipResult(null);

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      {iterations: 10},
    ).start();

    setTimeout(() => {
      rotation.stopAnimation(() => {
        const result = Math.random() < 0.5;
        console.warn(result ? 'true' : 'false');

        setFlipResult(result);
        setcoinStatus(imageStatus.result);
        setIsFlipping(false);
        rotation.setValue(0);
      });
    }, 3000);
  };
  const showSettingsPage = () => {
    setsettingsModalVisible(!settingsModalVisible);
  };
  useEffect(() => {
    getSelectedImage();
  }, []);

  const getSelectedImage = async () => {
    try {
      const selectedImage = await EncryptedStorage.getItem('selected_image');
      setselectedImageUrl(selectedImage);
    } catch (error) {
      console.log('storing error', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ===========settings modal=========== */}
      <SettingsScreen
        settingsModalVisible={settingsModalVisible}
        setsettingsModalVisible={setsettingsModalVisible}
      />
      <StatusBar backgroundColor={'#333'} barStyle={'light-content'} />
      <TouchableOpacity onPress={flipTheCoin} disabled={isFlipping}>
        <Animated.View
          style={[
            styles.imageContainer,
            {transform: [{rotateX: coinRotation}]},
          ]}>
          {coinStatus === imageStatus?.result ? (
            <View>
              {flipResult ? (
                <>
                  {selectedImageUrl !== '' ? (
                    <Image
                      source={{uri: selectedImageUrl}}
                      style={styles.image}
                    />
                  ) : (
                    <Image source={usedImages.yesImage} style={styles.image} />
                  )}
                </>
              ) : (
                <Image source={usedImages.noImage} style={styles.image} />
              )}
            </View>
          ) : (
            <Image source={usedImages.constant} style={styles.image} />
          )}
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fixedBtn} onPress={showSettingsPage}>
        <Text style={styles.fixedBtnText}>Choose YES image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

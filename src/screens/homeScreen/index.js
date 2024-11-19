import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {usedImages} from '../../assets/images';

export const imageStatus = {
  constant: 'constant',
  flipping: 'flipping',
  result: 'result',
};

const HomeScreen = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState(null);
  const rotation = useRef(new Animated.Value(0)).current;
  const [coinStatus, setcoinStatus] = useState(imageStatus.default);

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#333'} barStyle={'light-content'} />
      <TouchableOpacity onPress={flipTheCoin} disabled={isFlipping}>
        <Animated.View
          style={[
            styles.imageContainer,
            {transform: [{rotateX: coinRotation}]},
          ]}>
          {coinStatus === imageStatus?.result ? (
            <Image
              source={flipResult ? usedImages.yesImage : usedImages.noImage}
              style={styles.image}
            />
          ) : (
            <Image source={usedImages.constant} style={styles.image} />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

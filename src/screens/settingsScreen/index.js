import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {usedImages} from '../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';
import EncryptedStorage from 'react-native-encrypted-storage';

export const imageStatus = {
  constant: 'constant',
  flipping: 'flipping',
  result: 'result',
};

const SettingsScreen = props => {
  const {settingsModalVisible, setsettingsModalVisible} = props;
  const [choosenImage, setchoosenImage] = useState('');
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('selectedImage', image);
      setchoosenImage(image?.path);
    });
  };
  const updateNow = async () => {
    try {
      await EncryptedStorage.setItem('selected_image', choosenImage);
    } catch (error) {
     console.log("storing error",error);
    }
    setsettingsModalVisible(!settingsModalVisible);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={settingsModalVisible}
      onRequestClose={() => {
        setsettingsModalVisible(!settingsModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'#333'} barStyle={'light-content'} />
          <TouchableOpacity onPress={chooseImage}>
            <View style={[styles.imageContainer]}>
              {choosenImage !== '' ? (
                <Image source={{uri: choosenImage}} style={styles.image} />
              ) : (
                <Image source={usedImages.constant} style={styles.image} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fixedBtn} onPress={updateNow}>
            <Text style={styles.fixedBtnText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsScreen;

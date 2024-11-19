import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  imageContainer: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.5,
  },
});
export default styles;

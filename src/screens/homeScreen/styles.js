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
  // ------------------
  fixedBtn: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 50,
  },
  fixedBtnText: {
    color: 'black',
  },
});
export default styles;

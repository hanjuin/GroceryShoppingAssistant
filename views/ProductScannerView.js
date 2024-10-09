import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const ProductScannerView = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [barcodeResult, setBarcodeResult] = useState(null);

  const selectImageFromLibrary = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setSelectedImage(uri);
        const base64String = await convertImageToBase64(uri);
        processBarcodeFromImage(base64String);
      }
    });
  };

  const convertImageToBase64 = async (imageUri) => {
    try {
      const base64String = await RNFS.readFile(imageUri.replace('file://', ''), 'base64');
      return base64String;
    } catch (error) {
      console.error('Failed to convert image to base64: ', error);
    }
  };

  const processBarcodeFromImage = async (base64Image) => {

    try {

      console.log('Processing barcode from image:', base64Image);
      Alert.alert('Barcode Processing', 'Image successfully converted to base64.');
    } catch (error) {
      console.error('Barcode detection failed: ', error);
      Alert.alert('Error', 'Failed to detect barcode from the image.');
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>ProductScannerView</Text>
      <Button title="Select Photo From Library" onPress={selectImageFromLibrary} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={style.preview} />}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ProductScannerView;

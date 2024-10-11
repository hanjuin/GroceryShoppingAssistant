import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import * as ProductController from '../controllers/ProductController';

const ProductScannerView = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        const actualBarcode = await handleImageProcessing(base64String);
        if (actualBarcode) {
          const OpenFoodAPIResponse = await ProductController.handleOpenFoodAPI(actualBarcode);
          await ProductController.insertProductData(OpenFoodAPIResponse);
          navigation.navigate('Product Details', { product: OpenFoodAPIResponse });
        }
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

  const handleImageProcessing = async (base64String) => {
    try {
      const barcodeData = await ProductController.handleBarcodeProcessing(base64String);
      const upcARegex = /\d{12,13}/;
      const exactMatch = /^\d{12,13}$/;
      const trimData = barcodeData.replace(/\s+/g, ''); // Remove spaces from the barcode data
      const actualBarcode = trimData.match(upcARegex);
      if (actualBarcode && exactMatch.test(actualBarcode[0])) {
        Alert.alert('Barcode Found', `Barcode value: ${actualBarcode[0]}`);
        return actualBarcode[0];
      } else {
        Alert.alert('No Barcode Found', 'No barcode was detected in the image.');
      }
    } catch (error) {
      console.error('Error:', error);
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

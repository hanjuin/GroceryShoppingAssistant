import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import * as ProductController from '../controllers/ProductController';

const ProductScannerView = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  //Function to access photo library
  const selectImageFromLibrary = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      handleImageSelection(response);
    });
  };

  //Function to access camera
  const captureImageWithCamera = async () => {
    launchCamera({ mediaType: 'photo', cameraType: 'back' }, async (response) => {
      handleImageSelection(response);
    });
  };

  //Function to process the image to retrieve barcode
  const handleImageSelection = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.error('ImagePicker error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const { uri } = response.assets[0];
      setSelectedImage(uri);
      const base64String = await convertImageToBase64(uri);
      const actualBarcode = await handleImageProcessing(base64String); //function to retrieve barcode from image
      if (actualBarcode) {
        const OpenFoodAPIResponse = await ProductController.handleOpenFoodAPI(actualBarcode); // Retrieve product info from OpenFoodAPI
        // Check if the product is found in the OpenFoodAPI response
        if (OpenFoodAPIResponse != null) {
            await ProductController.insertProductData(OpenFoodAPIResponse);
            navigation.navigate('Product Details', { product: OpenFoodAPIResponse });
        } else {
            console.warn('Product not found for the given barcode.');
           Alert.alert('Product not found in the database. Please try again with a different product.');
        }
    } else {
        console.warn('No barcode detected in the image.');
        Alert.alert('No barcode was detected in the image. Please try again.');
    }
    }
  };

  //concert image to base64 for image processing
  const convertImageToBase64 = async (imageUri) => {
    try {
      const base64String = await RNFS.readFile(imageUri.replace('file://', ''), 'base64');
      return base64String;
    } catch (error) {
      console.error('Failed to convert image to base64: ', error);
    }
  };

  //function to retrieve barcode from image
  const handleImageProcessing = async (base64String) => {
    try {
      const barcodeData = await ProductController.handleBarcodeProcessing(base64String);
      const upcARegex = /\d{12,13}/; //regex to extract barcode from processed data
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
      <TouchableOpacity style={style.button} onPress={captureImageWithCamera}>
        <Text style={style.buttonText}>Capture Photo with Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.button} onPress={selectImageFromLibrary}>
        <Text style={style.buttonText}>Select Photo From Library</Text>
      </TouchableOpacity>
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
  button: {
    padding: 15,
    backgroundColor: '#fdb813',
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    margin:10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#000',
  },
});

export default ProductScannerView;

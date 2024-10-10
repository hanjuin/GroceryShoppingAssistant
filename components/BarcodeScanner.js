import { NativeModules } from 'react-native';
const { BarcodeScannerModule } = NativeModules;

export const scanBarcode = async (imageUri) => {
  try {
    const barcodeData = await BarcodeScannerModule.scanBarcodeFromUri(imageUri);
    console.log('Scanned Barcode Data:', barcodeData);
    return barcodeData;
  } catch (error) {
    console.error('Error scanning barcode:', error);
  }
};

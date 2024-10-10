import { processBarcodeFromImage, fetchOpenAIResponse } from '../models/ProductModel';

export const handleBarcodeProcessing = async (base64Image) => {
  try {
    const barcodeData = await processBarcodeFromImage(base64Image);
    return barcodeData;
  } catch (error) {
    console.error('Error in barcode processing:', error);
    throw error;
  }
};

export const handleOpenAIProcessing = async (barcode) => {
    try {
      const OpenAIResponse = await fetchOpenAIResponse(barcode);
      return OpenAIResponse;
    } catch (error) {
      console.error('Error in OpenAIResponse processing:', error);
      throw error;
    }
  };

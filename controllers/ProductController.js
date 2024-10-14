import {processBarcodeFromImage, fetchOpenAIResponse, fetchOpenFoodFactsData } from '../models/ProductModel';

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

export const handleOpenFoodAPI = async (barcode) => {
    try {
      const OpenAIResponse = await fetchOpenFoodFactsData(barcode);
      return OpenAIResponse;
    } catch (error) {
      console.error('Error in OpenFoodDacts processing:', error);
      throw error;
    }
};

export const insertProductData = async (productData) => {
    try {
        const response = await fetch('http://10.0.2.2:3000/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
        const result = await response.json();
        console.log('Server Response:', result);
      } catch (error) {
        console.error('Error adding product to server:', error);
    }
};

export const getProductByBarcode = async (barcode) => {
    try {
        const response = await fetch(`http://10.0.2.2:3000/get-product/${barcode}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching product from server:', error);
      }
};

export const getAllProduct = async () => {
  try {
    const response = await fetch('http://10.0.2.2:3000/get-products');
    if (!response.ok) {
      throw new Error('No product added');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product from server:', error);
    return []; // Return an empty array if an error occurs
  }
};

import {processBarcodeFromImage, fetchOpenFoodFactsData } from '../models/ProductModel';

//function to handle barcode processing, fetching base64image data and process the data using google vision API
export const handleBarcodeProcessing = async (base64Image) => {
  try {
    const barcodeData = await processBarcodeFromImage(base64Image);
    return barcodeData;
  } catch (error) {
    console.error('Error in barcode processing:', error);
    throw error;
  }
};

//function to retrieve product data from openfoodapi
export const handleOpenFoodAPI = async (barcode) => {
    try {
      const OpenAIResponse = await fetchOpenFoodFactsData(barcode);
      return OpenAIResponse;
    } catch (error) {
      console.error('Error in OpenFoodDacts processing:', error);
      throw error;
    }
};

//function to add product data to database
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

//function to get product from database using barcode
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

//function to get all product from database
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
    return [];
  }
};

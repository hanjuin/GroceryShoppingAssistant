import { VISION_API_KEY } from '@env';
import { OPEN_AI_API_KEY } from '@env';

export const processBarcodeFromImage = async (base64Image) => {
    try {
      const apiKey = VISION_API_KEY;
      const requestPayload = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'TEXT_DETECTION', // Use BARCODE_DETECTION if available
                maxResults: 5,
              },
            ],
          },
        ],
      };
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, response.statusText, errorText);
        return null; // Return null on error
      }
      const result = await response.json();
      const barcodeData = result.responses && result.responses[0] && result.responses[0].textAnnotations
        ? result.responses[0].textAnnotations[0]?.description
        : null;
      return barcodeData; // Properly return the barcode value or null if not found
    } catch (error) {
      console.error('Error in handleBarcodeProcessing:', error);
      return null; // Return null on error
    }
  };

  export const fetchOpenAIResponse = async (barcodeData) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Updated to use the new model gpt-4o gpt-3.5-turbo
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `What is the product information for the barcode: ${barcodeData}?` },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });
      const data = await response.json();
      // Check if the response contains the expected data
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim();
      } else {
        console.error('Unexpected response format:', data);
        return 'No valid response from OpenAI.';
      }
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      return 'Failed to fetch data from OpenAI.';
    }
  };

  export const fetchOpenFoodFactsData = async (barcode) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 1) {
        const productData = data.product;
        return productData;
      } else {
        console.warn('Product not found in the Open Food Facts database.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from Open Food Facts:', error);
      return null;
    }
  };

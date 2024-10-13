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

  export const fetchOpenAIResponse = async (imageURL) => {
    const prompt = imageURL +   '\nFor the given product, output the following values as an array in the exact format [recyclability_rating, material, carbon_footprint_value_with_unit, overall_product_rating, reuse_rate, decomposition_time_in_years, toxicity]. Ensure each value is provided correctly and only once:\n1. Recyclability rating (out of 5) as a number.\n2. Material name as a string.\n3. Estimated carbon footprint (output the numeric value followed by the unit "kg CO2e").\n4. Overall product rating (out of 10) based on recyclability, material, and carbon footprint.\n5. Reuse rate as a percentage (output only the numeric value).\n6. Decomposition time in years (output only the numeric value).\n7. Toxicity: output "Yes" or "No".';
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Updated to use the new model gpt-4o gpt-3.5-turbo gpt-4o-turb
          messages: [
            { role: 'user', content: prompt },
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
        // Assuming fetchOpenAIResponse returns a JSON string, you can parse it before storing it.
        const AIresult = await fetchOpenAIResponse(productData.image_url);

        // Ensure AIresult is parsed to an object if it's a JSON string
        const parsedAIResult = typeof AIresult === 'string' ? JSON.parse(AIresult) : AIresult;

        // Add AI result to the product data as an object
        productData.AIresult = parsedAIResult;
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



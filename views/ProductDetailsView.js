import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ProductDetailsView = ({ route }) => {
  const { product } = route.params; // Access the product details passed via navigation

  // Function to render nutritional info in a more readable format
  const renderNutritionalInfo = (nutriments) => {
    const keys = Object.keys(nutriments);
    return keys.map((key, index) => {
      return (
        <View key={index} style={styles.nutrientRow}>
          <Text style={styles.nutrientKey}>{key.replace(/_/g, ' ')}:</Text>
          <Text style={styles.nutrientValue}>{nutriments[key]}</Text>
        </View>
      );
    });
  };

  // Function to render ingredients as a list
  const renderIngredients = (ingredientsText) => {
    if (!ingredientsText) {return <Text style={styles.cell}>N/A</Text>;}
    const ingredientsList = ingredientsText.split(','); // Split ingredients by commas
    return ingredientsList.map((ingredient, index) => (
      <Text key={index} style={styles.ingredientItem}>
        {ingredient.trim()}
      </Text>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {product.image_url && <Image source={{ uri: product.image_url }} style={styles.productImage} />}
        <Text style={styles.title}>{product.product_name || 'Product Details'}</Text>
        {/* Table for Product Details */}
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Brand:</Text>
            <Text style={styles.cell}>{product.brands || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Ingredients:</Text>
            <View style={styles.cell}>{renderIngredients(product.ingredients_text)}</View>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Recyclability:</Text>
            <Text style={styles.cell}>{product.AIresult[0] + ' out of 5' || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Material Name:</Text>
            <Text style={styles.cell}>{product.AIresult[1] || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Estimated Carbon Footprint:</Text>
            <Text style={styles.cell}>{product.AIresult[2] || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Reuse rate as a percentage:</Text>
            <Text style={styles.cell}>{product.AIresult[4] + '%' || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Decomposition time in years:</Text>
            <Text style={styles.cell}>{product.AIresult[5] + ' years' || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Toxicity:</Text>
            <Text style={styles.cell}>{product.AIresult[6] || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitle}>Overall Product Rating:</Text>
            <Text style={styles.cell}>{product.AIresult[3] + ' out of 10' || 'N/A'}</Text>
          </View>

          {/* <View style={styles.row}>
            <Text style={styles.cellTitle}>Nutritional Info:</Text>
            <View style={styles.nutritionalInfoContainer}>
              {product.nutriments ? renderNutritionalInfo(product.nutriments) : <Text>N/A</Text>}
            </View>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'contain',
  },
  table: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cellTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cell: {
    flex: 2,
    fontSize: 16,
  },
  ingredientItem: {
    fontSize: 14,
    marginBottom: 2,
  },
  nutritionalInfoContainer: {
    flex: 2,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  nutrientKey: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  nutrientValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});

export default ProductDetailsView;

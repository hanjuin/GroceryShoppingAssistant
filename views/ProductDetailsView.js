import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductDetailsView = ({ route }) => {
  const { product } = route.params; // Access the product details passed via navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.product_name || 'Product Details'}</Text>
      <Text style={styles.text}>Brand: {product.brands || 'N/A'}</Text>
      <Text style={styles.text}>Ingredients: {product.ingredients_text || 'N/A'}</Text>
      {product.image_url && <Image source={{ uri: product.image_url }} style={styles.productImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'contain',
  },
});

export default ProductDetailsView;

import React, {useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAllProduct } from '../controllers/ProductController';
import { useFocusEffect } from '@react-navigation/native';

const ProductListView = ({ navigation }) => {
    const [scannedProducts, setScannedProducts] = useState([]);

    // function to fetch all products
    const fetchProducts = async () => {
      const products = await getAllProduct();
      setScannedProducts(products);
    };

    // useFocusEffect to update the product list every time the screen is focused
    useFocusEffect(
      useCallback(() => {
          fetchProducts(); // Fetch products when the screen comes into focus
      }, [])
    );

    // Render each product in the list
    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('Product Details', { product: item })}
        >
            <Text style={styles.productName}>{item.product_name || 'Unnamed Product'}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={scannedProducts}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text>No products scanned yet</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fdb813',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default ProductListView;

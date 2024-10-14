import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAllProduct } from '../controllers/ProductController';

const ProductListView = ({ navigation }) => {
    const [scannedProducts, setScannedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProduct(); // Wait for products to be fetched
            setScannedProducts(products); // Set fetched products to state
        };

        fetchProducts(); // Call the async function inside useEffect
    }, []);

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
            {/* <Text style={styles.title}>Scanned Products</Text> */}
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
    color: '#333',
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

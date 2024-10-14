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
            <Text style={styles.title}>Scanned Products</Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
  },
});

export default ProductListView;

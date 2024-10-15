import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductDetailsView = ({ route, navigation }) => {
  const { product } = route.params;

  // Function to render ingredients as a list
  const renderIngredients = (ingredientsText) => {
    if (!ingredientsText) {
      return <Text style={styles.cell}>N/A</Text>;
    }
    const ingredientsList = ingredientsText.split(','); // Split ingredients by commas
    return ingredientsList.map((ingredient, index) => (
      <Text key={index} style={styles.cell}>
        {ingredient.trim()}
      </Text>
    ));
  };

  // Function to create the backbutton
  const headerLeftComponent = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Product List')}>
      <MaterialIcons name="arrow-back" size={28} style={styles.backButton} color="#333" />
    </TouchableOpacity>
  );

  // set the hamburger button to backbutton
  useEffect(() => {
    navigation.setOptions({
      headerLeft: headerLeftComponent,
    });
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: product.image_url }}
          blurRadius={2}
          style={styles.backgroundImage}
        >
          <Image
            source={{ uri: product.image_url }}
            style={styles.productImage}
          />
        </ImageBackground>
        </View>
        <View style={styles.table}>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Product Name:</Text>
            <Text style={styles.cell}>{product.product_name || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Brand:</Text>
            <Text style={styles.cell}>{product.brands || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Ingredients:</Text>
            <View style={styles.cell}>{renderIngredients(product.ingredients_text)}</View>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Recyclability:</Text>
            <Text style={styles.cell}>{product.AIresult[0] + ' out of 5' || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Material Name:</Text>
            <Text style={styles.cell}>{product.AIresult[1] || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Estimated Carbon Footprint:</Text>
            <Text style={styles.cell}>{product.AIresult[2] + ' CO2e' || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Reuse rate as a percentage:</Text>
            <Text style={styles.cell}>{product.AIresult[4] + '%' || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Decomposition time in years:</Text>
            <Text style={styles.cell}>{product.AIresult[5] + ' years' || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Toxicity:</Text>
            <Text style={styles.cell}>{product.AIresult[6] || 'N/A'}</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.cellTitle}>Overall Product Rating:</Text>
            <Text style={styles.cell}>{product.AIresult[3] + ' out of 10' || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: screenWidth,
  },
  table: {
    marginTop: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#fdb813',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cellTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  cell: {
    flex: 2,
    fontSize: 16,
    color: '#000',
  },
  ingredientItem: {
    fontSize: 14,
    marginBottom: 2,
  },
  backButton: {
    paddingLeft: 10,
    color:'#000',
  },
});

export default ProductDetailsView;

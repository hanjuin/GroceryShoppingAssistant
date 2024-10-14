import React from "react";
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeView = ({ navigation }) => {  // Ensure navigation is destructured

    const handleNavigation = (view) => {
        navigation.navigate(view);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Product Scanner')}>
                    <Text style={styles.buttonText}>Scan Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Product List')}>
                    <Text style={styles.buttonText}>Product List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Shopping List')}>
                    <Text style={styles.buttonText}>Shopping Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
       // marginTop: -40,
    },
    button: {
        width: '50%',
        padding: 15,
        backgroundColor: '#fdb813',
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
        margin:10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default HomeView;

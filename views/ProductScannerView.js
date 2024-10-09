import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProductScannerView = () =>{
    return(
        <View style={style.container}>
            <Text style = {style.title}>
                ProductScannerView
            </Text>
        </View>
    );
};

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
});

export default ProductScannerView;

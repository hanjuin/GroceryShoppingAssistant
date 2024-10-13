import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const HomeView = () =>{
    return(
        <View style={style.container}>
            <Text style = {style.title}>
                Welcome to the Eco-Friendly Shopping Assistant
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

export default HomeView;

/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('List');
        }, 2000);
    }, []);
    return (
        <View style={styles.container}>
            <Animatable.Text
                style={styles.text}
                animation="fadeInDownBig"
                duration={2000}>
                Task Management App
            </Animatable.Text>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
});
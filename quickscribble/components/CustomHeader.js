import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CustomHeader({ title }) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.circle}>
            <Text style={styles.headerTitle}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 16,
        position: 'relative',
    },
    circle: {
        width: 150,
        height: 50,
        backgroundColor: '#65558F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#6D4C41',
        borderWidth: 2,
        marginTop: 100,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute',
    },
});

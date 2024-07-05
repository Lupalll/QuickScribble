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
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    circle: {
        backgroundColor: '#65558F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#6D4C41',
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 24,
        alignSelf: 'flex-start',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

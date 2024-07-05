import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListItem from './ListItems';

const RenderItem = ({ item, onDelete, onFav }) => {
    return (
        <View style={styles.container}>
            <ListItem
                item={{ ...item, title: item.title.slice(0, 25) }}
                onDelete={onDelete}
                onFav={onFav}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5, // Adjust margin as needed
    },
});

export default RenderItem;

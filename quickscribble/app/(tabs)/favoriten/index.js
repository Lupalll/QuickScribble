import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Space from '../../../components/Space';
import { useDeleteItem } from '../../../components/DeleteItem';
import { useFavItem } from '../../../components/FavItem';
import RenderItem from '../../../components/RenderItem';

export default function Favorites() {
    const [items, setItems] = useState([]);
    const { getItem, setItem } = useAsyncStorage("myItems");
    const filteredItems = items.filter(item => item.favourited);
    
    // Load items from storage on focus
    useFocusEffect(
        useCallback(() => {
            const loadItems = async () => {
                const storedItems = await getItem();
                if (storedItems) {
                    setItems(JSON.parse(storedItems));
                }
            };
            loadItems();
        }, [])
    );
    
    // Delete item functionality
    const onDeleteItem = useDeleteItem(items, setItems);
    
    // Favorite item functionality
    const onFavItem = useFavItem(items, setItems);
    
    // Render each item with limited title using RenderItem component
    const renderItem = ({ item }) => (
        <RenderItem
            item={item}
            onDelete={() => onDeleteItem(item)}
            onFav={() => onFavItem(item)}
        />
    );

    // Display message when no favorites
    if (filteredItems.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyMessage}>No favourites found</Text>
                <StatusBar style="auto" />
            </View>
        );
    }

    // Render list of favorite items
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={filteredItems}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Space height={5} />}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        alignSelf: "stretch",
        marginTop: 20,
    },
    emptyMessage: {
        fontSize: 24,
        color: 'gray',
        marginBottom: 100,
    },
});

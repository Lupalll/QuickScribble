import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import ListItem from '../../../components/ListItems';
import Space from '../../../components/Space';
import { useFavItem } from '../../../components/FavItem';
import { useDeleteItem } from '../../../components/DeleteItem';

export default function Notes() {
    const [items, setItems] = useState([]);
    const { getItem } = useAsyncStorage("myItems");

    // Laden der Notizen beim Fokussieren der Komponente
    useFocusEffect(
        useCallback(() => {
            const loadItems = async () => {
                try {
                    const storedItems = await getItem();
                    if (storedItems) {
                        setItems(JSON.parse(storedItems));
                    } else {
                        setItems([]);
                    }
                } catch (error) {
                    console.error('Error loading notes:', error);
                }
            };

            loadItems();
        }, [getItem])
    );

    // Funktionen für das Löschen und Favorisieren von Notizen
    const onDeleteItem = useDeleteItem(items, setItems);
    const onFavItem = useFavItem(items, setItems);

    // Render-Funktion für jedes Listenelement
    const renderItem = ({ item }) => {
        return (
            <ListItem
                item={{ ...item, title: item.title.slice(0, 25) }}
                onDelete={() => onDeleteItem(item)}
                onFav={() => onFavItem(item)}
            />
        );
    };

    // Anzeige, wenn keine Notizen vorhanden sind
    if (items.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.centeredContainer}>
                    <Text style={styles.emptyMessage}>You've got no notes</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }

    // Ansonsten, wenn Notizen vorhanden sind, zeige sie in einer FlatList an
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    emptyMessage: {
        fontSize: 24,
        color: 'gray',
    },
    list: {
        paddingTop: 20,
    },
});

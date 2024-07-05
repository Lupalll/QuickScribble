import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import ListItem from '../../../components/ListItems';
import ItemSeparator from '../../../components/ItemSeparator';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View, Text } from 'react-native';
import Space from '../../../components/Space';

export default function Notes() {
    const [items, setItems] = useState([]);
    const { getItem, setItem } = useAsyncStorage("myItems");

    useFocusEffect(
        React.useCallback(() => {
            const loadItems = async () => {
                const storedItems = await getItem();
                if (storedItems) {
                    setItems(JSON.parse(storedItems));
                }
            };

            loadItems();
        }, [])
    );

    const onDeleteItem = (item) => {
        const updatedItems = items.filter((i) => i.id !== item.id);
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const onFavItem = (item) => {
        const updatedItems = items.map((i) => (
            i.id === item.id ? { ...i, favourited: !i.favourited } : i
        ));
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const renderItem = ({ item }) => {
        return (
            <ListItem
                item={{ ...item, title: item.title.slice(0, 25) }}
                onDelete={onDeleteItem}
                onFav={onFavItem}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Link href={{ pathname: 'search' }} asChild>
                    <TouchableOpacity style={styles.search}>
                        <Ionicons
                            size={28}
                            name="search-outline"
                            color="black"
                        />
                    </TouchableOpacity>
                </Link>
            </View>
            <FlatList
                style={styles.list}
                data={items}
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        backgroundColor: '#F5F5F5',
        position: 'absolute',
        top: -45,
        right: 16
    },
    list: {
        paddingTop: 20,
    },
    search: {
    },
    text: {
        position: 'relative',
        left: 20
    }
});

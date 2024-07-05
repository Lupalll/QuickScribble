import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from '@react-navigation/native';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ListItem from '../../../components/ListItems';
import Space from '../../../components/Space';

// Importe und andere Teile des Codes...

export default function Favorites() {
    const [items, setItems] = useState([]);
    const { getItem, setItem } = useAsyncStorage("myItems");
    const filteredItems = items.filter(item => item.favourited);
    
    /* holt die Items aus dem Storage */
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
    
    /* Funktion für das Löschen eines Items */
    const onDeleteItem = (item) => {
        Alert.alert(
            'Eintrag löschen',
            'Bist du dir sicher, dass du diesen Eintrag löschen möchtest?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteEntry(item), style: 'destructive' },
            ]
        );
    };

    const deleteEntry = (item) => {
        const updatedItems = items.filter((i) => i.id !== item.id);
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    /* Funktion für die Favorisierung eines Items */
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
    
    /* renderItem Funktion mit begrenztem Titel */
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
    }
});

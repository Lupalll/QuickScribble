import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import ListItem from '../../../components/ListItems';
import ItemSeparator from '../../../components/ItemSeparator';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
    const [items, setItems] = useState([]);
    const { getItem, setItem } = useAsyncStorage("myItems");
    const filteredItems = items.filter(item => item.favourited)
    

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
        const updatedItems = items.filter((i) => i.id !== item.id);
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    };

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
    

    /* anzeigen der Favoriten<s */
    return (
        
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                data={filteredItems}
                renderItem={({ item }) => (
                    <ListItem item={item} onDelete={onDeleteItem} onFav={onFavItem}/>
                )}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        alignSelf: "stretch"
    }
});
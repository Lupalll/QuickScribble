import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputField from "../components/InputField";
import AppButton from "../components/AppButton";
import { randomUUID } from 'expo-crypto';
import ListItem from "../components/ListItems";
import ItemSeparator from "../components/ItemSeparator";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
    const [newItemText, setNewItemText] = useState("");
    const [items, setItems] = useState([]);

    const { getItem, setItem } = useAsyncStorage("myItems");

    useEffect(() => {
        const loadItems = async () => {
            const storedItems = await getItem();
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            } else {
                setItems([]);
            }
        };

        loadItems();
    }, []);

    const onChangeText = (text) => {
        setNewItemText(text);
    };

    const onSaveButtonPress = () => {
        if (newItemText.trim() !== "") {
            const newItem = {
                id: randomUUID(),
                text: newItemText.trim(),
                completed: false,
            };
            const updatedItems = [...items, newItem];
            setItem(JSON.stringify(updatedItems))
                .then(() => {
                    setItems(updatedItems);
                    setNewItemText("");
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

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

    const onCheckItem = (item) => {
        const updatedItems = items.map((i) => (
            i.id === item.id ? { ...i, completed: !i.completed } : i
        ));
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                data={items}
                renderItem={({ item }) => (
                    <ListItem item={item} onCheck={onCheckItem} onDelete={onDeleteItem} />
                )}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
            <View>
                <InputField placeholder="Item eingeben..." value={newItemText} onChangeText={onChangeText} />
                <AppButton onPress={onSaveButtonPress}>Save</AppButton>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
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
        alignSelf: "stretch"
    }
});

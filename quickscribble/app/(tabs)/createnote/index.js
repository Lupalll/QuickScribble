import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputField from '../../../components/InputField';
import AppButton from '../../../components/AppButton';
import { randomUUID } from 'expo-crypto';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import InputTitle from '../../../components/InputTitle';

export default function CreateNote() {
    const [newItemText, setNewItemText] = useState("");
    const [newItemTitle, setNewItemTitle] = useState("");
    const { getItem, setItem } = useAsyncStorage("myItems");

    const onChangeText = (text) => {
        setNewItemText(text);
    };

    const onChangeTitle = (title) => {
        setNewItemTitle(title);
    };

    const onSaveButtonPress = async () => {
        if (newItemTitle.trim() !== "" && newItemText.trim() !== "") {
            const newItem = {
                id: randomUUID(),
                title: newItemTitle.trim(),
                text: newItemText.trim(),
                completed: false,
            };
            const storedItems = await getItem();
            const items = storedItems ? JSON.parse(storedItems) : [];
            const updatedItems = [...items, newItem];
            setItem(JSON.stringify(updatedItems))
                .then(() => {
                    setNewItemTitle("");
                    setNewItemText("");
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <InputTitle placeholder="Titel eingeben..." value={newItemTitle} onChangeText={onChangeTitle} />
                <InputField placeholder="Notiz eingeben..." value={newItemText} onChangeText={onChangeText} />
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
});


import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
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


    /* Erstellt ein neues item wenn man auf Save clickt */
    const onChangeText = (text) => {
        setNewItemText(text);
    };

    /* erstellt einen Neuen Titel wenn man auf Save clickt */
    const onChangeTitle = (title) => {
        setNewItemTitle(title);
    };

    /* speichert ein neues Item im AsyncStorage ab sobald man auf den save Button Clickt */
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
        <View style={styles.container}>
            <View>
                <InputTitle placeholder="Titel eingeben..." value={newItemTitle} onChangeText={onChangeTitle} />
                <InputField placeholder="Notiz eingeben..." value={newItemText} onChangeText={onChangeText} />
                <AppButton onPress={onSaveButtonPress}>Save</AppButton>
            </View>
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
});

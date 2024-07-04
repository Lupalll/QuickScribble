import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputField from '../../../components/InputField';
import AppButton from '../../../components/AppButton';
import { randomUUID } from 'expo-crypto';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function CreateNote() {
    const [newItemText, setNewItemText] = useState("");
    const { getItem, setItem } = useAsyncStorage("myItems");

    const onChangeText = (text) => {
        setNewItemText(text);
    };

    /*
    Link mit UUID als param auf detail ansicht
    in detailansicht UUID auslesen
    alleNotes ist ein Array aus AsyncStorage
    for (note in alleNotes){
        wenn note.id === uuid
        schreibe die note in den State mit useState
    }
     */

    const onSaveButtonPress = async () => {
        if (newItemText.trim() !== "") {
            const newItem = {
                id: randomUUID(),
                text: newItemText.trim(),
                completed: false,
            };
            const storedItems = await getItem();
            const items = storedItems ? JSON.parse(storedItems) : [];
            const updatedItems = [...items, newItem];
            setItem(JSON.stringify(updatedItems))
                .then(() => {
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
});

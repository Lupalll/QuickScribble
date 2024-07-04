import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
export default function NoteDetailScreen() {
    const [currentNote, setCurrentNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const {uuid} = useLocalSearchParams()
    const { getItem, setItem } = useAsyncStorage("myItems");

    useEffect(() => {
        if (!uuid) {
            return
        }
        const loadItemDetails = async () => {
            setIsLoading(true)
            try {
                const allNotes = await getItem();
                const notesArray = JSON.parse(allNotes) || [];
                const note = notesArray.find((note) => note.id === uuid);
                setCurrentNote(note);
                setItem(JSON.stringify(notesArray));
            } catch (error) {
                Alert.alert("Error")
            } finally {
                setIsLoading(false)
            }
        }
        loadItemDetails()
    }, [uuid])

    return (
        <View>
            <Text>uuid: {uuid}</Text>
        </View>
    )
    
}
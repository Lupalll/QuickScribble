import { useEffect, useState } from "react";
import { Alert, ActivityIndicator, StyleSheet, Text, View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Space from "../components/Space";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function NoteDetailScreen() {
    const [currentNote, setCurrentNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { uuid } = useLocalSearchParams();
    const { getItem } = useAsyncStorage("myItems");

    useEffect(() => {
        if (!uuid) {
            return;
        }
        const loadItemDetails = async () => {
            setIsLoading(true);
            try {
                const allNotes = await getItem();
                const notesArray = JSON.parse(allNotes) || [];
                const note = notesArray.find((note) => note.id === uuid);
                setCurrentNote(note);
            } catch (error) {
                Alert.alert("Error", "Failed to load the note details.");
            } finally {
                setIsLoading(false);
            }
        };
        loadItemDetails();
    }, [uuid]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!currentNote) {
        return (
            <View style={styles.container}>
                <Space height={60} />
                <Text style={styles.errorText}>Note not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Space height={60} />
            <Text style={styles.title}>{currentNote.title}</Text>

            <Text style={styles.content}>{currentNote.text}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 20,
    },
    content: {
        fontSize: 18,
        marginTop: 10,
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
    },
});

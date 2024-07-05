import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ListItem({ onDelete, item, onFav }) {
    return (
        <View style={styles.itemContainer}>
            <Link href={{ pathname: 'detail', params: { uuid: item.id } }} asChild>
                <TouchableOpacity style={styles.textContainer}>
                    <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
            </Link>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => onFav(item)}>
                    <Ionicons
                        name={item.favourited ? 'star' : 'star-outline'}
                        size={24}
                        color={item.favourited ? 'gold' : 'grey'}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDelete(item)}>
                    <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#EDEDED",
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    itemText: {
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 80, // Ensures the icons are spaced evenly
    },
});

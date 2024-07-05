import React from 'react';
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import CustomHeader from '../../components/CustomHeader';

export default function HomeLayout() {
    return (
        <Tabs style={styles.container}>
            <Tabs.Screen
                name="notes/index"
                options={{
                    title: "Your Notes",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style={styles.icon}
                            name="folder"
                            color={color}
                        />
                    ),
                    tabBarLabelStyle: styles.tabBarLabel,
                    header: () => <CustomHeader title="Your Notes" />,
                }}
            />
            <Tabs.Screen
                name="favoriten/index"
                options={{
                    title: "Favourites",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style={styles.icon}
                            name="star-sharp"
                            color={color}
                        />
                    ),
                    tabBarLabelStyle: styles.tabBarLabel,
                    header: () => <CustomHeader title="Favourites" />,
                }}
            />
            <Tabs.Screen
                name="createnote/index"
                options={{
                    title: "New Note",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style={styles.icon}
                            name="add"
                            color={color}
                        />
                    ),
                    tabBarLabelStyle: styles.tabBarLabel,
                    header: () => <CustomHeader title="New Note" />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginBottom: -3,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1D1B20',
    },
    container: {
        backgroundColor: '#F3EDF7'
    }
});

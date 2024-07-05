import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";


export default function RootLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <Slot />
        </SafeAreaView>
    )
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
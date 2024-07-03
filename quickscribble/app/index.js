import { View, Text } from "react-native";
import AppButton from "../components/AppButton";
import { Link } from "expo-router";

export default function HomePage() {
    return (
        <View>
            <AppButton>
                <Link href="/createnote" style={{ textDecorationLine: 'none' }}>
                    <Text style={{ color: 'white' }}>create note</Text>
                </Link>
            </AppButton>
        </View>
    );
}
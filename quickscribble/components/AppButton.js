import { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({ onPress, children }, ref) {
    return (
        <TouchableOpacity ref={ref} onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 4,
        backgroundColor: "#222222",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
});

export default forwardRef(AppButton);

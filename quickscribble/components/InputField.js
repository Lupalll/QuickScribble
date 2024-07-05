import { ScrollView, StyleSheet, TextInput } from "react-native";

export default function InputField({ placeholder, value, onChangeText }) {
    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={true}
                textAlignVertical="top"
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 15,
        alignSelf: 'center',
    },
    input: {
        height: 650,
        width: 420,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
});

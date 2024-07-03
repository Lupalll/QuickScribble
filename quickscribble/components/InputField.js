import {StyleSheet, TextInput, View} from "react-native"

export default function InputField({placeholder, value, onChangeText}) {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 242,
        marginBottom: 15
    },
    input: {
        height: 48,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
})

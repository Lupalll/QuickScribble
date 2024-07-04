import {ScrollView, StyleSheet, TextInput, View} from "react-native"

export default function InputTitle({placeholder, value, onChangeText}) {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={true}
                textAlignVertical="top"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 15,
        alignSelf: 'center',

    },
    input: {
        height: 50,
        width: 420,
        //marginTop: 18,
        //marginBottom: 1,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
})

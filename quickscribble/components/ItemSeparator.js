import {StyleSheet, View} from "react-native";

export default function ItemSeparator() {
    return (
        <View style={styles.line}/>
    )
}

const styles = StyleSheet.create({
    line: {
        color: "ff0000"
    }
})

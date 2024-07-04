import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ListItem({onCheck, onDelete, item, onFav}) {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => onCheck(item)}> 
                {
                    item.completed ?
                        <Ionicons name="checkbox-outline" size={24} color="green"/>
                        :
                        <Ionicons name="square-outline" size={24} color="black"/>
                }

            <Link href={{pathname: 'detail', params: {uuid: item.id}}} asChild>
                <TouchableOpacity>
                        <Text style={styles.itemText}>{item.text}</Text>
                </TouchableOpacity>
            </Link>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => onFav(item)}>
                <Ionicons 
                    name={item.favourited ? 'star' : 'star-outline'} 
                    size={24}
                    color={item.favourited ? 'gold' : 'grey'}/>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => onDelete(item)}>
                <Ionicons name="trash" size={24} color="red"/>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    itemText: {
        flex: 1,
        marginLeft: 16,
        alignSelf: "center",
        justifyContent: 'center',
    },
    itemContainer: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8
    },
})

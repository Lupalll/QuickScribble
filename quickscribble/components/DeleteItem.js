import { Alert } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const useDeleteItem = (items, setItems) => {
    const { setItem } = useAsyncStorage("myItems");

    const deleteEntry = (item) => {
        const updatedItems = items.filter((i) => i.id !== item.id);
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const onDeleteItem = (item) => {
        Alert.alert(
            'Eintrag löschen',
            'Bist du dir sicher, dass du diesen Eintrag löschen möchtest?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteEntry(item), style: 'destructive' },
            ]
        );
    };

    return onDeleteItem;
};

import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const useFavItem = (items, setItems) => {
    const { setItem } = useAsyncStorage("myItems");

    const onFavItem = (item) => {
        const updatedItems = items.map((i) => (
            i.id === item.id ? { ...i, favourited: !i.favourited } : i
        ));
        setItem(JSON.stringify(updatedItems))
            .then(() => {
                setItems(updatedItems);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return onFavItem;
};

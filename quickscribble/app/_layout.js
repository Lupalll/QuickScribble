import {Stack} from "expo-router"

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name='createnote'
                options={{
                    title: 'ToDo',
                }}
            />
        </Stack>
    )
}

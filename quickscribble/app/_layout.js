import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"



export default function HomeLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index"
                options={{
                    title: "Notizen",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style= {{ marginBottom: -3 }}
                            name="list-sharp"
                            color={color} 
                        />
                    ),
                }}
            />

            


        </Tabs>
    )
}

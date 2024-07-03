import { Tabs } from "expo-router" 
import Ionicons from "@expo/vector-icons/Ionicons"

export default function HomeLayout() { 
    return ( 
        <Tabs>
            <Tabs.Screen name="notes/index" 
            options= {{
                title:"Notizen",
                tabBarIcon: ({ color }) => (
                    <Ionicons 
                        size={28}
                        style={{ marginBottom:-3 }}
                        name="list-sharp"
                        color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen name="createnote/index"
            options= {{
                title:"Neue Notiz",
                tabBarIcon: ({ color }) => (
                    <Ionicons 
                        size={28}
                        style={{ marginBottom: -3 }}
                        name= "create"
                        color={color}    
                        />
                    )
                }}
            />

            <Tabs.Screen name="favoriten/index"
            options= {{
                title:"Favoriten",
                tabBarIcon: ({ color }) => (
                    <Ionicons 
                        size={28}
                        style={{ marginBottom: -3 }}
                        name= "star-sharp"
                        color={color}    
                        />
                    )
                }}
            />
        </Tabs>
    ) 
}
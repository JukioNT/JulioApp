import { View, Text } from "react-native";
import { ComponentButtonInterface, ComponentLoading } from "../../components";
import { TabTypes } from "../../navigations/tab.navigation";
import { styles } from "./styles";
import * as Notifications from 'expo-notifications';
import { useAuth } from "../../hooks/auth"
import { useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "../../services/data/Push";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles/colors";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    }),
});
export function Perfil({navigation}:TabTypes){
    const { signOut } = useAuth();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(user) {
            setIsLoading(false);
        }
    }, [user]);
    useEffect(() => {
        async function fetchToken() {
            const token = await registerForPushNotificationsAsync()
            console.log(token)
        }
        fetchToken()
    }, []);
    return(
        <>
            {isLoading ? (
                <ComponentLoading/>
            ) : (
                <View style={styles.container}>
                    <Text>Perfil</Text>
                    <ComponentButtonInterface title="Voltar" type="secondary" onPressI={signOut}/>
                </View>
            )}
        </>
    )
}
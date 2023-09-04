import React, {useEffect,useState} from "react";
import { View, TouchableOpacity, Text, KeyboardAvoidingView, Alert } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { IPage } from '../../../App';
import { ComponentTitleSlider, ComponentButtonSlider, ComponentButtonInterface } from '../../components';
import { colors } from "../../styles/colors";
import { styles } from "./styles";
import { LoginTypes } from "../../navigations/login.navigation"
import { useAuth } from "../../hooks/auth";
import { IAuthenticate, IUserLogin } from "../../services/data/User";
import { apiUser } from "../../services/data";
import { AxiosError } from "axios";

export interface IErrorApi{
    errors: {
        rule: string
        field: string
        message: string
    }[]
}

export function Login({navigation}:LoginTypes) {
    const { signIn } = useAuth();
    const [data,setData] = useState<IAuthenticate>();
    const [isLoading, setIsLoading] = useState(true);
    
    async function handleSignIn(){
        try{
            setIsLoading(true);
            if(data?.email && data.password){
                await signIn(data);
            } else {
                Alert.alert("Preencha todos os campos");
                setIsLoading(false);
            }
        }catch(error){
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false)
        }
    }

    function handleChange(item: IAuthenticate){
        setData({...data, ...item})
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },2000)
    },[])

    return(
        <View style={styles.container}>
            <ComponentTitleSlider titleI="Login" />
            <View style={styles.panel}>
                <KeyboardAvoidingView>
                    <View style={styles.email}>
                        <MaterialIcons name="email" style={styles.icon} />
                        <TextInput 
                        placeholder="E-mail"
                        placeholderTextColor={colors.black}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.boxText}
                        onChangeText={(i) => handleChange({email: i})}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
            <View style={styles.panel}>
                <KeyboardAvoidingView>
                    <View style={styles.email}>
                        <FontAwesome5 name="key" style={styles.icon}/>
                        <TextInput 
                        placeholder="Password"
                        placeholderTextColor={colors.black}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.boxText}
                        onChangeText={(i) => handleChange({password: i})}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>

            <ComponentButtonInterface title="Login" type="secondary" onPressI={handleSignIn}/>
            <Text style={styles.text}>Ainda não tem uma conta?</Text>
            <ComponentButtonInterface title="Register" type="secondary" onPressI={()=>{navigation.navigate("Register")}}/>
        </View>
        
    );
}
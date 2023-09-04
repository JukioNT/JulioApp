import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, KeyboardAvoidingView, Alert } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { IPage } from '../../../App';
import {
     ComponentTitleSlider, ComponentButtonSlider, ComponentButtonInterface, ComponentLoading
} from '../../components';
import { colors } from "../../styles/colors";
import { styles } from "./styles";
import { LoginTypes } from "../../navigations/login.navigation"
import { IRegister } from "../../services/data/User";
import { apiUser } from "../../services/data";
import { Axios, AxiosError } from "axios";

export interface IErrorApi{
    errors: {
        rule: string
        field: string
        message: string
    }[]
}

export function Register({navigation}:LoginTypes) {

    const [data, setData] = useState<IRegister>()
    const [isLoading, setIsLoading] = useState(true)

    function handleChange(item: IRegister){
        setData({...data, ...item})
    }

    async function handleRegister(){
        try{
            setIsLoading(true)
            if(data?.name && data.email && data.password){
                const response = await apiUser.register(data)
                Alert.alert(`${response.data.name} cadastrado`)
                setIsLoading(false)
                navigation.navigate('Login')
            }else{
                Alert.alert("Preencha todos os campos")
            }
        }catch(error){
            setIsLoading(false)
            const err = error as AxiosError
            const errorData = err.response?.data as IErrorApi
            let message = ""
            if(errorData){
                for (const iterator of errorData.errors) {
                    message = `${message} ${iterator.message} \n`
                }
            }
            Alert.alert(message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },2000)
    },[])

    return(
        <>
            {isLoading ? (
                <ComponentLoading/>
            ) : (
                <View style={styles.container}>
                    <ComponentTitleSlider titleI="Register" />
                    <View style={styles.panel}>
                        <KeyboardAvoidingView>
                            <View style={styles.email}>
                                <Ionicons name="person" style={styles.icon}/>
                                <TextInput 
                                placeholder="Name"
                                placeholderTextColor={colors.black}
                                autoCapitalize="none"
                                style={styles.boxText}
                                onChangeText={(i) => handleChange({name: i})}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
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
                    <ComponentButtonInterface title="Register" type="secondary" onPressI={handleRegister}/>
                    <Text style={styles.text}>Já tem uma conta?</Text>
                    <ComponentButtonInterface title="Login" type="secondary" onPressI={()=>{navigation.navigate("Login")}}/>
                </View>
            )}
        </>
    );
}
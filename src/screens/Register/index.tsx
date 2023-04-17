import React from "react";
import { View, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { IPage } from '../../../App';
import {
     ComponentTitleSlider, ComponentButtonSlider, ComponentButtonInterface
} from '../../components';
import { colors } from "../../styles/colors";
import { styles } from "./styles";
import { LoginTypes } from "../../navigations/login.navigation"

export function Register({navigation}:LoginTypes) {

    return(
        <View style={styles.container}>
            <ComponentTitleSlider titleI="Register" />
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
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
            <View style={styles.panel}>
                <KeyboardAvoidingView>
                    <View style={styles.email}>
                        <FontAwesome5 name="key" style={styles.icon}/>
                        <TextInput 
                        placeholder="Repeat Password"
                        placeholderTextColor={colors.black}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.boxText}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>

            <ComponentButtonInterface title="Register" type="secondary" onPressI={()=>{console.log("Register")}}/>
            <Text style={styles.text}>Já tem uma conta?</Text>
            <ComponentButtonInterface title="Login" type="secondary" onPressI={()=>{navigation.navigate("Login")}}/>

        </View>
        
    );
}
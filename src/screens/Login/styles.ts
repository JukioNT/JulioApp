import { StyleSheet } from "react-native";
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    panel: {
        backgroundColor: colors.white,
        margin: 20,
        marginTop: 10,
        padding: 10,
        borderRadius: 5
        
    },
    button: {
        alignItems: "center",
        color: colors.primary,
        backgroundColor: colors.secondary,
        borderRadius: 15,
        padding: 10,
        width: "30%"        
    },
    buttonText: {
        color: colors.primary,
        fontSize: 20
    },
    boxText: {
        width: "100%",
        color: colors.black,
        fontSize: 20,
    },
    buttonPlacement: {
        alignItems: "flex-end",
        marginRight: 25,
        marginBottom: 15
    },
    icon: {
        fontSize: 28,
        color: colors.secondary,
        padding: 5
    },
    email :{
        flexDirection: "row",
        alignItems: "center",
    },
    buttonSlider: {
        backgroundColor: colors.black,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 20
    },
});
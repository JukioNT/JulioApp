import { StyleSheet } from "react-native"
import { colors } from "../../styles/colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    panel: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: colors.black,
    },
    buttonSlider: {
        backgroundColor: colors.black,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 20
    },
    list: {
        paddingTop: 150
    }
});
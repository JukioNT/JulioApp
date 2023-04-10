import React from "react";
import { FlatList, View } from "react-native";
import { IPage } from "../../../App";
import { ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider } from "../../components";
import { styles } from "./styles";

export function Slider4({ setPageI }: IPage){
    const slide1Texts = [
        { id: '1', text: 'Notas'},
        { id: '2', text: 'Intervalos'},
        { id: '3', text: 'Acordes'},
    ]
    return(
        <>
        <View style={styles.panel}>
            <ComponentTitleSlider titleI="Pricipais"/>
            <View style={styles.list}>
                <FlatList
                    data={slide1Texts}
                    renderItem={({ item }) => 
                        <ComponentListMaker key={item.id} textMarker={item.text}/>
                    } 
                    keyExtractor={(item) => item.id}
                />
            </View> 
        </View>
        <View style={styles.buttonSlider}>
            <ComponentButtonSlider onPressI={() => setPageI(1)}/>
            <ComponentButtonSlider onPressI={() => setPageI(2)}/>
            <ComponentButtonSlider onPressI={() => setPageI(3)}/>
            <ComponentButtonSlider onPressI={() => setPageI(4)}/>
            <ComponentButtonSlider onPressI={() => setPageI(5)}/>
        </View>
        </>
    );
}
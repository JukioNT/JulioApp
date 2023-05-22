import { styles } from "./styles";
import { ComponentButtonInterface } from '../../components';
import { CameraTypes } from "../../navigations/camera.navigation";
import { useRoute } from '@react-navigation/native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, View, Image, Alert, ImageSourcePropType } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { debug } from "react-native-reanimated";

export function CameraOptions({navigation}:CameraTypes) {
    const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
    const route = useRoute() 
    const data=route.params as {photo: string}
    const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();

    console.log(data)

    if (!permissionMedia) {
        // Media permissions are still loading
        return <View />;
    }

    if (!permissionMedia.granted) {
        // Media permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to save media</Text>
                <Button onPress={requestPermissionMedia} title="grant permission" />
            </View>
        );
    }


    async function pickImage(){
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        if(!result.canceled){
            setPhoto(result.assets[0])
        }
    }

    return (
        <View style={styles.container}>
            <ComponentButtonInterface title="Camera" type="secondary" onPressI={()=>{navigation.navigate("Camera")}}/>
            {data && ( 
                <Image source={{ uri: data.photo}} style={styles.img}/> 
            )}
            {photo && photo.uri && (
                <Image source={{ uri: photo.uri }} style={styles.img}/>
            )}
            <ComponentButtonInterface title="Abrir Imagem" type="secondary" onPressI={pickImage}/>
        </View>
    );
}

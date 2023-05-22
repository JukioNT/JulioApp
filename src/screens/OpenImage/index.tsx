import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, View, Image, Alert } from 'react-native';
import { ComponentButtonInterface } from '../../components';
import { styles } from "./styles";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

interface IPhoto{
    height: string
    uri: string
    width: string
}

export function OpenImage() {
    const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
    const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
    const ref = useRef<Camera>(null);
    const [takePhoto, setTakePhoto] = useState(false);

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
            <ComponentButtonInterface title='Abrir Imagem' type='secondary' onPressI={pickImage}/>
            {photo && photo.uri && (
                <Image source={{ uri: photo.uri }} style={styles.img}/>
            )}
        </View>
    );
}

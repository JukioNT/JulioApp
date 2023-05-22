import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { ComponentButtonInterface } from '../../components';
import { styles } from "./styles";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { CameraTypes } from "../../navigations/camera.navigation";

export function CameraScreen({navigation}: CameraTypes) {
    const [type, setType] = useState(CameraType.back);
    const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
    const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
    const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
    const ref = useRef<Camera>(null);
    const [takePhoto, setTakePhoto] = useState(false);

    if (!permissionCamera) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permissionCamera.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermissionCamera} title="grant permission" />
            </View>
        );
    }

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

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takePicture() {
        if(ref.current){
            const picture = await ref.current.takePictureAsync()
            const takePhoto = true
            setPhoto(picture)
            setTakePhoto(takePhoto)
            console.log(picture)
        }
    }

    async function savePhoto(){
        const asset = await MediaLibrary.createAssetAsync(photo!.uri)
        MediaLibrary.createAlbumAsync("Images", asset, false)
        Alert.alert("Imagem salva com sucesso!")
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

    if(takePhoto){
        return (
            <View style={styles.container}>
                <ComponentButtonInterface title='Voltar' type='secondary' onPressI={() => navigation.navigate('CameraOptions', {photo: photo!.uri})}/>
                <ComponentButtonInterface title='Flip' type='secondary' onPressI={toggleCameraType}/>
                <Camera style={styles.camera} type={type} ref={ref}/>
                <ComponentButtonInterface title='Foto' type='secondary' onPressI={takePicture}/>
                <ComponentButtonInterface title='Salvar Imagem' type='secondary' onPressI={savePhoto}/>
                <ComponentButtonInterface title='Abrir Imagem' type='secondary' onPressI={pickImage}/>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ComponentButtonInterface title='Flip' type='secondary' onPressI={toggleCameraType}/>
                <Camera style={styles.camera} type={type} ref={ref}/>
                <ComponentButtonInterface title='Foto' type='secondary' onPressI={takePicture}/>
                <ComponentButtonInterface title='Salvar Imagem' type='secondary' onPressI={savePhoto}/>
                <ComponentButtonInterface title='Abrir Imagem' type='secondary' onPressI={pickImage}/>
            </View>
        );
    }
}

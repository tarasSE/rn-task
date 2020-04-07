import React, { useState, useRef } from 'react';
import { ImagePickerComponent } from '../components/ImagePickerComponent';
import { Image, useWindowDimensions, StyleSheet, View, } from 'react-native';
import { Button } from 'react-native-material-ui';
import Toast from 'react-native-easy-toast'

const upload = async (data, showMessage) => {
    try {
        await fetch('http://example.com', {
            method: 'POST',
            data
        })

        showMessage('Image uploaded successfully!')
    }
    catch (error) {
        showMessage('Image was not uploaded')
    }
}

export const MainScreen = () => {
    const imageWidth = useWindowDimensions().width;
    const imageHeight = useWindowDimensions().height;

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(null);
    const toast = useRef(null);

    let imageComponent = null;
    let uploadButton = null;

    const showMessage = (message) => {
        setMessage(message);
    }

    if (image) {
        imageComponent = <Image style={[styles.image, {
            width: imageWidth * 0.8,
            height: imageHeight * 0.8,
        }]} source={{ uri: image.uri }} />;

        uploadButton = <Button raised
                               text={'Upload'}
                               onPress={() => upload(image.data, showMessage)} />;
    }

    if (message) {
        toast.current.show(message, 2000, () => {
            setImage(null);
        });
    }

    return (<>
        <ImagePickerComponent setImage={setImage} 
                              showMessage={showMessage}/>
        {uploadButton}
        <View style={styles.imageContainer}>
            {imageComponent}
        </View>
        <Toast ref={toast} />
    </>)
}

const styles = StyleSheet.create({
    imageContainer: {
        paddingTop: 20,
    },
    image: {
        alignSelf: 'center'
    },
});

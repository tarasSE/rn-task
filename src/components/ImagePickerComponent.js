import React from 'react';
import { Button } from 'react-native-material-ui';
import ImagePicker from 'react-native-image-picker';

const openImagePicker = (setImage, showMessage) => {
    const options = {
        title: 'Select image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    ImagePicker.showImagePicker(options, (response) => {
        if (response.error) {
            showMessage(`ImagePicker Error: ${response.error}`);
        } else {
            setImage(response);
        }
    });
}

export const ImagePickerComponent = ({ setImage, showMessage, style }) => <Button style={style}
                                                                     primary
                                                                     raised
                                                                     text="Select image"
                                                                     onPress={() => openImagePicker(setImage, showMessage)} />;

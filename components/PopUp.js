import { View, TouchableOpacity, Text } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast';

const PopUp = () => {
    return (
        <Root>
            <View>
                <TouchableOpacity
                    onPress={() =>
                        Popup.show({
                            type: 'success',
                            title: 'Dikkat!',
                            textBody: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez. ',
                            buttonText: 'Tamam',
                            callback: () => Popup.hide()
                        })
                    }
                >
                    <Text>Open Popup Message</Text>
                </TouchableOpacity>
            </View>
        </Root>
    )
} 

export default PopUp;

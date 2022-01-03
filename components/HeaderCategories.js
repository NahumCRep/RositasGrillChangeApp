import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
const HeaderCategories = ({handleGetData}) => {
    return (
        <View style={styles.buttonsView}>
            <TouchableOpacity
                style={[styles.touchBtn, { backgroundColor: '#ff5100' }]}
                onPress={() => handleGetData('combo')}
            >
                <Text>Combos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.touchBtn, { backgroundColor: '#fbc105' }]}
                onPress={() => handleGetData('comida')}
            >
                <Text>Comida</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.touchBtn, { backgroundColor: '#F39C12' }]}
                onPress={() => handleGetData('bebida')}
            >
                <Text>Bebidas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.touchBtn, { backgroundColor: '#85592d' }]}
                onPress={() => handleGetData()}
            >
                <Text>Todo</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonsView: {
        flex: 1,
        flexDirection: 'row'
    },
    touchBtn: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderCategories;
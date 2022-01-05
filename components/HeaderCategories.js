import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
const HeaderCategories = ({ handleGetData }) => {
    return (
        <View>
            <View style={styles.buttonsView}>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#ff5100' }]}
                    onPress={() => handleGetData('combo')}
                >
                    <Text>Combos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#fbc105' }]}
                    onPress={() => handleGetData('desayuno')}
                >
                    <Text>Desayunos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F39C12' }]}
                    onPress={() => handleGetData('platano')}
                >
                    <Text>Plátano</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#85592d' }]}
                    onPress={() => handleGetData('carne')}
                >
                    <Text>Carne</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonsView, {marginTop: 0}]}>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#ff5100' }]}
                    onPress={() => handleGetData('pollo')}
                >
                    <Text>Pollo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#fbc105' }]}
                    onPress={() => handleGetData('arroz')}
                >
                    <Text style={{textAlign: 'center'}}>Arroz / Minestra</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F39C12' }]}
                    onPress={() => handleGetData('ensalada')}
                >
                    <Text>Ensaladas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#85592d' }]}
                    onPress={() => handleGetData('bebida')}
                >
                    <Text>Bebidas</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonsView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchBtn: {
        flex: 1,
        // width: 90,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderCategories;
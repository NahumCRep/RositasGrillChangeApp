import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
const HeaderCategories = ({ handleGetData }) => {
    return (
        <View>
            <View style={styles.buttonsView}>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F1C40F' }]}
                    onPress={() => handleGetData('combo')}
                >
                    <Text>Combos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F4D03F' }]}
                    onPress={() => handleGetData('desayuno')}
                >
                    <Text>Desayunos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F1C40F' }]}
                    onPress={() => handleGetData('platano')}
                >
                    <Text>Plátano</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F4D03F' }]}
                    onPress={() => handleGetData('carne')}
                >
                    <Text>Carne</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonsView, {marginTop: 0}]}>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F4D03F' }]}
                    onPress={() => handleGetData('pollo')}
                >
                    <Text>Pollo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F1C40F' }]}
                    onPress={() => handleGetData('arroz')}
                >
                    <Text style={{textAlign: 'center'}}>Arroz / Minestra</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F4D03F' }]}
                    onPress={() => handleGetData('ensalada')}
                >
                    <Text>Ensaladas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, { backgroundColor: '#F1C40F' }]}
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
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderCategories;
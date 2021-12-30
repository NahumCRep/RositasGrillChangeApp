import { Modal, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";

const ModalAddForm = ({ modalVisibility }) => {
    return (
        <View>
            <View style={{ flex: 2 }}>

            </View>
            <View style={styles.modalBtnView}>
                <TouchableOpacity
                    style={[{ backgroundColor: '#000' }, styles.modalBtn]}
                >
                    <Text style={{ color: '#fff' }}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{ backgroundColor: '#E74C3C' }, styles.modalBtn]}
                    onPress={modalVisibility}
                >
                    <Text style={{ color: '#fff' }}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        // opacity: 0.5
        // marginTop: 22
    },
    modalView: {
        width: 300,
        height: 400,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        // flex: 1,
        flexDirection: 'row',
        width: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#000'
    },
    buttonClose: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        fontSize: 15,

    },
    modalBtnView: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginBottom: 10
    },  
    modalBtn: {
        marginRight: 10,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});


export default ModalAddForm;
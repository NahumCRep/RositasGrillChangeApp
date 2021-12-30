import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ModalAddForm from "./ModalAddForm";

const ModalComp = ({ modalVisible, handleVisibility, operation, foodID }) => {

    const selectForm = () => {
        if (operation == 'Agregar Producto') {
            return <ModalAddForm modalVisibility={handleVisibility} />
        } else {
            return null;
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTitle}>
                            <View style={{ height: 50, flex: 1, justifyContent: 'center' }}>
                                <Text style={[styles.modalText, { color: '#fff' }]}>{operation}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, width: '100%', padding: 20 }}>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>ID</Text>
                                <TextInput
                                    style={[styles.formTInput, {marginTop: 5}]}
                                />
                            </View>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>Nombre</Text>
                                <TextInput
                                    style={[styles.formTInput,  {marginTop: 5}]}
                                />
                            </View>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>Precio</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={styles.formLabel}>$</Text>
                                    <TextInput
                                        style={[styles.formTInput, {width: 60, marginLeft: 6}]}
                                    />
                                </View>
                            </View>
                            <View style={styles.formItem}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor="green"
                                        unfillColor="#FFFFFF"
                                        iconStyle={{ borderColor: "green" }}
                                    // onPress={(isChecked) => { }}
                                    />
                                    <Text style={styles.formLabel}>Es un combo</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modalBtnView}>
                            <TouchableOpacity
                                style={[{ backgroundColor: '#000' }, styles.modalBtn]}
                            >
                                <Text style={{ color: '#fff' }}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ backgroundColor: '#E74C3C' }, styles.modalBtn]}
                                onPress={handleVisibility}
                            >
                                <Text style={{ color: '#fff' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        height: 430,
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
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    formItem: {
        marginTop: 10
    },
    formLabel: {
        fontSize: 18,
        // marginTop: 5
    },
    formTInput: {
        backgroundColor: '#D7DBDD',
        height: 35,
        padding: 10,
        borderRadius: 10
    },
    modalText: {
        textAlign: "center",
        fontSize: 20,

    },
    modalBtnView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    modalBtn: {
        marginRight: 10,
        height: 50,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default ModalComp;
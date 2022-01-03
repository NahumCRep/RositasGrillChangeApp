import { View, Modal, Text, TouchableOpacity } from "react-native";
import { styles } from './ModalStyles';
import { openMyDatabase } from '../DataBaseConn/DataBaseConnection';

const db = openMyDatabase.getConnection();

const ModalDeleteForm = ({ modalDeleteVisible, handleVisibility, productId, productName ,  productCategory, refresh}) => {
    const deleteFoodItem = (id) => {
        db.transaction(
            (tx) => {
                tx.executeSql(`delete from food where id = ?;`, [id], (tx, success) => {
                    alert('Producto eliminado Correctamente!!');
                    handleVisibility('delete');
                    refresh(productCategory);
                }, (tx, error) => {
                    console.log(error);
                });
            },
        )
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDeleteVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalViewDelete}>
                        <View style={styles.modalTitle}>
                            <View style={{ height: 50, flex: 1, justifyContent: 'center' }}>
                                <Text style={[styles.modalText, { color: '#fff' }]}>Eliminar Producto</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, width: '100%', padding: 20 }}>
                            <Text style={{ textAlign: 'center' }}>Está seguto que quiere eliminar el producto?</Text>
                            <Text style={{ textAlign: 'center', marginTop: 15, color: '#f00' }}>{productName}</Text>
                        </View>
                        <View style={styles.modalBtnViewCenter}>
                            <TouchableOpacity
                                style={[{ backgroundColor: '#000' }, styles.modalBtn]}
                                onPress={() => deleteFoodItem(productId)}
                            >
                                <Text style={{ color: '#fff' }}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ backgroundColor: '#E74C3C' }, styles.modalBtn]}
                                onPress={() => handleVisibility('delete', '', '')}
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

export default ModalDeleteForm;
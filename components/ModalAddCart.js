import { useState, useEffect, useContext } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
import { styles } from './ModalStyles';
import { openMyDatabase } from '../DataBaseConn/DataBaseConnection';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import OrderContext from "../context/OrderContext";

const db = openMyDatabase.getConnection();

const ModalAddCart = ({ modalVisible, handleVisibility, foodObject }) => {
    const [foodOrder, setFoodOrder] = useState({
        foodid: '',
        foodname: '',
        foodprice: 0,
        foodamount: '1',
        foodextra: '0'
    });
    const [extra, setExtra] = useState(false);
    const orderContext = useContext(OrderContext);

    useEffect(() => {
        setFoodOrder({
            ...foodOrder,
            foodid: foodObject.id,
            foodname: foodObject.name,
            foodprice: foodObject.price
        });
    }, [foodObject]);

    // const showOrderData = () => {
    //     console.log(foodOrder);
    // }

    const handleExtra = () => {
        setExtra(!extra);
        setFoodOrder({
            ...foodOrder,
            foodextra: '0'
        });
    }

    const addingOrder = () => {
        // console.log(foodOrder);
        orderContext.addOrder(foodOrder);
        setFoodOrder({
            ...foodOrder,
            foodamount: '1'
        })
        handleVisibility();       
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalCart}>
                        <View style={styles.modalTitle}>
                            <View style={{ height: 50, flex: 1, justifyContent: 'center' }}>
                                <Text
                                    style={[styles.modalText, { color: '#fff'}]}
                                >
                                    Agregar a Orden
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, width: '100%', padding: 20 }}>
                            <View style={styles.formItem}>
                                <Text style={[styles.formLabel, { borderBottomWidth: 2, borderBottomColor: '#fbc105',  textAlign: 'center'  }]}>
                                    {foodObject.name}
                                </Text>
                            </View>
                            <View style={styles.formItem}>
                                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'center', marginTop: 15 }}>
                                    <Text style={styles.formLabel}>Cantidad</Text>
                                    <TextInput
                                        style={[styles.formTInput, { width: 60, marginLeft: 6 }]}
                                        keyboardType="numeric"
                                        value={foodOrder.foodamount.toString()}
                                        onChangeText={(text) => setFoodOrder({
                                            ...foodOrder,
                                            foodamount:  text
                                        })}
                                    />
                                </View>
                            </View>
                            {/* <View style={styles.formItem}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <BouncyCheckbox
                                        size={30}
                                        fillColor="green"
                                        unfillColor="#FFFFFF"
                                        text=""
                                        iconStyle={{ borderColor: "green" }}
                                        onPress={handleExtra}
                                    />
                                    <Text style={styles.formLabel}>Extra</Text>
                                </View>
                            </View>
                            <View style={styles.formItem}>
                                {
                                    extra
                                    ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={styles.formLabel}>Cantidad</Text>
                                        <TextInput
                                            style={[styles.formTInput, { width: 60, marginLeft: 6 }]}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setFoodOrder({
                                                ...foodOrder,
                                                foodextra: text
                                            })}
                                        />
                                    </View>
                                    :
                                    null
                                }
                            </View> */}
                        </View>
                        <View style={styles.modalBtnViewCenter}>
                            <TouchableOpacity
                                style={[{ backgroundColor: '#000' }, styles.modalBtn]}
                                onPress={addingOrder}
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

export default ModalAddCart;
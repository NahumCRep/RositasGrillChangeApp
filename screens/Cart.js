import { Text, View, Button, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useContext, useEffect, useState, useRef } from "react";
import OrderContext from "../context/OrderContext";
import FontAwIcon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { openMyDatabase } from '../DataBaseConn/DataBaseConnection';

const db = openMyDatabase.getConnection();

const Cart = () => {
    const orderContext = useContext(OrderContext);
    const [totalCost, setTotalCost] = useState(0);
    const [delivery, setDelivery] = useState(false);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [extraCost, setExtraCost] = useState(0);
    const [payment, setPayment] = useState(0);
    const [change, setChange] = useState(0);
    const inputExtra = useRef(null);
    const inputClient = useRef(null);
    let cost = 0;
    useEffect(() => {
        if (orderContext.orders.length == 0) {
            setPayment(0);
            setExtraCost(0);
            inputExtra.current.clear();
            inputClient.current.clear();
            setChange(0);
        }
        orderContext.orders.map((item) => {
            cost += (item.foodprice * item.foodamount);
        });
        setTotalCost(cost);

        // console.log(totalCost);

    }, [orderContext]);

    // useEffect(()=>{

    // }, [deliveryCost,extraCost])

    useEffect(() => {
        if (delivery) {
            handleDeliveryCost();
        } else {
            setDeliveryCost(0);
        }
    }, [delivery])

    const handleDeliveryCost = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select price from food where id = ?",
                    ['dev'], (_, { rows: { _array } }) => {
                        // setDelivery(_array[0].price);
                        // console.log(_array[0].price);
                        setDeliveryCost(_array[0].price);
                    }, (tx, error) => {
                        console.log(error);
                    });
            }
        );
    }

    const calculateChange = () => {
        let clientchange = parseInt(payment) - (totalCost + deliveryCost + extraCost);
        setChange(clientchange);
        // console.log(payment);
        // console.log(totalCost)
        // console.log(deliveryCost)
    }

    return (
        <ScrollView>
            <View>
                <View style={styles.tableHeader}>
                    <Text style={[styles.columName, styles.boldFont]}>Producto</Text>
                    <Text style={[styles.columnCamp, styles.boldFont]}>Cantidad</Text>
                    <Text style={[styles.columnCamp, styles.boldFont]}>Subtotal</Text>
                    <Text style={[styles.columnCamp, styles.boldFont]}>Eliminar</Text>
                </View>
                <View >
                    {
                        orderContext.orders.map((item, i) => {
                            return (
                                <View key={item.foodid} index={i} style={styles.columnView} >
                                    <Text style={styles.columName}>{item.foodname}</Text>
                                    <Text style={styles.columnCamp}>{item.foodamount}</Text>
                                    <Text style={styles.columnCamp}>{'$' + (item.foodprice * item.foodamount).toFixed(2)}</Text>
                                    <TouchableOpacity
                                        style={[styles.columnCamp, styles.deleteButton]}
                                        onPress={() => orderContext.removeOrder(i)}
                                    >
                                        <FontAwIcon name="times" size={25} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }

                </View>
                <View>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.columName, styles.boldFont]}>Total</Text>
                        <Text style={[{ flex: 1, marginRight: 10 }, styles.boldFont]}>{'$' + (totalCost + deliveryCost + extraCost).toFixed(2)}</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <Text style={styles.boldFont}>Costo de delivery</Text>
                        <BouncyCheckbox
                            style={{ marginLeft: 10 }}
                            size={30}
                            fillColor="green"
                            unfillColor="#FFFFFF"
                            text=""
                            iconStyle={{ borderColor: "green" }}
                            onPress={() => setDelivery(!delivery)}
                        />
                    </View>
                    <View style={[styles.bottomView, { marginTop: 15 }]}>
                        <Text style={styles.boldFont}>Costos extra: </Text>
                        <TextInput
                            ref={inputExtra}
                            style={styles.inputNumeric}
                            keyboardType="numeric"
                            placeholder="0.00"
                            onChangeText={(text) => setExtraCost(parseFloat(text) || 0)}
                        />
                    </View>
                    <View style={[styles.bottomView, { marginTop: 15 }]}>
                        <Text style={styles.boldFont}>Dinero dado por el cliente: </Text>
                        <TextInput
                            ref={inputClient}
                            style={styles.inputNumeric}
                            keyboardType="numeric"
                            placeholder="0.00"
                            onChangeText={(text) => setPayment(parseFloat(text) || 0)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.calculateButton}
                        onPress={calculateChange}
                    >
                        <Text style={styles.boldFont}>CALCULAR VUELTO</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.boldFont, styles.changeText]}>Dinero a devolver</Text>
                        <Text style={[styles.boldFont, styles.changeText]}>{`$ ${change.toFixed(2)}`}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        backgroundColor: '#D7DBDD',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingLeft: 5
    },
    boldFont: {
        fontWeight: 'bold'
    },
    columnView: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 5
    },
    columName: {
        flex: 2,
        marginRight: 5
    },
    columnCamp: {
        width: 70,
        marginRight: 5,
        textAlign: 'center'
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height: 40,
        borderRadius: 5
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 5
    },
    inputNumeric: {
        backgroundColor: '#D7DBDD',
        width: 70,
        height: 40,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        textAlign: 'center'
    },
    calculateButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fbc105',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    changeText: {
        fontSize: 25,
        marginTop: 20,
        textAlign: 'center'
    }

})

export default Cart;
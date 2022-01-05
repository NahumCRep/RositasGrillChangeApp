import { Text, View, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
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
    let cost = 0;
    useEffect(() => {
        orderContext.orders.map((item) => {
            cost += (item.foodprice * item.foodamount);
        });
        setTotalCost(cost);
        // console.log(totalCost);

    }, [orderContext]);

    useEffect(() => {
        console.log(delivery);
        if (delivery) {
            handleDeliveryCost();
        }else{
            setDeliveryCost(0);
            console.log(deliveryCost);
        }
    }, [delivery])

    const handleDeliveryCost = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select price from food where id = ?",
                    ['dev'], (_, { rows: { _array } }) => {
                        // setDelivery(_array[0].price);
                        console.log(_array[0].price);
                        setDeliveryCost(_array[0].price);
                    }, (tx, error) => {
                        console.log(error);
                    });
            }
        );
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
                        <Text style={{ flex: 1, marginRight: 10 }}>{'$' + (totalCost + deliveryCost).toFixed(2)}</Text>
                    </View>
                    <View style={styles.deliveryView}>
                        <Text style={styles.boldFont}>Añadir costo de delivery</Text>
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
    deliveryView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 5
    }

})

export default Cart;
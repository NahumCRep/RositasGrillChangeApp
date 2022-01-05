import { Text, View ,Button, ScrollView, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import OrderContext from "../context/OrderContext";

const Cart = () => {
    const orderContext = useContext(OrderContext);
    // useEffect(()=>{
    //     orderContext.getOrders();
    // },[orderContext]);
    return(
        <ScrollView>
            <Text>Cart Screen</Text>
            <Button 
                title="press"
                onPress={() => console.log(orderContext)}
            />
            <View style={{paddingRight: 5, paddingLeft: 5}}>
                <View style={styles.tableHeader}>
                    <Text style={styles.columName}>Producto</Text>
                    <Text style={styles.columnCamp}>Cantidad</Text>
                    <Text style={styles.columnCamp}>Subtotal</Text>
                    <Text style={styles.columnCamp}>Eliminar</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        backgroundColor: 'red',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    columName: {
        flex: 1,
        backgroundColor: '#0ff',
        marginRight: 5
    },
    columnCamp: {
        width: 60,
        marginRight: 5,
        backgroundColor: '#0f0',
        textAlign: 'center'
    }
    
})

export default Cart;
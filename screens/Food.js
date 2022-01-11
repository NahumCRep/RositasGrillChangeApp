import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import FontAwIcon from 'react-native-vector-icons/FontAwesome';
import HeaderCategories from "../components/HeaderCategories";
import FoodItem from "../components/FoodItem";
import { openMyDatabase } from '../DataBaseConn/DataBaseConnection';
import ModalAddCart from "../components/ModalAddCart";
import OrderContext from "../context/OrderContext";

const db = openMyDatabase.getConnection();
const Food = () => {
    const [menu, showMenu] = useState(false);
    const [dbRes, setdbRes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [foodObject, setFoodObject] = useState({});
    const orderContext = useContext(OrderContext);

    useEffect(() => {
        if(!menu) {
            setdbRes([]);
            orderContext.clearAll();
        }; 
    }, [menu])

    const getData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from food", [], (_, { rows: { _array } }) => setdbRes(_array));
            },
            ({ tx, error }) => {
                console.log(error);
            }
        );
    }
    
    const getByCategory = (category) => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from food where category = ?", [category], (_, { rows: { _array } }) => setdbRes(_array));
            },
            ({ tx, error }) => {
                console.log(error);
            }
        );
    }
    
    const handleData = (category) => {
        category ? getByCategory(category) : getData();
    }

    const showModal = (fObject) => {
        setModalVisible(!modalVisible);
        if(fObject) setFoodObject(fObject);
    }

    return (
        <ScrollView style={{ paddingLeft: 5,paddingRight: 5}}>
            <View style={styles.rowcenter}>
                <TouchableOpacity 
                    style={[styles.rowcenter, styles.orderbutton]}
                    onPress={() => showMenu(!menu)}
                >
                    <FontAwIcon name={menu ? 'minus':'plus'} size={25} style={{marginRight: 10, marginTop: 5}} />
                    <Text style={{fontSize: 20}}>
                        {
                            menu ? 'Cerrar Orden':'Nueva Orden'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyView}>
                {
                    menu ? <HeaderCategories handleGetData={handleData} /> : null
                }
            </View>
            <View>
                {
                    dbRes.map((item) => {
                        return(
                            <FoodItem key={item.id} name={item.name} price={item.price}>
                                <TouchableOpacity 
                                    style={styles.addButton}
                                    onPress={() => showModal(item)}
                                >
                                    <FontAwIcon name="plus" size={25} />
                                </TouchableOpacity>
                            </FoodItem>
                        )
                    })
                }
            </View>
            <ModalAddCart modalVisible={modalVisible} handleVisibility={showModal} foodObject={foodObject} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rowcenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderbutton: {
        width: '100%',
        height: 80,
        marginTop: 10,
        backgroundColor: '#fbc105'
    },
    bodyView: {
        marginTop: 10
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: '#fbc105',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Food;
import { useState, useEffect } from 'react';
import { 
    View, 
    Text,
    ScrollView, 
    Image, 
    StyleSheet, 
    Button, 
    TouchableOpacity 
} from 'react-native';
import logo from '../assets/logoName.png';
import * as SQLite from 'expo-sqlite'
import FoodItem from '../components/FoodItem';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwIcon from 'react-native-vector-icons/FontAwesome';
import {openMyDatabase} from '../DataBaseConn/DataBaseConnection';
import ModalComp from '../components/ModalComp';

const db = openMyDatabase.getConnection();
const Home = () => {
    const [dbRes, setdbRes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalOperation, setModalOperation] = useState('');
    const [foodID, setFoodID] = useState('');
    // useEffect(() => {
    //     db.transaction(
    //         (tx) => {
    //             tx.executeSql("insert into food (id, name, price, category, combo) values (?, ?, ?, ? , ?)",
    //                 ['test', 'testname', 0.50, 'testcat', 'no']);
    //             tx.executeSql("select * from food", [], (_, { rows }) =>
    //                 console.log(JSON.stringify(rows))
    //             );
    //         },
    //         null
    //     );
    // }, []);
  
    const getData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from food", [], (_, { rows: { _array } }) =>  setdbRes(_array));
            },
            ({tx, error}) => {
                console.log(error);
            }
        );
    }

    // const handleDataHook = () => {
    //     let data = await getData();
    //     console.log(data);
    //     // setdbRes(data);
    // }

    // const insertFood = () => {
    //     db.transaction(
    //         (tx) => {
    //             tx.executeSql("insert into food (id, name, price, category, combo) values (?, ?, ?, ? , ?)",
    //                 ['test2', 'testname2', 1.00, 'testcat', 'no']);
    //         },
    //         ({tx, error}) => {
    //             console.log(error);
    //         }
    //     );
    // }

    // const updateFoodItem = ({}) => {
    //     db.transaction(
    //         (tx) => {
    //           tx.executeSql(`update items set done = 1 where id = ?;`, [
    //             id,
    //           ]);
    //         },
    //         null,
    //         forceUpdate
    //       )
    // }

    // const deleteFoodItem = ({}) => {
    //     db.transaction(
    //         (tx) => {
    //           tx.executeSql(`delete from items where id = ?;`, [id]);
    //         },
    //         null,
    //         forceUpdate
    //       )
    // }
    const updateFood = (id) => {
        console.log(id);
    }

    const showModal = (modOperation, id) => {
        setModalVisible(!modalVisible);
        setModalOperation(modOperation);
        setFoodID(id);
    }

    return (
        <ScrollView style={{paddingLeft: 5, paddingRight: 5}}>
            <View style={styles.logoView}>
                <Image style={styles.logoImg} source={logo} alt="logo" />
            </View>
            <View style={styles.buttonsView }>
                <TouchableOpacity
                    style={[styles.touchBtn, {backgroundColor: '#ff5100'}]}
                >
                    <Text>Combos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, {backgroundColor: '#fbc105'}]}
                >
                    <Text>Comida</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, {backgroundColor: '#F39C12'}]}
                >
                    <Text>Bebidas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchBtn, {backgroundColor: '#85592d'}]}
                    onPress={getData}
                >
                    <Text>Todo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listTitle}>
                <Text style={{fontSize: 18, marginTop: 10}}>Listado</Text>
                <Button 
                    title='Agregar'
                    onPress={() => showModal('Agregar Producto', '')}
                />
            </View>
            <View style={{marginTop: 10}}>
                    {
                        dbRes.map((foodItem) => {
                            return (
                                <FoodItem key={foodItem.id} name={foodItem.name} price={foodItem.price}>
                                    <TouchableOpacity
                                        style={[styles.foodBtn, {marginRight: 5, backgroundColor: '#F39C12'}]}
                                        onPress={() => showModal('Editar Producto', foodItem.id)}
                                    >
                                        <MaterialIcon size={25} name='edit' />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.foodBtn, {backgroundColor: '#E74C3C'}]}
                                        onPress={() => showModal('Eliminar Producto', foodItem.id)}
                                    >
                                        <FontAwIcon size={25} name='times' />
                                    </TouchableOpacity>
                                </FoodItem>
                            )
                        })
                    }
            </View>
             <ModalComp modalVisible={modalVisible} handleVisibility={showModal} operation={modalOperation} foodID={foodID} />
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    logoView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    logoImg: {
        width: 250,
        height: 250,
        resizeMode: 'contain'

    },
    buttonsView: {
        flex: 1,
        flexDirection: 'row'
    },
    listTitle: {
        height: 60,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'orange'
    },
    foodBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchBtn: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
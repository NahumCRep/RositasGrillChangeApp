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
import * as SQLite from 'expo-sqlite';
import FoodItem from '../components/FoodItem';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwIcon from 'react-native-vector-icons/FontAwesome';
import {openMyDatabase} from '../DataBaseConn/DataBaseConnection';
import ModalAddForm from '../components/ModalAddForm';
import ModalDeleteForm from '../components/ModalDeleteForm';
import HeaderCategories from '../components/HeaderCategories';

const db = openMyDatabase.getConnection();
const Home = () => {
    const [dbRes, setdbRes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalOperation, setModalOperation] = useState('');
    const [foodID, setFoodID] = useState('');
    const [foodName, setFoodName] = useState('');
    // useEffect(() => {
    //     db.transaction(
    //         (tx) => {
    //             tx.executeSql("insert into food (id, name, price, category) values (?, ?, ?, ?)",
    //                 ['test', 'testname', 0.50, 'testcat']);
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

    // const dropTable = () => {
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'DROP TABLE food;',
    //             [],(tx, results) => {
    //                 console.log('tabla eliminada')
    //             },
    //             (tx, error) => {
    //                 console.log(error);
    //             }
    //         )
    //     });
    // }

    const setFoodProps = (id,name) => {
        setFoodName(name)
        setFoodID(id);
    }

    const showModal = (modOperation, id, name) => {
        if(modOperation == 'delete'){
            setModalDeleteVisible(!modalDeleteVisible);
            setFoodProps(id,name);
        }else{
            setModalOperation(modOperation);
            setModalVisible(!modalVisible);
            setFoodProps(id,name);
        }
    }
    const refreshData = () => {
        getData();
    }
    

    return (
        <ScrollView style={{paddingLeft: 5, paddingRight: 5}}>
            <View style={styles.logoView}>
                <Image style={styles.logoImg} source={logo} alt="logo" />
            </View>
            <HeaderCategories handleGetData={getData} />
            <View style={styles.listTitle}>
                <Text style={{fontSize: 18, marginTop: 10}}>Listado</Text>
                <Button 
                    title='Agregar'
                    onPress={() => showModal('add', '', '')}
                />
            </View>
            <ScrollView style={{marginTop: 10}}>
                    {
                        dbRes.map((foodItem) => {
                            return (
                                <FoodItem key={foodItem.id} name={foodItem.name} price={foodItem.price}>
                                    <TouchableOpacity
                                        style={[styles.foodBtn, {marginRight: 5, backgroundColor: '#F39C12'}]}
                                        onPress={() => showModal('edit', foodItem.id, '')}
                                    >
                                        <MaterialIcon size={25} name='edit' />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.foodBtn, {backgroundColor: '#E74C3C'}]}
                                        onPress={() => showModal('delete', foodItem.id, foodItem.name)}
                                    >
                                        <FontAwIcon size={25} name='times' />
                                    </TouchableOpacity>
                                </FoodItem>
                            )
                        })
                    }
            </ScrollView>
             <ModalAddForm 
                modalVisible={modalVisible} 
                handleVisibility={showModal} 
                operation={modalOperation}
                foodId={foodID}
                refresh={refreshData}
            />
             <ModalDeleteForm 
                modalDeleteVisible={modalDeleteVisible}  
                handleVisibility={showModal}
                productId={foodID}
                productName={foodName}
                refresh={refreshData} 
            />
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
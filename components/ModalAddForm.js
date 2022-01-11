import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
import { styles } from './ModalStyles';
import SelectDropdown from 'react-native-select-dropdown';
import { openMyDatabase } from '../DataBaseConn/DataBaseConnection';

const db = openMyDatabase.getConnection();
const ModalAddForm = ({ modalVisible, handleVisibility, operation, foodId, refresh }) => {
    const [foodObject, setFoodObject] = useState({
        foodid: '',
        foodname: '',
        foodprice: '',
        foodcategory: 'desayuno'
    });
    const [dropDownIndex, setDropDownIndex] = useState(0);

    const CleanInputs = () => {
        setFoodObject({
            foodid: '',
            foodname: '',
            foodprice: '',
            foodcategory: 'desayuno'
        });
        setDropDownIndex(0);
    }

    const categories = ['desayuno', 'platano', 'carne', 'pollo', 'arroz', 'ensalada', 'bebida', 'combo'];
    const insertFood = (fID, fName, fPrice, fCategory) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into food (id, name, price, category) values (?, ?, ?, ?)",
                    [fID, fName, fPrice, fCategory ? fCategory : 'desayuno'], (tx, success) => {
                        alert('Producto Registrado Correctamente!!');
                        CleanInputs();
                        handleVisibility('add');
                        refresh(fCategory ? fCategory : 'desayuno');
                    }, (tx, error) => {
                        console.log(error);
                    });
            }
        );
    }

    const updateFood = (fID, fName, fPrice, fCategory) => {
        db.transaction(
            (tx) => {
                tx.executeSql("update food SET name=?, price=?, category=? WHERE id=?",
                    [fName, fPrice, fCategory, fID], (tx, success) => {
                        alert('Producto Actualizado Correctamente!!');
                        CleanInputs();
                        handleVisibility('edit');
                        refresh(fCategory);
                    }, (tx, error) => {
                        console.log(error);
                    });
            }
        );
    }

    useEffect(() => {
        CleanInputs();
        if (foodId != '' && operation == 'edit') {
            db.transaction(
                (tx) => {
                    tx.executeSql("select * from food where id = ?", [foodId], (_, { rows: { _array } }) => {
                        setFoodObject({
                            foodid: _array[0].id,
                            foodname: _array[0].name,
                            foodprice: _array[0].price.toFixed(2).toString(),
                            foodcategory: _array[0].category.toString()
                        });
                        if (_array[0].category == 'desayuno') setDropDownIndex(0)
                        else if (_array[0].category == 'platano') setDropDownIndex(1)
                        else if (_array[0].category == 'carne') setDropDownIndex(2)
                        else if (_array[0].category == 'pollo') setDropDownIndex(3)
                        else if (_array[0].category == 'arroz') setDropDownIndex(4)
                        else if (_array[0].category == 'ensalada') setDropDownIndex(5)
                        else if (_array[0].category == 'bebida') setDropDownIndex(6)
                        else if (_array[0].category == 'combo') setDropDownIndex(7)

                    },
                        (tx, error) => console.log(error));
                },
            );
        }
    }, [foodId])

    

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
                                <Text
                                    style={[styles.modalText, { color: '#fff' }]}
                                >
                                    {operation == 'add' ? 'Agregar Producto' : 'Editar Producto'}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 2, width: '100%', padding: 20 }}>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>ID</Text>
                                <TextInput
                                    style={[styles.formTInput, { marginTop: 5 }]}
                                    value={foodObject.foodid}
                                    onChangeText={(text) => setFoodObject({
                                        ...foodObject,
                                        foodid: text
                                    })}
                                />
                            </View>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>Nombre</Text>
                                <TextInput
                                    style={[styles.formTInput, { marginTop: 5 }]}
                                    value={foodObject.foodname}
                                    onChangeText={(text) => setFoodObject({
                                        ...foodObject,
                                        foodname: text
                                    })}
                                />
                            </View>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>Precio</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={styles.formLabel}>$</Text>
                                    <TextInput
                                        style={[styles.formTInput, { width: 60, marginLeft: 6 }]}
                                        keyboardType="numeric"
                                        value={foodObject.foodprice}
                                        onChangeText={(text) => setFoodObject({
                                            ...foodObject,
                                            foodprice: text
                                        })}
                                    />
                                </View>
                            </View>
                            <View style={styles.formItem}>
                                <Text style={styles.formLabel}>Categoria</Text>
                                {
                                    foodId == 'dev' ? 
                                        <Text>Delivery</Text>
                                        :
                                        <SelectDropdown
                                            defaultValueByIndex={dropDownIndex}
                                            buttonStyle={styles.formSelector}
                                            buttonTextStyle={{ fontSize: 15 }}
                                            data={categories}
                                            onSelect={(selectedItem) => {
                                                setFoodObject({
                                                    ...foodObject,
                                                    foodcategory: selectedItem
                                                })
                                            }}
                                        />

                                }

                            </View>
                        </View>
                        <View style={styles.modalBtnView}>
                            <TouchableOpacity
                                style={[{ backgroundColor: '#000' }, styles.modalBtn]}
                                onPress={
                                    operation == 'add' ?
                                        () => insertFood(
                                            foodObject.foodid,
                                            foodObject.foodname,
                                            foodObject.foodprice,
                                            foodObject.foodcategory
                                        )
                                        :
                                        () => updateFood(
                                            foodObject.foodid,
                                            foodObject.foodname,
                                            foodObject.foodprice,
                                            foodObject.foodcategory
                                        )
                                }
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
export default ModalAddForm;
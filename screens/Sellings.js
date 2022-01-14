import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { openMyDatabase } from '../DataBaseConn/DataBaseConnection';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const db = openMyDatabase.getConnection();
const Sellings = () => {
    const [sellingsList, setSellingsList] = useState([]);
    const [dateState, setDateState] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [isShown, setIsShown] = useState(false);
    const [isDateViewShown, setIsDateViewShown] = useState(false);
    const [totalSelling, setTotalSelling] = useState(0);
    const [dateOne, setDateOne] = useState('');
    const [dateTwo, setDateTwo] = useState('');
    const [whichDate, setWhichDate] = useState(1);

    const formatDate = (year, month, day) => {
        month < 10 ? month = '0' + month : month;
        day < 10 ? day = '0' + day : day;
        let formatedDate = year + '-' + month + '-' + day;
        return formatedDate;
    }

    const getSellings = () => {
        const currentDate = new Date();
        let today = formatDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        db.transaction(
            (tx) => {
                tx.executeSql("select id, Date(selldate) as date, total from sellings where Date(selldate) = ?",
                    [today], (_, { rows: { _array } }) => {
                        setSellingsList(_array);
                        setTotalSelling(0);
                    }, (tx, error) => {
                        console.log(error);
                    });
            }
        );
        // db.transaction(
        //     (tx) => {
        //         tx.executeSql(`delete from sellings;`, [], (tx, success) => {
        //             alert('registros eliminados Correctamente!!');
        //         }, (tx, error) => {
        //             console.log(error);
        //         });
        //     }
        // )
    }

    const getSellingsByDate = (initialDate, finalDate) => {
        const currentDate = new Date();
        let today = formatDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        db.transaction(
            (tx) => {
                if(initialDate && !finalDate){
                    tx.executeSql("select id, Date(selldate) as date, total from sellings where Date(selldate) = ?",
                    [initialDate], (_, { rows: { _array } }) => {
                        setSellingsList(_array);
                        setTotalSelling(0);
                    }, (tx, error) => {
                        console.log(error);
                    });
                }else if(initialDate && finalDate){
                    tx.executeSql("select id, Date(selldate) as date, total from sellings where Date(selldate) between ? and ? order by Date(selldate)",
                    [initialDate, finalDate], (_, { rows: { _array } }) => {
                        setSellingsList(_array);
                        setTotalSelling(0);
                    }, (tx, error) => {
                        console.log(error);
                    });
                }      
            }
        );
    }

    useEffect(() => {
        setTotalSelling(0);
        let totalAmount = 0;
        sellingsList.map((rowItem) => {
            totalAmount += rowItem.total;
        });
        setTotalSelling(totalAmount);
    }, [sellingsList]);

    useEffect(() => {
        if (!isDateViewShown) {
            setDateOne('');
            setDateTwo('');
        }
    }, [isDateViewShown]);

    const onChangeDate = (datepicked, dateVariable) => {
        if (datepicked.type != 'dismissed') {
            let incomingDate = datepicked.nativeEvent.timestamp;
            let dateWithFormat = formatDate(incomingDate.getFullYear(), incomingDate.getMonth() + 1, incomingDate.getDate());
            setIsShown(false);
            dateVariable == 1 ? setDateOne(dateWithFormat) : setDateTwo(dateWithFormat);
        }

    }

    const cleanSellingList = () => {
        setSellingsList([]);
        setTotalSelling(0);
    }

    const handleDataByDate = () => {
        if(dateOne != '' && dateTwo == ''){
            getSellingsByDate(dateOne);
        }else if(dateOne != '' && dateTwo != ''){
            getSellingsByDate(dateOne, dateTwo);
        }else{
            alert('Debe ingresar una o ambas fechas');
        }
    }

    return (
        <ScrollView style={{ paddingLeft: 5, paddingRight: 5 }}>
            <View style={styles.headerView}>
                <Text style={{ fontSize: 20 }}>Listado de Ventas</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                <TouchableOpacity
                    style={[styles.dateSellingsBtn, { marginRight: 2 }]}
                    onPress={getSellings}
                >
                    <Text>Venta de Hoy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.dateSellingsBtn, { marginLeft: 2 }]}
                    onPress={() => setIsDateViewShown(!isDateViewShown)}
                >
                    <Text>Venta por Fecha</Text>
                </TouchableOpacity>
            </View>
            <View display={isDateViewShown ? 'flex' : 'none'}>
                <View style={styles.dateDisplayView}>
                    <View style={styles.ViewDate}>
                        <MaterialCIcon name="calendar-week-begin" size={30} />
                        <Text style={{ marginLeft: 20 }}>{dateOne}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.viewDateBtn}
                        onPress={() => {
                            setIsShown(true);
                            setWhichDate(1);
                        }}
                    >
                        <Text>Seleccionar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dateDisplayView}>
                    <View style={styles.ViewDate}>
                        <MaterialCIcon name="calendar-weekend" size={30} />
                        <Text style={{ marginLeft: 20 }}>{dateTwo}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.viewDateBtn}
                        onPress={() => {
                            setIsShown(true);
                            setWhichDate(2);
                        }}
                    >
                        <Text>Seleccionar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.viewDateAcept}
                        onPress={handleDataByDate}
                    >
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.totalAmountView}>
                <Text style={styles.fontText}>La venta total es:</Text>
                <Text style={[styles.fontText, { fontWeight: 'bold' }]}>{' $ ' + totalSelling.toFixed(2)}</Text>
            </View>
            <View>
                {
                    isShown && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={(datepicked) => onChangeDate(datepicked, whichDate)}
                        />
                    )
                }
            </View>
            <View style={styles.listHeader}>
                <Text style={{ fontSize: 17, marginTop: 10 }}>Listado de Ventas</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.listBtn}
                        onPress={cleanSellingList}
                    >
                        <MaterialCIcon name="broom" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listData}>
                <View style={styles.dataItem}>
                    <View style={[styles.dataColH, styles.Col1]}>
                        <Text >No.</Text>
                    </View>
                    <View style={[styles.dataColH, styles.Col2]}>
                        <Text >Fecha</Text>
                    </View>
                    <View style={[styles.dataColH, styles.Col3]}>
                        <Text >Total</Text>
                    </View>
                </View>
                {
                    sellingsList.map((item, i) => {
                        return (
                            <View key={item.id} style={styles.dataItem}>
                                <View style={[styles.dataCol, styles.Col1]}>
                                    <Text>{i + 1}</Text>
                                </View>
                                <View style={[styles.dataCol, styles.Col2]}>
                                    <Text>{item.date}</Text>
                                </View>
                                <View style={[styles.dataCol, styles.Col3]}>
                                    <Text>{'$ ' + item.total.toFixed(2)}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerView: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    dateSellingsBtn: {
        width: '45%',
        height: 60,
        backgroundColor: '#fbc105',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    dateDisplayView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    ViewDate: {
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center'
    },
    viewDateBtn: {
        height: 40,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E67E22'
    },
    viewDateAcept: {
        width: 120,
        height: 50,
        backgroundColor: '#82E0AA',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 10
    },
    totalAmountView: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    fontText: {
        fontSize: 20
    },
    cleanSellingsBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listHeader: {
        width: '100%',
        height: 60,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#000'
    },
    listBtn: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbc105',
        marginRight: 10,
        borderRadius: 10
    },
    listData: {
        width: '100%'
    },
    dataItem: {
        width: '100%',
        backgroundColor: '#f0f',
        flexDirection: 'row'
    },
    dataColH: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#D7DBDD"
    },
    dataCol: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    Col1: {
        width: '15%'
    },
    Col2: {
        width: '60%'
    },
    Col3: {
        width: '25%'
    }
});

export default Sellings;
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        height: 470,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalViewDelete: {
        width: 300,
        height: 230,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        flexDirection: 'row',
        width: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#000'
    },
    buttonClose: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    formItem: {
        marginTop: 10
    },
    formLabel: {
        fontSize: 18
    },
    formTInput: {
        backgroundColor: '#D7DBDD',
        height: 35,
        padding: 10,
        borderRadius: 10
    },
    formSelector: {
        backgroundColor: '#D7DBDD',
        height: 35,
        borderRadius: 10,
        marginTop: 5
    },
    modalText: {
        textAlign: "center",
        fontSize: 20,

    },
    modalBtnView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    modalBtnViewCenter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        paddingLeft: 10
    },
    modalBtn: {
        marginRight: 10,
        height: 50,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});
import { View, StyleSheet, Text } from "react-native";
const FoodItem = ({name, price, children}) => {
    return (
        <View style={styles.foodView}>
            <View style={styles.foodName}>
                <Text >{name}</Text>
            </View>
            <View style={styles.foodPrice}>
                <Text >{'$ ' + price.toFixed(2)}</Text>
            </View>
            {children}
        </View>
    )
}

export default FoodItem;

const styles = StyleSheet.create({
    foodView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 5,
        height: 50
    },
    foodName: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    foodPrice: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
});
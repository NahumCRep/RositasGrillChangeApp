import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
    return(
        <View style={styles.sBarContainer}>
            <Icon size={25} name='search' />
            <TextInput placeholder='buscar alimento' />
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    sBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'red',
    }
});
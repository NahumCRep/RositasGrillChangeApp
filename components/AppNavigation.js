import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import { Home, Food, Cart } from '../screens';

const TabOptions = {
    home:{
        title: ({focused}) => 
            <Icon 
                size={30} 
                name={focused ? 'home' : 'home-outline'}
                color= {focused ? '#D68910' : '#212F3D'} 
            />,
    },
    food:{
        title: ({focused}) => 
            <Icon 
                size={30} 
                name={focused ? 'fast-food' : 'fast-food-outline'}
                color= {focused ? '#D68910' : '#212F3D'} 
            />,
    },
    cart:{
        title: ({focused}) => 
            <Icon 
                size={30} 
                name={focused ? 'cart' : 'cart-outline'}
                color= {focused ? '#D68910' : '#212F3D'} 
            />,
    }         
}
const Tab = createMaterialTopTabNavigator();
const AppNavigation = () => {
    return (
        <Tab.Navigator 
            initialRouteName="Home" 
            style={{ paddingTop: Constants.statusBarHeight }}
            screenOptions={{
                tabBarItemStyle: { height: 60 },
                tabBarIndicatorStyle: {
                    backgroundColor: '#D68910',
                },
            }}
        >
            <Tab.Screen options={TabOptions.home} name="Home" component={Home} />
            <Tab.Screen options={TabOptions.food} name="Food" component={Food} />
            <Tab.Screen options={TabOptions.cart} name="Order" component={Cart} />
        </Tab.Navigator>
    )
}

export default AppNavigation;
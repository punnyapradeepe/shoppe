import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../Screens/HomeScreen';
import WishListScreen from './../Screens/WishListScreen';
import CategoriesScreen from './../Screens/CategoriesScreen';
import ShopScreen from './../Screens/ShopScreen';
import ProfileScreen from './../Screens/ProfileScreen';
import ActivityScreen from '../Screens/ActivityScreen';
import { HomeImg, Heart, Document, Shopping, AccountImg } from '../Utils/SvgIcons';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllCategories from '../Screens/AllCategories';
import FlashSale from '../../Components/FlashSale';
import FlashSaleScreen from '../Screens/FlashSaleScreen';
import ShippingAddressScreen from '../Screens/ShippingAddressScreen';
import PaymentScreen from '../Screens/PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack= createNativeStackNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name='Activity'
        component={ActivityStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <HomeImg width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Wishlist'
        component={WishListScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Heart width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Document width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Shop'
        component={ShopScreenStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Shopping width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AccountImg width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      

    </Tab.Navigator>
  );
};


const ActivityStack=()=>(

<Stack.Navigator initialRouteName="activity">
<Stack.Screen name="activity" component={ActivityScreen} options={{ headerShown: false }}/>
<Stack.Screen name="allc" component={AllCategories} options={{ headerShown:false}}/>
<Stack.Screen name="flashSale" component={FlashSaleScreen} options={{ headerShown:false}}/>

</Stack.Navigator>

)

const ShopScreenStack=()=>(
<Stack.Navigator initialRouteName="shop">
<Stack.Screen name="shop" component={ShopScreen} options={{ headerShown: false }}/>
<Stack.Screen name="shippingAddr" component={ShippingAddressScreen} options={{ headerShown:false}}/>
<Stack.Screen name="payment" component={PaymentScreen} options={{ headerShown:false}}/>
</Stack.Navigator>
)

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
});

export default TabNavigation;

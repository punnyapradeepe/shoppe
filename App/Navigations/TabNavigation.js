import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { HomeImg, Heart, Document, Shopping, AccountImg } from '../Utils/SvgIcons';
import ActivityScreen from '../Screens/ActivityScreen';
import WishListScreen from './../Screens/WishListScreen';
import CategoriesScreen from './../Screens/CategoriesScreen';
import ShopScreen from './../Screens/ShopScreen';
import ProfileScreen from './../Screens/ProfileScreen';
import AllCategories from '../Screens/AllCategories';
import FlashSaleScreen from '../Screens/FlashSaleScreen';
import ShippingAddressScreen from '../Screens/ShippingAddressScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import PaymentMethod from './../Screens/PaymentMethod';
import Shipping from '../Screens/Shipping';
import MyProfile from '../Screens/MyProfile';
import MostPopularDetail from '../Screens/MostPopularDetail';
import JustForYou from '../../Components/JustForYou';
import JustForYouDetail from '../Screens/JustForYouDetail';
import clothingScreen from '../Screens/clothingScreen';
import NewItemDetail from '../Screens/NewItemDetail';
import orderDetailScreen from '../Screens/orderDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate('Wishlist');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Wishlist' }],
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Heart width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Categoriesstack'
        component={CategoriesStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault(); 
            navigation.navigate('Categoriesstack');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Categoriesstack' }],
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Document width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Shop'
        component={ShopScreenStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate('Shop');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Shop' }],
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Shopping width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreenStack}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault(); 
            navigation.navigate('Profile');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Profile' }],
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AccountImg width={size} height={size} fill={focused ? 'black' : 'blue'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ActivityStack = () => (
  <Stack.Navigator initialRouteName="activity">
    <Stack.Screen name="activity" component={ActivityScreen} options={{ headerShown: false }} />
    <Stack.Screen name="allc" component={AllCategories} options={{ headerShown: false }} />
    <Stack.Screen name="flashSale" component={FlashSaleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="populardetail" component={MostPopularDetail} options={{ headerShown: false }} />
    <Stack.Screen name="justforyou" component={JustForYou} options={{ headerShown: false }} />
    <Stack.Screen name="justforyoudetail" component={JustForYouDetail} options={{ headerShown: false }} />
    <Stack.Screen name="clothing" component={clothingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NewItemDetail" component={NewItemDetail} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ShopScreenStack = () => (
  <Stack.Navigator initialRouteName="shop">
    <Stack.Screen name="shop" component={ShopScreen} options={{ headerShown: false }} />
    <Stack.Screen name="shippingAddr" component={ShippingAddressScreen} options={{ headerShown: false }} />
    <Stack.Screen name="payment" component={PaymentScreen} options={{ headerShown: false }} />
    <Stack.Screen name="orderscreen" component={orderDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ProfileScreenStack = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="paymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
    <Stack.Screen name="Shipping" component={Shipping} options={{ headerShown: false }} />
    <Stack.Screen name="myprofile" component={MyProfile} options={{ headerShown: false }} />
    <Stack.Screen name="orderscreen" component={orderDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator initialRouteName="Categoriesstack">
    <Stack.Screen name="allc" component={AllCategories} options={{ headerShown: false }} />
    <Stack.Screen name="clothing" component={clothingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="justforyoudetail" component={JustForYouDetail} options={{ headerShown: false }} />
    <Stack.Screen name="populardetail" component={MostPopularDetail} options={{ headerShown: false }} />
    <Stack.Screen name="flashSale" component={FlashSaleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NewItemDetail" component={NewItemDetail} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
});

export default TabNavigation;

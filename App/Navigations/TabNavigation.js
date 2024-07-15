import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../Screens/HomeScreen';
import WishListScreen from './../Screens/WishListScreen';
import CategoriesScreen from './../Screens/CategoriesScreen';
import ShopScreen from './../Screens/ShopScreen';
import ProfileScreen from './../Screens/ProfileScreen';
import ActivityScreen from '../Screens/ActivityScreen';
import { Feather } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { AccountImg, Document, Heart, HomeImg, Shopping } from '../Utils/SvgIcons'; 


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
    
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
        
      }}
    >
      <Tab.Screen
        name='Activity'
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color, size,focused }) => (
            <HomeImg width={size} height={size} fill={focused?'black':'blue'} />
          ),
        }}
      />
      <Tab.Screen name='wishList' component={WishListScreen} 
      options={{
         tabBarIcon: ({ color, size }) => (
          <Heart width={size} height={size} fill={color} />
        ),
      }}
    />
      <Tab.Screen name='categories' component={CategoriesScreen} 
       options={{
        tabBarIcon: ({ color, size }) => (
         <Document width={size} height={size} fill={color} />
       ),
     }}
   />
      <Tab.Screen name='shop' component={ShopScreen} 
       options={{
        tabBarIcon: ({ color, size }) => (
         <Shopping width={size} height={size} fill={color} />
       ),
     }}
   />
      <Tab.Screen name='profile' component={ProfileScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
         <AccountImg width={size} height={size} fill={color} />
       ),
     }}
   />
    </Tab.Navigator>
  );
}

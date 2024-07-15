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

const Tab = createBottomTabNavigator();

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
        component={ActivityScreen}
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
        component={ShopScreen}
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
});

export default TabNavigation;

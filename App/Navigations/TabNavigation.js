import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
    }}>
      <Tab.Screen name='home' component={HomeNavigation}
      options={{
        tabBarLabel:({color})=>(
          <Text style={{color:color,fontSize:12,marginTop:-7}}>Home</Text>
        ),
        tabBarIcon:({color,size})=>(
          <FontAwesome5 name="home" size={24} color={color} />
        )
      }}/>

      <Tab.Screen name='booking' component={Booking}
       options={{
        tabBarLabel:({color})=>(
          <Text  style={{color:color,fontSize:12,marginTop:-7}}>Booking</Text>),
          tabBarIcon:({color,size})=>(
            <Entypo name="bookmark" size={24} color={color} />
          )
      }}/>

<Tab.Screen name='profile' component={Profile}
       options={{
        tabBarLabel:({color})=>(
          <Text  style={{color:color,fontSize:12,marginTop:-7}}>Profile</Text>
        ),
        tabBarIcon:({color})=>(
          <MaterialCommunityIcons name="account-circle-outline" size={24} color={color}  />
        )
         
      }}
      />
      
    </Tab.Navigator>
  )
}
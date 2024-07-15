import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from '../Navigations/TabNavigation'

export default function MyActivityScreen() {
  return (
    <View style={{flex:1}}>
     
      <NavigationContainer independent={true}>
        <TabNavigation/>
      </NavigationContainer>
      
    </View>
  )
}
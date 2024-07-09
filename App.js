import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CreateAcc from './App/Screens/CreateAcc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

let customFonts = {
  'Raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
  'RalewayM': require('./assets/Fonts/Raleway-Medium.ttf'),
  'RalewayEL': require('./assets/Fonts/Raleway-ExtraBold.ttf'),
  'RalewayB': require('./assets/Fonts/Raleway-Bold.ttf'),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="createAcc" component={CreateAcc} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

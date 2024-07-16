import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CreateAcc from './App/Screens/CreateAcc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './App/Screens/SigninScreen';
import PasswordScreen from './App/Screens/PasswordScreen';
import ForgotScreen from './App/Screens/ForgotScreen';
import RecoveryScreen from './App/Screens/RecoveryScreen';
import SetPassword from './App/Screens/SetPassword';
import HomeScreen from './App/Screens/HomeScreen';
import MyActivityScreen from './App/Screens/MyActivityScreen';
import AllCategories from './App/Screens/AllCategories'
import Categories from './Components/Categories';
import TabNavigation from './App/Navigations/TabNavigation';


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
        <Stack.Screen name="signIn" component={SigninScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="password" component={PasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="forgot" component={ForgotScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="recovery" component={RecoveryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="setPass" component={SetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="activity" component={TabNavigation} options={{ headerShown: false }}/>
        
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
        <Stack.Screen name="allc" component={AllCategories} options={{ headerShown: false }}/>

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

import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen';
import { useFonts } from 'expo-font';

let customFonts = {
  'Raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
  'RalewayM':require('./assets/Fonts/Raleway-Medium.ttf'),
  'RalewayEL':require('./assets/Fonts/Raleway-ExtraBold.ttf'),
  'RalewayB':require('./assets/Fonts/Raleway-Bold.ttf')
};
export default function App() {
  const [isLoaded] = useFonts(customFonts);

  return (
    <>
    {isLoaded?<View style={styles.container}>
      <LoginScreen/>
      <StatusBar style="auto" />
    </View>:
    <ActivityIndicator />}
    </>
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

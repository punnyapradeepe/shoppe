import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.ellipse}>
        <Image source={require('./../../assets/Images/loginImg.png')} style={styles.loginImg} />
      </View>
      <Text style={styles.text}>Shoppe</Text>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Text>Beautiful eCommerce UI Kit</Text>
        <Text style={{ padding: 10 }}>for your online store</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('createAcc')}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 50 }}>
          <Text style={{ padding: 10 }}>I already have an account</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipse: {
    width: 134,
    height: 134,
    borderRadius: 67,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImg: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 50,
    paddingTop: 10,
  },
  button: {
    height: 61,
    width: 330,
    marginTop: 63,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'Regular',
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

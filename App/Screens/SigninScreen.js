import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { HeartImg } from './../../App/Utils/SvgIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const url = `http://192.168.1.40:5000/users?email=${encodeURIComponent(email)}`; 

    let hasError = false;

    if (!email) {
      setEmailError('Enter your email');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(url);
      const users = await response.json();
console.log("users",users[0].id);
await AsyncStorage.setItem('userid',users[0].id)
      if (users.length > 0) {
  

        const userId = users[0].id;
        navigation.navigate('password'); 
      } else {
        setEmailError('Email does not exist');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'There was a problem checking your email');
    }
  };

  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ position: 'absolute', resizeMode: 'contain' }}
            source={require('./../../assets/Images/bubble 02.png')}
          />
          <Image
            style={{ position: 'absolute', resizeMode: 'contain' }}
            source={require('./../../assets/Images/bubble 03.png')}
          />
        </View>
        <View style={{ right: 0, top: '35%', position: 'absolute' }}>
          <Image
            style={{}}
            source={require('./../../assets/Images/bubble 04.png')}
          />
        </View>
      </View>
      <View style={{ position: 'absolute', resizeMode: 'contain', bottom: 0, right: 0 }}>
        <Image
          source={require('./../../assets/Images/bubble 05.png')}
        />
      </View>

      <View style={{ position: 'absolute', top: 350, width: '90%', marginHorizontal: 20 }}>
        <Text style={styles.text}>Login</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ fontSize: 17, paddingTop: 10 }}>Good to see you back! </Text>
          <View style={{ paddingTop: 10 }}>
            <HeartImg />
          </View>
        </View>
        <TextInput
          placeholder='Email'
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{ alignSelf: 'center' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 30,
    color: Colors.BLACK,
    height: 50,
    width: '100%',
  },
  button: {
    height: 61,
    width: "100%",
    marginTop: 40,
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
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});

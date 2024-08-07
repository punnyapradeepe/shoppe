import React, { useState } from 'react';
import { 
  View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, 
  KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
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
      if (users.length > 0) {
        const userId = users[0].id;
        await AsyncStorage.setItem('userid', userId);
        Alert.alert('Success', 'Logged in successfully', [
          { text: 'OK', onPress: () => navigation.navigate('password') },
        ]);
      } else {
        setEmailError('Email does not exist');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'There was a problem checking your email');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.backgroundImages}>
            <Image
              style={styles.bubbleImage1}
              source={require('./../../assets/Images/bubble 02.png')}
            />
            <Image
              style={styles.bubbleImage2}
              source={require('./../../assets/Images/bubble 03.png')}
            />
          </View>
          <View style={styles.bubbleImage3}>
            <Image
              source={require('./../../assets/Images/bubble 04.png')}
            />
          </View>
          <View style={styles.bubbleImage4}>
            <Image
              source={require('./../../assets/Images/bubble 05.png')}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Login</Text>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Good to see you back! </Text>
              <HeartImg />
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
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20, // Adjust this padding if needed
  },
  content: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  backgroundImages: {
    flex: 1,
    position: 'relative',
  },
  bubbleImage1: {
    position: 'absolute',
    resizeMode: 'contain',
    marginBottom: 'auto',
  },
  bubbleImage2: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  bubbleImage3: {
    right: 0,
    top: '35%',
    position: 'absolute',
  },
  bubbleImage4: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  formContainer: {
    position: 'relative', 
    marginHorizontal: 20,
  
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    color: Colors.BLACK,
    height: 50,
    width: '100%',
  },
  button: {
    height: 61,
    width: '100%',
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
  greetingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  greetingText: {
    fontSize: 17,
    paddingTop: 10,
  },
  cancelText: {
    alignSelf: 'center',
  },
});

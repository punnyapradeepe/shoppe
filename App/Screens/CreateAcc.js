import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Colors from '../Utils/Colors';
import { ShowPassword } from '../Utils/SvgIcons'; 
import { useNavigation } from '@react-navigation/core';

const CreateAcc = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const navigation = useNavigation();

  const handleCreateAccount = async () => {
    let hasError = false;

    // Validate input fields
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError('Enter a valid email');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
      hasError = true;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError('Enter a valid 10-digit phone number');
      hasError = true;
    } else {
      setPhoneNumberError('');
    }

    if (hasError) {
      return; 
    }

    try {
    
      const checkEmailUrl = `http://192.168.1.40:5000/users?email=${encodeURIComponent(email)}`;
      const emailResponse = await fetch(checkEmailUrl);
      if (!emailResponse.ok) {
        throw new Error('Failed to check email existence');
      }

      const emailData = await emailResponse.json();
      const userExists = emailData.length > 0;

      if (userExists) {
        setEmailExists(true);
        return;
      } else {
        setEmailExists(false);
      }

     
      const createUserUrl = 'http://192.168.1.40:5000/users';
      const response = await fetch(createUserUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, phoneNumber }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('signIn');
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error creating account');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image style={{ marginLeft: 'auto', marginBottom: 'auto' }} source={require('./../../assets/Images/bubble 01 (2).png')} />
        <View style={styles.container}>
          <Text style={styles.text}>Create</Text>
          <Text style={styles.text}>Account</Text>
          <Image style={styles.uploadPhoto} source={require('./../../assets/Images/Upload Photo.png')} />
          <TextInput
            placeholder='Email'
            style={styles.textInput}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailExists(false);
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          {emailExists && !emailError ? <Text style={styles.errorText}>Email already exists</Text> : null}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='Password'
              style={styles.passwordInput}
              secureTextEntry={true} 
              value={password}
              onChangeText={setPassword}
            />
            <ShowPassword style={styles.eyeIcon} />
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <View style={styles.numberSection}>
            <View style={styles.imageContainer}>
              <Image style={styles.indiaIcon} source={require('./../../assets/Images/india.png')} />
            </View>
            <TextInput
              placeholder='Your number'
              style={styles.textInputNum}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType='numeric'
            />
          </View>
          {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: Colors.WHITE }} onPress={() => navigation.navigate('LoginScreen')}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    marginBottom: 80,
    paddingHorizontal: '10%',
    width: '100%',
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
  },
  uploadPhoto: {
    width: 90,
    height: 90,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    color: Colors.BLACK,
    height: 50,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: Colors.BLACK,
    height: 50,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  numberSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginRight: 10,
  },
  indiaIcon: {
    width: 24,
    height: 24,
  },
  textInputNum: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    color: Colors.BLACK,
    height: 50,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  button: {
    height: 61,
    width: 330,
    marginTop: 30,
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

export default CreateAcc;

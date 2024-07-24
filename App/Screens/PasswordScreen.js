import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import Colors from '../Utils/Colors';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function PasswordScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Top-left corner images */}
      <View style={[styles.imageContainer, styles.bubbleContainer]}>
        <Image
          style={styles.bubbleImage}
          source={require('./../../assets/Images/bubble 02.png')}
        />
      </View>
      <View style={[styles.imageContainer, styles.bubbleContainer, { marginTop: 50 }]}>
        <Image
          style={styles.bubbleImage}
          source={require('./../../assets/Images/bubble 03.png')}
        />
      </View>

      {/* Centered content */}
      <View style={styles.content}>
        <View style={styles.centeredContent}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('./../../assets/Images/artist-2 1 (1).png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.greetingText}>Hello, Romina !!</Text>
          <Text style={styles.passwordText}>Type your password</Text>

          <View style={styles.passwordInputContainer}>
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={styles.input}
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={styles.input}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('home')}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.notYouContainer}>
            <Text>Not you?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('signIn')} style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bubbleContainer: {
    zIndex: -1, // Ensures images stay behind other content
  },
  bubbleImage: {
    resizeMode: 'contain',
  },
  content: {
    alignItems: 'center',
    position: 'relative',
  },
  centeredContent: {
    alignItems: 'center',
    marginTop: '20%',
    marginLeft: '10%',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    borderRadius: 99,
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  passwordText: {
    marginTop: 20,
    fontSize: 17,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 40,
    height: 40,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  forgotPasswordText: {
    marginTop: 20,
  },
  continueButton: {
    marginTop: 50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 300,
  },
  continueButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  notYouContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '25%',
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

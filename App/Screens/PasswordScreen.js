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

      <View style={[styles.imageContainer, styles.bubbleContainer]}>
        <Image
          style={styles.bubbleImage}
          source={require('./../../assets/Images/bubble 02.png')}
        />
      </View>
      <View style={[styles.imageContainer, styles.bubbleContainer]}>
        <Image
          style={styles.bubbleImage}
          source={require('./../../assets/Images/bubble 03.png')}
        />
      </View>

    
      <View style={styles.content}>
        <View style={styles.centeredContent}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('./../../assets/Images/artist-2 1 (1).png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.greetingText}>Hello, Romina !!</Text>
        

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='Enter your Password here'
            
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
    top: 0,
    left: 0,
  },
  bubbleContainer: {
    zIndex: -1, 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 50,
    paddingVertical:10
  },
  bubbleImage: {
    resizeMode: 'contain',
    marginTop:0
  },
  bubbleImage2: {
    resizeMode: 'contain',
    marginTop:0
  },
  content: {
    alignItems: 'center',
    position: 'relative',
  },
  centeredContent: {
    alignItems: 'center',
    
  },
  profileImageContainer: {
    position: 'relative',
     marginTop:100
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
    marginTop: 100,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingVertical: 20,
    paddingHorizontal: 150,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  continueButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  notYouContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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

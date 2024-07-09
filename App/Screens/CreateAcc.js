import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';
import { ShowPassword } from '../Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';

export default function CreateAcc() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{ position: 'relative' }}>
        <Image style={{width: '100%'}} source={require('./../../assets/Images/Bubbles.png')} />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Create</Text>
        <Text style={styles.text}>Account</Text>
        <Image style={styles.uploadPhoto} source={require('./../../assets/Images/Upload Photo.png')} />
        <TextInput placeholder='Email' style={styles.textInput} />
        <View style={styles.passwordContainer}>
          <TextInput placeholder='Password' style={styles.passwordInput} />
        
          <ShowPassword />
         
        </View>
        <View style={styles.numberSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.indiaIcon} source={require('./../../assets/Images/india.png')} />
          </View>
          <TextInput placeholder='Your number' style={styles.textInputNum} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:Colors.WHITE}} onPress={() => navigation.navigate('LoginScreen')}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:Colors.WHITE
  },
  container: {
    paddingHorizontal: '10%',
    position: 'absolute',
    top: 150,
    width: '100%',
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
  },
  uploadPhoto: {
    marginTop: 40,
    width: 90,
    height: 90,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    color: Colors.BLACK,
    height:50
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
    height:50
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
    height:50
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom:20,

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
 
});

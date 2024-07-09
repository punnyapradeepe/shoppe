import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';

export default function CreateAcc() {
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
          <Image style={styles.eyeIcon} source={require('./../../assets/Images/eye-slash.png')} />
        </View>
        <View style={styles.numberSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.phoneIcon} source={require('./../../assets/Images/india.png')} />
          </View>
          <TextInput placeholder='Your number' style={styles.textInputNum} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <Text style={styles.cancelText}>Cancel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
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
    width: 50, // width to match the aspect ratio of the image
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginRight: 10,
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
  textInputNum: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    color: Colors.BLACK,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  button: {
    height: 61,
    width: 330,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'Regular',
  },
  cancelText: {
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/core';

export default function RecoveryScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImagesContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('./../../assets/Images/bubble 02 (1).png')}
        />
        <Image
          style={[styles.backgroundImage, styles.backgroundImageOverlay]}
          source={require('./../../assets/Images/bubble 01 (2).png')}
        />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('./../../assets/Images/ellipse.png')} style={styles.ellipseImage} />
        <Image
          source={require('./../../assets/Images/artist-2 1 (1).png')}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.subtitle}>Enter 4-digit code we sent you</Text>
        <Text style={styles.subtitle}>to your phone number</Text>
        <Text style={{ fontWeight: 'bold', paddingTop: 20, fontSize: 17 }}>+91********00</Text>
      </View>

      <View style={styles.container2}>
        <TextInput keyboardType='numeric' maxLength={1} style={styles.input} />
        <TextInput keyboardType='numeric' maxLength={1} style={styles.input} />
        <TextInput keyboardType='numeric' maxLength={1} style={styles.input} />
        <TextInput keyboardType='numeric' maxLength={1} style={styles.input} />
      </View>

      <TouchableOpacity style={styles.nextButton1} onPress={() => navigation.navigate('setPass')}>
        <Text style={styles.buttonText}>Send Again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('password')} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    alignItems: 'center',
    paddingTop: 40, 
  },
  backgroundImagesContainer: {
    position: 'absolute',
    marginRight:'auto',
    right:0
  },
  backgroundImage: {
    resizeMode: 'contain',
    right:0
  },
  backgroundImageOverlay: {
    position: 'absolute',
   
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: '20%', 
  },
  ellipseImage: {
    position: 'relative',
  },
  profileImage: {
    position: 'absolute',
    top: 12,
    borderRadius: 99,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  container2: {
    flexDirection: 'row',
    gap: 10, 
    alignItems: 'center',
    marginTop: 20, 
    marginBottom: 100, 
  },
  input: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 17,
  },
  nextButton1: {
    marginTop: 30, 
    backgroundColor: '#FF1493',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'Regular',
  },
  cancelButton: {
    marginTop: 20, 
  },
  cancelText: {
    color: 'black',
    fontSize: 16,
    
  },
});

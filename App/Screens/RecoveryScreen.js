import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
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
        <Text style={styles.subtitle}>Enter 4-digits code we sent you</Text>
        <Text style={styles.subtitle}>on your phone number</Text>
        <Text style={{fontWeight:'bold',paddingTop:20,fontSize:17}}>+91********00</Text>
      </View>

      <View style={styles.container2}>
          <TextInput keyboardType='numeric' maxLength={1} style={styles.input} />
          <TextInput  keyboardType='numeric' maxLength={1}  style={styles.input} />
          <TextInput  keyboardType='numeric' maxLength={1}  style={styles.input} />
          <TextInput  keyboardType='numeric' maxLength={1}  style={styles.input} />
        </View>

        <TouchableOpacity style={styles.nextButton1} onPress={()=>navigation.navigate('setPass')}>
        <Text style={styles.buttonText}>Send Again</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => navigation.navigate('password')}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.WHITE,
    flex: 1,
    alignItems: 'center',
  },
  backgroundImagesContainer: {
    position: 'relative',
    width: '100%',
    left: '20%',
  },
  backgroundImage: {
    resizeMode: 'contain',
  },
  backgroundImageOverlay: {
    position: 'absolute',
    left: '20%',
  },
  profileContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: '18%',
    left: '20%',
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
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: 30,
   
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 99,
    width: 20,
    height: 20,
    textAlign: 'center',
    marginLeft:'2.3%',
    marginTop:200,
    backgroundColor:'#F0F8FF',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 17,
  },
  nextButton1: {
    height: 59,
    width: 240,
    marginTop: 170,
    backgroundColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius:20
  },
 
  nextButton: {
    height: 59,
    width: 240,
    marginTop: 5,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius:20
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'Regular',
  },
  
});

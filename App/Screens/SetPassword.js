import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/core';
export default function SetPassword() {
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
        <Text style={styles.title}>Setup New Password</Text>
        <Text style={styles.subtitle}>Please, setup a new password for</Text>
        <Text style={styles.subtitle}>your account</Text>
      </View>

<View>
  <TextInput placeholder='New Password' style={{width: 300,height:50,top:180,color:'#F5F5F5',backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    color: Colors.BLACK,
    textAlign:'center'}}></TextInput>
  <TextInput placeholder='Repeat Password' style={{width: 300,height:50,top:200,color:'#F5F5F5',backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    color: Colors.BLACK,
    textAlign:'center'
   }}></TextInput>
</View>







      <TouchableOpacity style={styles.nextButton} onPress={()=>navigation.navigate('home')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.goBack()} >
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
   
  },
  backgroundImagesContainer: {
    position: 'relative',
   marginLeft:'auto'
  },
  backgroundImage: {
    resizeMode: 'contain',
  },
  backgroundImageOverlay: {
    position: 'absolute',
   right:0
  },
  profileContainer: {
    alignItems: 'center',
    position: 'absolute',
    marginTop:100
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
  subtitle: {
    marginTop: 10,
    fontSize: 17,
  },
  nextButton: {
    height: 61,
    width: 330,
    marginTop:290,
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

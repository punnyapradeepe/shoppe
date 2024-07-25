import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';
import { EllipsImg, TickImg } from '../Utils/SvgIcons';

export default function ForgotScreen({ navigation }) {
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
        <Text style={styles.subtitle}>How you would like to restore</Text>
        <Text style={styles.subtitle}>your password?</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.btn, styles.smsBtn]}>
          <Text style={{ color: Colors.PRIMARY, fontWeight:'bold',paddingLeft:'30%' }}>SMS</Text>
          <View style={{paddingLeft:'44%'}}>
          <TickImg />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.emailBtn]}>
          <Text style={{ color: Colors.BLACK, fontWeight:'bold',paddingLeft:'30%' }}>Email</Text>
          <View style={{paddingLeft:'40%'}}>
          <EllipsImg/>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={()=>navigation.navigate('recovery')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('password')}>
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
    left: '20%',
  },
  profileContainer: {
    alignItems: 'center',
    position: 'absolute',
 alignSelf:'center',
 marginTop:'20%'
  },
  ellipseImage: {
    position: 'relative',
  },
  profileImage: {
    position: 'absolute',
    top: 12,
    borderRadius: 99,
    marginBottom:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom:20
  },
  subtitle: {
    marginTop: 10,
    fontSize: 17,
    marginBottom:10
  },
  buttonGroup: {
    marginTop: '45%',
    alignItems: 'center',
  },
  btn: {
    marginTop: 10,
    borderRadius: 99,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smsBtn: {
    backgroundColor: '#F0F8FF',
  },
  emailBtn: {
    backgroundColor: '#FFE4E1', 
  },
  nextButton: {
    height: 61,
    width: 330,
    marginTop: 115,
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

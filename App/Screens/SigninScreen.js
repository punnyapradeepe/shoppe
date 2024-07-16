import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { HeartImg } from './../../App/Utils/SvgIcons';

export default function SigninScreen() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor:Colors.WHITE,flex:1}}>
      <View style={{flex:1}}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ position: 'absolute',resizeMode:'contain' }}
            source={require('./../../assets/Images/bubble 02.png')}
          />
          <Image
            style={{ position: 'absolute',resizeMode:'contain'}}
            source={require('./../../assets/Images/bubble 03.png')}
          />

           


      </View>
      <View  style={{right:0,top:'35%', position: 'absolute',}}>
      <Image
            style={{}}
            source={require('./../../assets/Images/bubble 04.png')}
          />
      </View>
      </View>
      <View style={{ position: 'absolute',resizeMode:'contain' ,bottom:0,right:0}}>
        <Image
 
            source={require('./../../assets/Images/bubble 05.png')}
        />
         </View>




          <View style={{position:'absolute',left:0,top:350}}>

          <Text style={styles.text}>Login</Text>
          <View style={{display:'flex' ,flexDirection:'row'}}>
            <Text style={{fontSize:17,paddingLeft:20,paddingTop:10}}>Good to see you back! </Text>
            <View style={{paddingTop:10}}>
            <HeartImg/>
            </View>
           
            </View>
            <TextInput placeholder='Email' style={styles.textInput} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('password')}>
          <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{left:'43%'}}>Cancel</Text>
        </TouchableOpacity>

          </View>
          

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft:20
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginTop: 30,
    marginHorizontal: 20,
    color: Colors.BLACK,
    height: 50,
    width:320,
    
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
})
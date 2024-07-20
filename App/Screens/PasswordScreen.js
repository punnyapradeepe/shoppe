import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import Colors from '../Utils/Colors';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function PasswordScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ resizeMode: 'contain' }}
            source={require('./../../assets/Images/bubble 02.png')}
          />
        </View>
        <View style={{ position: 'absolute' }}>
          <Image
            style={{ resizeMode: 'contain' }}
            source={require('./../../assets/Images/bubble 03.png')}
          />
        </View>
      </View>

      <View style={{ alignItems: 'center', position: 'absolute', top: '20%', left: '10%' }}>
        <View style={{ position: 'relative' }}>
          <Image source={require('./../../assets/Images/ellipse.png')} />
        </View>
        <View style={{ position: 'absolute', top: 12 }}>
          <Image
            source={require('./../../assets/Images/artist-2 1 (1).png')}
            style={{ borderRadius: 99 }}
          />
        </View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>Hello, Romina !!</Text>
        <Text style={{ marginTop: 20, fontSize: 17 }}>Type your password</Text>

        <View style={styles.container}>
          <TextInput keyboardType="numeric"
      maxLength={1} style={styles.input} />
          <TextInput  keyboardType="numeric"
      maxLength={1} style={styles.input} />
          <TextInput  keyboardType="numeric"
      maxLength={1} style={styles.input} />
          <TextInput  keyboardType="numeric"
      maxLength={1} style={styles.input} />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
            <Text style={{ marginTop: 20,marginLeft:70 }}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('home')} >
            <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '25%' }}>
          <Text>Not you?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signIn')} style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  container: {
    display: 'flex',
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
  btn: {
    marginTop: 50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    height:60,
    width:300
  },
});

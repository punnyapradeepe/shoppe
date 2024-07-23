import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { EditBtn } from '../Utils/SvgIcons';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/core';

export default function MyProfile() {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
    <View style={{flexDirection:'row'}}>
      <View style={{marginTop:23,marginRight:0}}>
    <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={()=>navigation.goBack()}/>
    </View>
    <Text style={styles.SettingsText}>Settings</Text>
    </View>
    <Text style={styles.Text1}> Your Profile</Text>
   
    <Image source={require('./../../assets/Images/avatar-2 1.png')} style={{position:'relative', borderRadius:99,borderWidth:4,borderColor:'white'}} />
    <View style={{position:'absolute',top:130,left:80}}>
    <EditBtn/>
    </View>
    <View style={{backgroundColor:'#e6e6fa',padding:10,marginTop:20,borderRadius:20}}>
    <Text>Romina</Text>
    </View>
    <View style={{backgroundColor:'#e6e6fa',padding:10,marginTop:20,borderRadius:20}}>
    <Text>romina@gmail.com</Text>
    </View>
    <View style={{backgroundColor:'#e6e6fa',padding:10,marginTop:20,borderRadius:20}}>
    <Text>******************</Text>
    </View>
    <TouchableOpacity style={{backgroundColor:Colors.PRIMARY,padding:10,borderRadius:20,marginTop:'80%'}}>
   <Text style={{color:'white',alignSelf:'center'}}>Save</Text>
    </TouchableOpacity>
    </View>
  
  )
}

const styles =StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  SettingsText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  Text1: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
})
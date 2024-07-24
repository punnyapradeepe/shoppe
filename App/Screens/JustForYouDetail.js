import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { StarImgClr, StarImgLayout } from '../Utils/SvgIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddToCart from '../../Components/AddToCart';
import JustForYou from '../../Components/JustForYou';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const JustForYouDetail = ({ route }) => {
  const { item } = route.params;
  const navigation= useNavigation();
  

  return (
    <SafeAreaView  style={styles.safeArea}>
    <ScrollView style={styles.container}>
    <Ionicons name="arrow-back" size={24} color="black" onPress={()=> navigation.goBack()}/>
      <Image source={item.imageSource} style={styles.image} />
      <Text style={styles.text}>Description: {item.text}</Text>
      <Text style={styles.price}>Price: {item.price}</Text>


      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>Size guide</Text>
            <TouchableOpacity style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
          <View>
         <Image source={require('./../../assets/Images/veronika.png')} style={{width:50,height:50,borderRadius:99,marginBottom:10}}/>
          
              <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',}}>

              <Text>Veronika</Text>
              <StarImgClr/>
              <StarImgClr />
              <StarImgClr />
              <StarImgClr />
              <StarImgLayout />
              </View>
              
              <Text> Lorem ipsum dolor sit amet,conset sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed...</Text>

            </View>

            <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>View All Reviews</Text>
        </TouchableOpacity>
        <JustForYou/>
    

    </ScrollView>
    <AddToCart/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
 
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom:40,
    backgroundColor: '#f5f5f5',
    marginBottom:80
  },
  image: {
    width: '100%',
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
   marginLeft:20,
   marginBottom:15
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },

  button: {
   paddingHorizontal:100,
   paddingVertical:10,
    marginTop: 20,
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

export default JustForYouDetail;

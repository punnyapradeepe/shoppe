import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../App/Utils/Colors';


const NewItems = () => {
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/Img10.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'$17,00'
     
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/Img2.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'$32,00'
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/Img1.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'$21,00'
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/Img3.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'$15,00'
    },
  ];
  return (
    
    <View >

      <View style={{display:'flex',flexDirection:'row'}}>
      <Text style={styles.recentlyViewedText}>New Items</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',fontWeight:700 }}>
          <Text style={{
    paddingLeft: '34%',
    fontWeight:'bold'
 }}>See All</Text>

      
          <TouchableOpacity  style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
          </View>
          </View>


    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {type.map((item) => (
        <View style={{backgroundColor:Colors.WHITE,width:190,height:210,marginRight:10,borderRadius:20}}>
        <View key={item.id} style={styles.imageContainer}>
          <Image 
            source={item.imageSource} 
            style={{width:190,height:130,borderTopLeftRadius:20,borderTopRightRadius:20,borderWidth:6,borderColor:Colors.WHITE}} 
          
          />
        </View>
        <Text style={{paddingLeft:5,fontWeight:'400',gap:10}}>{item.text}</Text>
        <Text style={{paddingLeft:8,paddingTop:10,fontWeight:'400',gap:10,fontFamily:'Raleway',fontWeight:'700',fontSize:17}}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);
};



export default NewItems

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  imageContainer: {
    width: 204,
    height: 140,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginRight:5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlayImage: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10, 
    marginTop:10
  },
  liveImage: {
    position: 'absolute',
    top: '3%',
    left: '6%',
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  });
  
  
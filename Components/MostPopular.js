import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../App/Utils/Colors';
import { HeartImg2, TextImg } from '../App/Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';
const MostPopular = () => {
  const navigation = useNavigation()
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/img12.png'),
      img: require('./../assets/Images/Group 1497.png'),
      price:'$1780',

      type:'New'
     
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img15.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'$1780',
      type:'Sale'
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/img14.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'1780',
      type:'Hot'
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img13.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text:'Lorem ipsum dolor sit amet consectetur.',
      price:'$15,00',
      type:'New'
    },
  ];
  return (
    <View >

    <View style={{display:'flex',flexDirection:'row',marginTop:20}}>
    <Text style={styles.recentlyViewedText}>Most Popular</Text>
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',fontWeight:700 }}>
        <Text style={{paddingLeft:'25%',
    fontWeight:'bold'
  }}>See All</Text>

    
        <TouchableOpacity  style={styles.circleButton}>
          <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        </View>
        </View>


  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {type.map((item) => (
      <View style={{backgroundColor:Colors.WHITE,width:145,height:210,marginRight:10,borderRadius:10}}>
      <View key={item.id} style={styles.imageContainer}>
        <Image 
          source={item.imageSource} 
          style={{width:145,height:250,borderRadius:10,borderWidth:6,borderColor:Colors.WHITE}} 
        
        />
      </View>
     <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{paddingTop:15,left:13}}>
      <TextImg/>
      </View>
      <View style={{paddingTop:15,left:-19}}>
      <HeartImg2 />
      </View>
      <Text style={{paddingTop:7,fontWeight:'400',gap:10,fontFamily:'Raleway',fontWeight:'650',fontSize:17,right:10}}>{item.type}</Text>
      </View>
      </View>
    ))}
  </ScrollView>
</View>
);
};



export default MostPopular

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  imageContainer: {
    width: 140,
    height: 170,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginRight:5
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
  
  
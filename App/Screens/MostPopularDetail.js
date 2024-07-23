import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import RecentlyViewed from '../../Components/RecentlyViwed';
import TopProductScreen from '../../Components/TopProductScreen';
import JustForYou from '../../Components/JustForYou';
import FlashSaleScreen from './FlashSaleScreen';
import FlashSale from '../../Components/FlashSale';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
const MostPopularDetail = ({ route }) => {
  const { item } = route.params;
  const navigation= useNavigation();
  
  return (
    <View style={{flex:1,paddingTop:40}}>
    <ScrollView style={styles.container}>

    <Ionicons name="arrow-back" size={24} color="black" onPress={()=>navigation.goBack()}/>
      <Image source={item.imageSource} style={styles.image} />
      <Text style={styles.type}>Type: {item.type}</Text>
   
      {item.text && <Text style={styles.description}>Description: {item.text}</Text>}
      <RecentlyViewed/>
      <JustForYou/>
      <TopProductScreen/>
      <FlashSale/>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode:'contain'
  },
  type: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
});

export default MostPopularDetail;

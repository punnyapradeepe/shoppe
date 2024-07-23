import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import RecentlyViewed from '../../Components/RecentlyViwed';
import { AddBtn, DeleteBtn } from '../Utils/SvgIcons';
import WishList from '../../Components/WishList';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const WishListScreen = () => {

const navigation =useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <View style={{display:'flex',flexDirection:'row'}}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=> navigation.goBack()}  style={{marginTop:60}}/>
        <Text style={styles.text}>Wishlist</Text>
        </View>
        
        <View style={styles.header}>
          <Text style={styles.subText}>Recently viewed</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
      <RecentlyViewed />
      <WishList/>
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 50,
    paddingBottom: 10,
  },
  subText: {
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 20,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 140,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    position: 'relative',
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 11,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgPrice: {
    fontSize: 14,
    color: 'red',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemPrice: {
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Raleway',
  },
  colorSizeContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  itemColor: {
    fontSize: 12,
    color: Colors.LIGHTBLUE,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 2,
    width: 54,
    height: 25,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  itemSize: {
    fontSize: 12,
    color: Colors.LIGHTBLUE,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 2,
    width: 50,
    height: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  flatList: {
    paddingBottom: 20,
  },
});

import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import RecentlyViewed from '../../Components/RecentlyViwed';
import WishList from '../../Components/WishList';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const WishListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.text}>Wishlist</Text>
      </View>
      <View style={styles.subHeader}>
          <Text style={styles.subText}>Recently viewed</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
        <RecentlyViewed />
        </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
       
        
        <View style={styles.subHeader}>
          <Text style={styles.subText}>Wishlist Items</Text>
        </View>
        <WishList />
        
       
      </ScrollView>
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  header: {
paddingTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 10,
  paddingTop:0
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subText: {
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
  },
  scrollView: {
    flex: 1,
  },
  seeAllButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 20,
  },
  seeAllText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

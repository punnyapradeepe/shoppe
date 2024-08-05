import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import Colors from './../Utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import RecentlyViewed from './../../Components/RecentlyViwed';
import { Ionicons } from '@expo/vector-icons';
import Stories from '../../Components/Stories';
import NewItems from '../../Components/NewItems';
import MostPopular from '../../Components/MostPopular';
import Categories from '../../Components/Categories';
import FlashSale from '../../Components/FlashSale';
import { ClockImg, Notification, RectangleImg, StartImg } from '../Utils/SvgIcons';
import TopProductScreen from '../../Components/TopProductScreen';
import JustForYou from '../../Components/JustForYou';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage

export default function ActivityScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userId = await AsyncStorage.getItem('userid');
          console.log('Retrieved userId from AsyncStorage:', userId);
          if (userId) {
            const response = await fetch(`http://192.168.1.40:5000/users/${userId}`); 
            const data = await response.json();
            console.log('Fetched user data:', data);
            setUser(data);
            setName(data.name);
          } else {
            console.warn('No userId found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={() => navigation.navigate('home')} />
          <Image source={require('./../../assets/Images/Image.png')} style={styles.image} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Image source={require('./../../assets/Images/Vouchers.png')} style={styles.image1} />
          <Image source={require('./../../assets/Images/Top Menu.png')} style={styles.image1} />
          <Image source={require('./../../assets/Images/Settings.png')} style={styles.image1} />
        </View>
      </View>

      <Text style={styles.helloText}>Hello, {name}</Text>
        <View style={styles.announcementWrapper}>
          <Text style={styles.announcementText}>Announcement</Text>
          <View style={styles.announcementContainer}>
            <Text style={styles.announcementDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit luctus libero ac vulpulate.
            </Text>
            <TouchableOpacity style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>

        
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
     
        
        <Text style={styles.recentlyViewedText}>Recently Viewed</Text>
        <RecentlyViewed />
        
        <Text style={styles.recentlyViewedText}>My Orders</Text>
        <View style={styles.orderContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate('Activity', { screen: 'allc', params: {} })} style={styles.orderButton}>
              <Text style={styles.orderButtonText}>To Pay</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>To Receive</Text>
                <View style={{ position: 'absolute', top: 0, left: '85%' }}>
                  <Notification />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>To Review</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <Text style={styles.recentlyViewedText}>Stories</Text>
        <Stories style={{ position: 'relative' }} />
        
        <NewItems />
        <MostPopular />
        <Categories />
        <FlashSale />
        <TopProductScreen />
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.recentlyViewedText}>Just For You</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
            <StartImg />
          </View>
        </View>
        <JustForYou />
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    paddingBottom: 2,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image1: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  activityButton: {
    width: 115,
    height: 35,
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityButtonText: {
    color: 'white',
  },
  helloText: {
    fontSize: 30,
    fontFamily: 'Raleway',
    fontWeight: '700',
    marginBottom: 10,
  },
  announcementWrapper: {
    marginLeft: 10,
    marginBottom: 10,
  },
  announcementText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  announcementDescription: {
    fontSize: 14,
    flex: 1,
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
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  StoriesText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginTop: 10,
  },
  orderContainer: {
    marginVertical: 10,
  },
  orderButton: {
    width: 100,
    height: 35,
    backgroundColor: '#87CEFA',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    position: 'relative',
  },
  orderButtonText: {
    color: Colors.PRIMARY,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

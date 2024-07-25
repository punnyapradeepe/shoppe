import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../App/Utils/Colors';
import { HeartImg2, TextImg } from '../App/Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';

const MostPopular = () => {
  const navigation = useNavigation();

  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/img12.png'),
      img: require('./../assets/Images/Group 1497.png'),
      price: '$1780',
      text: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'New'
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img15.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$1780',
      type: 'Sale'
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/img14.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '1780',
      type: 'Hot'
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img13.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
      type: 'New'
    },
    {
      id: '5',
      imageSource: require('./../assets/Images/img12.png'),
      img: require('./../assets/Images/Group 1497.png'),
      price: '$1780',
      text: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'New'
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img15.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$1780',
      type: 'Sale'
    },
    {
      id: '7',
      imageSource: require('./../assets/Images/img14.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '1780',
      type: 'Hot'
    },
    {
      id: '8',
      imageSource: require('./../assets/Images/img13.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
      type: 'New'
    },
  ];

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.recentlyViewedText}>Most Popular</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
          <Text style={{ fontWeight: 'bold', marginRight: 5 }}>See All</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {type.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('populardetail', { item })}
            style={{ backgroundColor: Colors.WHITE, width: 145, height: 210, marginRight: 10, borderRadius: 10 }}
          >
            <View key={item.id} style={styles.imageContainer}>
              <Image
                source={item.imageSource}
                style={{ width: 145, height: 250, borderRadius: 10, borderWidth: 6, borderColor: Colors.WHITE }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <View style={{ paddingTop: 15, left: 13 }}>
                <TextImg />
              </View>
              <View style={{ paddingTop: 15, left: -19 }}>
                <HeartImg2 />
              </View>
              <Text style={{ paddingTop: 7, fontWeight: '400', gap: 10, fontFamily: 'Raleway', fontWeight: '650', fontSize: 17, right: 10 }}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MostPopular;

const styles = StyleSheet.create({
  imageContainer: {
    width: 140,
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 5
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10
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

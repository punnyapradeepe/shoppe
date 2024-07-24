import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../App/Utils/Colors';
import { HeartImg2, StartImg } from '../App/Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';

const JustForYou = () => {
  const navigation= useNavigation();
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/img47.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$17,00',
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img44.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$32,00',
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/Img1.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$21,00',
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img23.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
    },
    {
      id: '5',
      imageSource: require('./../assets/Images/img21.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$17,00',
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img22.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$32,00',
    },
    {
      id: '7',
      imageSource: require('./../assets/Images/img41.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$21,00',
    },
    {
      id: '8',
      imageSource: require('./../assets/Images/img40.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
    },
  ];

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {type.reduce((rows, item, index) => {
          if (index % 2 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(item);
          return rows;
        }, []).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemContainer}
                onPress={() => navigation.navigate('justforyoudetail', { item })}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.imageSource} style={styles.image} />
                </View>
                <Text style={styles.itemText}>{item.text}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JustForYou;

const styles = StyleSheet.create({
  recentlyViewedText: {
    fontSize: 3,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: Colors.WHITE,
    width: '48%', 
    borderRadius: 20,
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 6,
    borderColor: Colors.WHITE,
  },
  itemText: {
    paddingLeft: 5,
    fontWeight: '400',
    marginVertical: 10,
  },
  itemPrice: {
    paddingLeft: 8,
    paddingTop: 10,
    fontWeight: '700',
    fontFamily: 'Raleway',
    fontSize: 17,
    marginBottom:5
  },
});

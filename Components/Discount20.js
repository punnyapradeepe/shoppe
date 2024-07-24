import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../App/Utils/Colors';

const Discount20 = () => {
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/img53.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$16,00',
      DisPrice: '$20,00',
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img51.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$16,00',
      DisPrice: '$20,00',
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/img52.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$21,00',
      DisPrice: '$27,00',
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img50.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$24,00',
      DisPrice: '$30,00',
    },
    {
      id: '5',
      imageSource: require('./../assets/Images/img21.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$16,00',
      DisPrice: '$20,00',
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img22.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$16,00',
      DisPrice: '$20,00',
    },
    {
      id: '7',
      imageSource: require('./../assets/Images/img41.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$20,00',
      DisPrice: '$25,00',
    },
    {
      id: '8',
      imageSource: require('./../assets/Images/img40.png'),
      img: require('./../assets/Images/Group 1497.png'),
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
      DisPrice: '$20,00',
    },
  ];

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {type
          .reduce((rows, item, index) => {
            if (index % 2 === 0) {
              rows.push([]);
            }
            rows[rows.length - 1].push(item);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={item.imageSource} style={styles.image} />
                    <View style={styles.discountBadge}>
                      <Image source={require('./../assets/Images/discount (1).png')} style={styles.discountIcon} />
                    </View>
                  </View>
                  <Text style={styles.itemText}>{item.text}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <Text style={styles.disPrice}>{item.DisPrice}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Discount20;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: Colors.WHITE,
    width: '48%',
    borderRadius: 20,
    marginBottom: 20, 
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 350,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover', 
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
  height:'100%',
  width:30
  },
  discountIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain', // Adjust resizeMode as needed
  },
  itemText: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: '400',
    fontFamily: 'Raleway',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  itemPrice: {
    fontWeight: '700',
    fontFamily: 'Raleway',
    fontSize: 18,
  },
  disPrice: {
    fontSize: 14,
    color: 'darkred',
    textDecorationLine: 'line-through',
  },
});

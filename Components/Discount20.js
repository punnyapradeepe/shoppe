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
                   
                  </View>

                  <View style={{position:'absolute',top:6,left:107}}>
                  <Image source={require('./../assets/Images/discount (1).png')}/>
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
  recentlyViewedText: {
    fontSize: 25,
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
    height: 130,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 10,
    marginBottom: 5,
  },
  itemPrice: {
    fontWeight: '700',
    fontFamily: 'Raleway',
    fontSize: 17,
    marginRight: 5,
  },
  disPrice: {
    fontSize: 12,
    color: 'darkred', 
    textDecorationLine: 'line-through',
  },
});

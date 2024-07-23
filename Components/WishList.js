import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../App/Utils/Colors';
import { AddBtn, DeleteBtn } from '../App/Utils/SvgIcons';
import { Ionicons } from '@expo/vector-icons';

const WishList = () => {
  const type = [
    {
      id: '1',
      images: require('./../assets/Images/dr1.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$17,00',
      color: 'Black',
      size: 'M',
    },
    {
      id: '2',
      images: require('./../assets/Images/hb2.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      orgPrice: '$17,00',
      price: '$12,00',
      color: 'Red',
      size: 'S',
    },
    {
      id: '3',
      images: require('./../assets/Images/db1.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$21,00',
      color: 'Blue',
      size: 'M',
    },
    {
      id: '4',
      images: require('./../assets/Images/dy1.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$15,00',
      color: 'Black',
      size: 'S',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.images} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.priceContainer}>
          {item.orgPrice && <Text style={styles.orgPrice}>{item.orgPrice}</Text>}
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={{ position: 'absolute', top: 60, right: 260 }}>
          <DeleteBtn />
        </TouchableOpacity>
        <View style={styles.colorSizeContainer}>
          <Text style={styles.itemColor}>{item.color}</Text>
          <Text style={styles.itemSize}>{item.size}</Text>
          <TouchableOpacity style={{ left: 50 }}>
            <AddBtn />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={type}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default WishList

const styles = StyleSheet.create({
  container: {
   
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
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal:1,
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

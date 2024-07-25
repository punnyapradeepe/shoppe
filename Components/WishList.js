import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../App/Utils/Colors';
import { AddBtn, DeleteBtn } from '../App/Utils/SvgIcons';

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
        <View style={styles.colorSizeContainer}>
          <Text style={styles.itemColor}>{item.color}</Text>
          <Text style={styles.itemSize}>{item.size}</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
              <AddBtn />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <DeleteBtn />
            </TouchableOpacity>
            
          </View>
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
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0,
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
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  orgPrice: {
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemPrice: {
    fontSize: 19,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Raleway',
  },
  colorSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemColor: {
    fontSize: 17,
    color: Colors.LIGHTBLUE,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 2,
    width: 54,
    textAlign: 'center',
    marginRight: 5,
  },
  itemSize: {
    fontSize: 17,
    color: Colors.LIGHTBLUE,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 2,
    width: 50,
    textAlign: 'center',
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  deleteButton: {
    marginLeft:'auto'
   
  },
  addButton:{
  },
  flatList: {
    paddingBottom: 20,
  },
});

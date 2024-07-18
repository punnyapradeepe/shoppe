import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DeleteBtn, MinusImg, MoreImg } from '../App/Utils/SvgIcons';
import Colors from '../App/Utils/Colors';

const CartItems = ({ updateTotalQuantity }) => {
  const [quantities, setQuantities] = useState({});

  const type = [
    {
      id: '1',
      images: require('./../assets/Images/img40.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$17,00',
      color: 'Black',
      size: 'M',
    },
    {
      id: '2',
      images: require('./../assets/Images/img21.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$12,00',
      color: 'Red',
      size: 'S',
    },
  ];

  useEffect(() => {
    const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    updateTotalQuantity(totalQuantity);
  }, [quantities]);

  const increaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) - 1;
      return {
        ...prevQuantities,
        [id]: newQuantity > 0 ? newQuantity : 0,
      };
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.images} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={styles.colorSizeContainer}>
          <Text>{item.color}</Text>
          <Text>{item.size}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} disabled={quantities[item.id] <= 1}>
            <MinusImg />
          </TouchableOpacity>
          <View style={styles.quantityBox}>
            <Text>{quantities[item.id] || 1}</Text>
          </View>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <MoreImg />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <DeleteBtn />
        </TouchableOpacity>
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

export default CartItems;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    gap: 5,
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
  quantityBox: {
    width: 30,
    height: 30,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 60,
    right: 260,
  },
  flatList: {
    paddingBottom: 20,
  },
});



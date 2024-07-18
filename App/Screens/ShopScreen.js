import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import WishList from '../../Components/WishList';
import Colors from '../Utils/Colors';
import { EditBtn, DeleteBtn, MinusImg, MoreImg } from '../Utils/SvgIcons';
import CartItems from './../../Components/CartItems'
import { useNavigation } from '@react-navigation/native';

export default function ShopScreen() {
  const navigation = useNavigation();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Function to update total quantity based on cart items
  const updateTotalQuantity = (items) => {
    const total = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalQuantity(total);
  };

  // Function to handle quantity changes within cart items
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateTotalQuantity(updatedItems);
  };

  const navigateToShippingAddress = () => {
    navigation.navigate('shippingAddr', { totalQuantity }); 
  };

  // Sample data for cart items
  const type = [
    {
      id: '1',
      images: require('./../../assets/Images/img40.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$17,00',
      color: 'Black',
      size: 'M',
      quantity: 1, // Initial quantity
    },
    {
      id: '2',
      images: require('./../../assets/Images/img21.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$12,00',
      color: 'Red',
      size: 'S',
      quantity: 1, // Initial quantity
    },
  ];

  useEffect(() => {
    setCartItems(type); // Initialize cart items
    updateTotalQuantity(type); // Initialize total quantity
  }, []);

  return (
    <View style={styles.container}>
      <View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <Text style={styles.text}>Cart</Text>
          <View style={styles.quantityIndicator}>
            <Text style={styles.quantityText}>{totalQuantity}</Text>
          </View>
        </View>
        <Text style={styles.subText}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <EditBtn />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingLeft: 20,
    paddingRight: 20,}}>
        {cartItems.map(item => (
          <View style={styles.itemContainer} key={item.id}>
            <Image source={item.images} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{item.text}</Text>
              <View style={styles.colorSizeContainer}>
                <Text>{item.color}</Text>
                <Text>{item.size}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <MinusImg />
                </TouchableOpacity>
                <View style={styles.quantityBox}>
                  <Text>{item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  <MoreImg />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <DeleteBtn />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.text1}>From Your WishList</Text>
        <WishList/>
      </ScrollView>
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalText}>Total $29,00</Text>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={navigateToShippingAddress}
        >
          <Text style={styles.checkoutButtonText}>CheckOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    paddingTop: 0,
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  subText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,

  },
  address: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    marginLeft: 10,
  },
  text1: {
    fontFamily: 'RalewayB',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 10,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
        borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 0,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 1,
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
  quantityIndicator: {
    width: 30,
    height: 30,
    borderRadius: 99,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

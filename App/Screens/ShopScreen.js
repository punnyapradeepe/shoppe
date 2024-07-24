// ShopScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import WishList from '../../Components/WishList';
import Colors from '../Utils/Colors';
import { EditBtn, DeleteBtn, MinusImg, MoreImg } from '../Utils/SvgIcons';
import CartItems from './../../Components/CartItems';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

export default function ShopScreen() {
  const navigation = useNavigation();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Function to update total quantity and total price based on cart items
  const updateTotalQuantityAndPrice = (items) => {
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPr = items.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * (item.quantity || 0)), 0);
    setTotalQuantity(totalQty);
    setTotalPrice(totalPr.toFixed(2));
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
    updateTotalQuantityAndPrice(updatedItems);
  };

  const navigateToShippingAddress = () => {
    navigation.navigate('shippingAddr', { totalQuantity, totalPrice }); 
  };

  // Sample data for cart items
  const type = [
    {
      id: '1',
      images: require('./../../assets/Images/img40.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$17.00',
      color: 'Black',
      size: 'M',
      quantity: 1, // Initial quantity
    },
    {
      id: '2',
      images: require('./../../assets/Images/img21.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$12.00',
      color: 'Red',
      size: 'S',
      quantity: 1, // Initial quantity
    },
  ];

  useEffect(() => {
    setCartItems(type); // Initialize cart items
    updateTotalQuantityAndPrice(type); // Initialize total quantity and price
  }, []);

  const [address, setAddress] = useState('26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city');
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  const handleSave = () => {
    setAddress(tempAddress);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempAddress(address);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ display: 'flex', flexDirection: 'row',gap:0 }}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=> navigation.goBack()}  style={{marginTop:60,marginLeft:20}}/>
          <Text style={styles.text}>Cart</Text>
          <View style={styles.quantityIndicator}>
            <Text style={styles.quantityText}>{totalQuantity}</Text>
          </View>
        </View>
        <Text style={styles.subText}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <EditBtn />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingLeft: 20, paddingRight: 20 }}>
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
        <Text style={styles.totalText}>Total ${totalPrice}</Text>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={navigateToShippingAddress}
        >
          <Text style={styles.checkoutButtonText}>CheckOut</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      backgroundColor: 'white',
      borderColor: Colors.PRIMARY,
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      width: '80%',
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      }}>Edit Address</Text>
      <TextInput
        style={{
          borderColor: Colors.GRAY,
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        value={tempAddress}
        onChangeText={setTempAddress}
        placeholder="Enter your address"
      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity
          style={[{
            flex: 1,
            marginHorizontal: 5,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.PRIMARY,
          }]}
          onPress={handleCancel}
        >
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
          }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
            flex: 1,
            marginHorizontal: 5,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.PRIMARY,
          }]}
          onPress={handleSave}
        >
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
          }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

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
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingBottom: 10,
    paddingRight: 10,
  },
  subText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 25,
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
    fontSize: 15,
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
    fontSize: 20,
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
    fontSize: 20,
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
    justifyContent
: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 15,

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
    right:10
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

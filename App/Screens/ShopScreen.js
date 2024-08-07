import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import WishList from '../../Components/WishList';
import Colors from '../Utils/Colors';
import { DeleteBtn, EditBtn, MinusImg, MoreImg } from '../Utils/SvgIcons';
import { Ionicons } from '@expo/vector-icons';
import imageMapping from './../../Components/imageMapping';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

export default function ShopScreen() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city');
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userid');
      setUserId(id);
    } catch (error) {
      console.error('Failed to fetch user ID from AsyncStorage:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        fetchCartItems(userId);
      }
    }, [userId])
  );

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch('http://192.168.1.40:5000/cart');
      const data = await response.json();
      const filteredItems = data.filter(item => item.userId === userId);
      setCartItems(filteredItems);
      calculateTotal(filteredItems);
    } catch (error) {
      console.error('Failed to fetch or filter cart items:', error);
    }
  };

  const calculateTotal = (items) => {
    let totalAmount = 0;
    items.forEach(item => {
      const priceString = item.price.replace(/[^0-9,]/g, '');
      const priceNumber = parseFloat(priceString.replace(',', '.'));
      totalAmount += priceNumber * item.quantity;
    });
    setTotal(totalAmount);
  };

  const handleQuantityChange = async (itemId, change) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(item.quantity + change, 1);
          const updatedItem = { ...item, quantity: newQuantity };

          // Update the quantity in the server
          fetch(`http://192.168.1.40:5000/cart/${itemId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
          })
          .catch(error => console.error('Failed to update cart item:', error));
          
          return updatedItem;
        }
        return item;
      });

      calculateTotal(updatedItems);
      return updatedItems;
    });
  };

  const handleDelete = async (itemId) => {
    try {
      // Delete the item from the server
      await fetch(`http://192.168.1.40:5000/cart/${itemId}`, {
        method: 'DELETE',
      });

      // Remove the item from local state
      setCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.id !== itemId);
        calculateTotal(updatedItems);
        return updatedItems;
      });
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  const handleSaveToMyCart = async () => {
    try {
      const response = await fetch('http://192.168.1.40:5000/mycart');
      const data = await response.json();
      const existingEntry = data.find(entry => entry.userId === userId);

      const newEntry = {
        userId,
        products: cartItems,
        address,
        total,
      };

      if (existingEntry) {
        // Update existing entry
        await fetch(`http://192.168.1.40:5000/mycart/${existingEntry.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEntry),
        });
      } else {
        // Create new entry
        await fetch('http://192.168.1.40:5000/mycart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEntry),
        });
      }

      navigation.navigate('payment');

    } catch (error) {
      console.error('Failed to save data to mycart:', error);
    }
  };

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
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={styles.text}>Cart</Text>
          <View style={styles.quantityIndicator}>
            <Text style={styles.quantityText}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Text>
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
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
             <Image source={require('./../../assets/Images/Logo.png')} />
            <Text style={styles.emptyCartText}>Cart is empty!</Text>
          </View>
        ) : (
          cartItems.map(item => (
            <View style={styles.itemContainer} key={item.id}>
              <Image source={imageMapping[item.image]} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.title}</Text>
                <View style={styles.colorSizeContainer}>
                  <Text>{item.color}</Text>
                  <Text>{item.size}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <TouchableOpacity style={{ marginRight: 5 }} onPress={() => handleQuantityChange(item.id, -1)}>
                    <MinusImg />
                  </TouchableOpacity>
                  <View style={styles.quantityBox}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity style={{ marginLeft: 5, marginRight: 5 }} onPress={() => handleQuantityChange(item.id, 1)}>
                    <MoreImg />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => handleDelete(item.id)}>
                    <DeleteBtn />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        <Text style={styles.text1}>From Your WishList !</Text>
        <WishList />
      </ScrollView>
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleSaveToMyCart}
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
                height: 100,
                borderColor: Colors.PRIMARY,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                marginBottom: 20,
              }}
              value={tempAddress}
              onChangeText={setTempAddress}
              multiline
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={handleSave} style={{
                backgroundColor: Colors.PRIMARY,
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}>
                <Text style={{ color: 'white' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} style={{
                backgroundColor: 'grey',
                padding: 10,
                borderRadius: 5,
              }}>
                <Text style={{ color: 'white' }}>Cancel</Text>
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
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 50,
  },
  quantityIndicator: {
    position: 'absolute',
  marginLeft:80,
    top: 55,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  address: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.GRAY,
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
    flex: 1,
    marginLeft: 20,
  },
  itemText: {
    fontSize: 14,
   
  
  },
  colorSizeContainer: {

    
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:2
  },
  quantityBox: {
    width:30,
    height:30,
    backgroundColor:'lightblue',
    borderRadius: 99,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityTextInput: {
    textAlign: 'center',
    fontSize: 16,
    padding: 0,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: Colors.GRAY,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import WishList from '../../Components/WishList';
import Colors from '../Utils/Colors';
import { EditBtn, MinusImg, MoreImg } from '../Utils/SvgIcons';
import CartItems from './../../Components/CartItems';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import imageMapping from './../../Components/imageMapping'; 
import { useFocusEffect } from '@react-navigation/native';



export default function ShopScreen() {
  const navigation = useNavigation();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems(userId); 

    }, [userId])
  );

  const fetchUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userid');
      setUserId(id);
    } catch (error) {
      console.error('Failed to fetch user ID from AsyncStorage:', error);
    }
  };

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch('http://192.168.1.40:5000/cart');
      const data = await response.json();
      const filteredItems = data.filter(item => item.userId === userId);
      console.log('Filtered Cart Items:', filteredItems);
      setCartItems(filteredItems);
      updateTotalQuantityAndPrice(filteredItems);
    } catch (error) {
      console.error('Failed to fetch or filter cart items:', error);
    }
  };

  useEffect(() => {
    fetchUserId(); 
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId); 
    }
  }, [userId]);

  const updateTotalQuantityAndPrice = (items) => {
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPr = items.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * (item.quantity || 0)), 0);
    setTotalQuantity(totalQty);
    setTotalPrice(totalPr.toFixed(2));
  };

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
        <View style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={() => navigation.goBack()} style={{ marginTop: 60, marginLeft: 20 }} />
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
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
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
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <MinusImg />
                  </TouchableOpacity>
                  <View style={styles.quantityBox}>
                    <Text></Text>
                  </View>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    <MoreImg />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        <Text style={styles.text1}>From Your WishList</Text>
        <WishList />
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
    right: 20,
    top: 60,
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
    fontWeight: '600',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  address: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editButton: {
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  quantityBox: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 10,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom:50
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.GRAY,
  },
});

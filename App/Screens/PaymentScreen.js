import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { ClrImg, EditBtn, Gift, GiftBox, Plus, SettingImg, TickImg, TickW } from '../Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageMapping from './../../Components/imageMapping';
import { Alert } from 'react-native'; 

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState('Standard');
  const [address, setAddress] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible ,setIsEditModalVisible] = useState(false);
 const [isEditable, setIsEditable] = useState(false);
 const [cardNumber, setCardNumber] = useState(['', '', '', '']);
 const [cardHolderName, setCardHolderName] = useState('');
 const [expiryDate, setExpiryDate] = useState('');
 const [wasExpress, setWasExpress] = useState(false); 
  const [storedCardNumber, setStoredCardNumber] = useState(['* * * *', '* * * *', '* * * *', '1579']);
  const [storedCardHolderName, setStoredCardHolderName] = useState('AMANDA MORGAN');
  const [storedExpiryDate, setStoredExpiryDate] = useState('12/22');
  const [backupCardNumber, setBackupCardNumber] = useState(['', '', '', '']);
  const [backupCardHolderName, setBackupCardHolderName] = useState('');
  const [backupExpiryDate, setBackupExpiryDate] = useState('');
  const [isCardNumberEdited, setIsCardNumberEdited] = useState(false);
  const [isCardHolderNameEdited, setIsCardHolderNameEdited] = useState(false);
  const [isExpiryDateEdited, setIsExpiryDateEdited] = useState(false);
  const [hasChangesBeenSaved, setHasChangesBeenSaved] = useState(false); 


  useEffect(() => {
    const fetchUserIDAndCartItems = async () => {
      try {
        const userID = await AsyncStorage.getItem('userid');
        if (userID) {
          const response = await axios.get('http://192.168.1.40:5000/mycart');
          if (response.data) {
            const userCart = response.data.find(cart => cart.userId === userID);
            if (userCart) {
              setCartItems(userCart.products);
              setAddress(userCart.address);
              setTotalAmount(userCart.total);
            } else {
              console.log('No cart found for user ID:', userID);
            }
          } else {
            console.log('No data returned from server');
          }
        } else {
          console.log('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user ID and cart items:', error);
      }
    };
  
    fetchUserIDAndCartItems();
  }, []);
  
  const handlePayment = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      if (userId) {
        // Fetch all orders
        const orderResponse = await fetch('http://192.168.1.40:5000/myorder');
        const orderData = await orderResponse.json();
        const existingOrder = orderData.find(order => order.userId === userId);
  
        // Fetch the address from mycart
        const cartResponse = await fetch(`http://192.168.1.40:5000/mycart?userId=${userId}`);
        const cartData = await cartResponse.json();
        const cartItem = cartData.find(item => item.userId === userId);
        const address = cartItem ? cartItem.address : '';
  
        const newOrder = {
          userId,
          products: cartItems,
          address, // Add address to the new order
          total: totalAmount
        };
  
        let requestOptions;
        if (existingOrder) {
          // Update existing order
          requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
          };
          await fetch(`http://192.168.1.40:5000/myorder/${existingOrder.id}`, requestOptions);
        } else {
          // Create new order
          requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
          };
          await fetch('http://192.168.1.40:5000/myorder', requestOptions);
        }
  
        Alert.alert(
          'Success',
          'Order placed successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate or reset state
                navigation.navigate('orderscreen'); // Example navigation
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        console.log('User ID not found in AsyncStorage');
        Alert.alert('Error', 'User ID not found.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order: ' + (error.message || 'Unknown error'));
    }
  };
  
  
  
  





  const handleShippingOptionSelect = (option) => {
  if (option === 'Express') {
    if (!wasExpress) {
      setTotalAmount(prevTotal => prevTotal + 80); // Add $80 for express shipping
      setWasExpress(true); // Mark as Express
    }
  } else {
    if (wasExpress) {
      setTotalAmount(prevTotal => prevTotal - 80); // Subtract $80 if switching from Express to Standard
      setWasExpress(false); // Mark as not Express
    }
  }
  setSelectedShipping(option);
};



  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };
  const handleCancelVoucher = () => {
    setVoucherModalVisible(false);
  };
 
  

  const handleApplyVoucher2 = () => {
   
    setTotalAmount(totalAmount-((5/100)*totalAmount));
    setVoucherModalVisible(false);
  };

  const handleApplyVoucher = () => {
    setTotalAmount(totalAmount-((15/100)*totalAmount));
    setVoucherModalVisible(false);
  };



  const openModal = () => {
    if (!hasChangesBeenSaved) {
      setBackupCardNumber(storedCardNumber);
      setBackupCardHolderName(storedCardHolderName);
      setBackupExpiryDate(storedExpiryDate);
      setCardNumber(storedCardNumber);
      setCardHolderName(storedCardHolderName);
      setExpiryDate(storedExpiryDate);
      setIsModalVisible(true);
    }
  };

const closeModal = () => {
  setIsModalVisible(false);
};




const saveDetails = () => {
  // Update stored values only for fields that were edited
  if (isCardNumberEdited) {
    setStoredCardNumber(cardNumber);
  }

  if (isCardHolderNameEdited) {
    setStoredCardHolderName(cardHolderName);
  }

  if (isExpiryDateEdited) {
    setStoredExpiryDate(expiryDate);
  }

  // Reset the edit tracking flags
  setIsCardNumberEdited(false);
  setIsCardHolderNameEdited(false);
  setIsExpiryDateEdited(false);

  // Disable editing and close the modal
  
  setIsEditable(false);
  setHasChangesBeenSaved(true);
  closeModal();

};


const cancelChanges = () => {
  // Check if the card number was edited
  if (isCardNumberEdited) {
    setCardNumber(backupCardNumber);
  } else {
    setCardNumber(storedCardNumber);
  }

  // Check if the card holder name was edited
  if (isCardHolderNameEdited) {
    setCardHolderName(backupCardHolderName);
  } else {
    setCardHolderName(storedCardHolderName);
  }

  // Check if the expiry date was edited
  if (isExpiryDateEdited) {
    setExpiryDate(backupExpiryDate);
  } else {
    setExpiryDate(storedExpiryDate);
  }

  setHasChangesBeenSaved(false); // Allow modal to be opened again
    closeModal();
};


  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
              <Image source={imageMapping[item.image]} style={styles.itemImage} />

      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        
      </View>
    </View>
  );

  
  const renderProducttotal = ({ total }) => (
    <View style={styles.productItem}>
        
        <Text style={styles.productQuantity}> Total:{total.total}</Text>
        
      
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ padding: 20, flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" style={{ marginTop: 30 }} onPress={() => navigation.goBack()} />
          <Text style={styles.text}>Payment</Text>
        </View>
        <Text style={styles.subText}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address1}>{address}</Text>
        
        </View>


        <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: -10, marginRight: -10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0 }}>
            <Text style={[styles.text1, { marginRight: 6 }]}>Items</Text>
            <View style={{ width: 30, height: 30, borderRadius: 99, backgroundColor: '#F0F8FF', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                backgroundColor: 'white',
                borderWidth: 3,
                borderColor: 'blue',
                alignItems: 'center',
                borderRadius: 20,
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 10
              }}
              onPress={() => setVoucherModalVisible(true)}
            >
              <Text style={{ color: 'blue' }}>Add Voucher</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
         
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            style={{ paddingLeft: 20, paddingRight: 20 }}
          />
          <Text style={styles.text1}>Shipping Options</Text>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
            <TouchableOpacity
  style={[
    styles.deliveryContainer,
    selectedShipping === 'Standard' ? styles.selectedDelivery : styles.unselectedDelivery
  ]}
  onPress={() => handleShippingOptionSelect('Standard')}
>
  <View>
    {selectedShipping === 'Standard' ? <TickImg /> : <TickW />}
  </View>
  <Text style={styles.text2}>Standard</Text>
  <View style={styles.infoContainer}>
    <Text style={styles.deliveryText1}>6-7 days</Text>
  </View>
  <Text style={styles.text3}>FREE</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.deliveryContainer,
    selectedShipping === 'Express' ? styles.selectedDelivery : styles.unselectedDelivery
  ]}
  onPress={() => handleShippingOptionSelect('Express')}
>
  <View>
    {selectedShipping === 'Express' ? <TickImg /> : <TickW />}
  </View>
  <Text style={styles.text2}>Express</Text>
  <View style={styles.infoContainer}>
    <Text style={styles.deliveryText1}>1-2 days</Text>
  </View>
  <Text style={styles.text3}>$80.00</Text>
</TouchableOpacity>


            </View>
          </View>

          <Text style={{ marginLeft: 18, marginRight: 20 }}>Delivered on or before Thursday, 23 April 2020</Text>

          <View style={styles.addressContainer}>
            <Text style={styles.address}>Payment Method</Text>
            <TouchableOpacity style={styles.editButton}  onPress={openModal}>
              <EditBtn />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.Card} >
            <View style={styles.cardIcons}>
              <View style={styles.iconLeft}>
                <ClrImg />
              </View>
              <View style={styles.iconRight}>
                <SettingImg />
              </View>
            </View>

            <View style={styles.cardNumbers}>
            {storedCardNumber.map((num, index) => (
                <Text key={index}>{num}</Text>
              ))}
            </View>

            <View style={styles.cardDetails}>
            <Text>{storedCardHolderName}</Text>
            <Text>{storedExpiryDate}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

        

        
     
        <View>
      <TouchableOpacity onPress={() => setVoucherModalVisible(true)}>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={handleCancelVoucher}>
      <Modal
        isVisible={isVoucherModalVisible}
        onBackdropPress={handleCancelVoucher}
        onRequestClose={() => handleCancelVoucher()}
      >
          <View style={styles.modalContainer1}>
            <Text style={{fontSize: 20, fontWeight: '700', color: Colors.BLACK,  marginBottom: 20}}>Active Vouchers</Text>

            <View style={styles.imageContainer}>
              <View style={{width: 300, height: 100, backgroundColor: 'white', borderWidth: 2, borderColor: 'blue', borderRadius: 10}}>
                <View style={{display: 'flex', flexDirection: 'row', gap: 115}}>
                  <Text style={{fontSize: 17, fontWeight: '700', color: Colors.PRIMARY, marginLeft: 10}}>Voucher</Text>
                  <Image source={require('./../../assets/Images/Valid.png')} style={{top: 5}}/>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', gap: 115,
                  padding:5,borderBottomWidth:1,borderColor:'blue',borderStyle:'dashed'}}>
                </View>
                <View style={{display:'flex' ,flexDirection:'row',gap:5}}>
                  <View style={{marginLeft:10}}>
                  <Gift/>
                  </View>
                <Text style={{fontSize: 17, fontWeight: '700', color: Colors.BLACK, marginLeft: 10}}>First Purchase</Text>
                </View>
                <Text style={{fontSize: 12, fontWeight: '700', marginLeft: 10}}>5% off for your next order</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={{width: 80, height: 30, backgroundColor: Colors.PRIMARY, borderRadius: 10, right: 10, top: 15, alignItems: 'center'}} onPress={handleApplyVoucher}>
                  <Text style={{color: 'white', top: 4}}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.imageContainer}>
              <View style={{width: 300, height: 100, backgroundColor: 'white', borderWidth: 2, borderColor: 'blue', borderRadius: 10}}>
                <View style={{display: 'flex', flexDirection: 'row', gap: 115,
                  padding:5,borderBottomWidth:1,borderColor:'blue',borderStyle:'dashed'}}>
                  <Text style={{fontSize: 17, fontWeight: '700', color: Colors.PRIMARY, marginLeft: 10}}>Voucher</Text>
                  <Image source={require('./../../assets/Images/Valid (1).png')} style={{}}/>
                </View>
                
                <View style={{display:'flex' ,flexDirection:'row',gap:5}}>
                  <View style={{marginLeft:10}}>
                  <GiftBox/>
                  </View>
                <Text style={{fontSize: 17, fontWeight: '700', color: Colors.BLACK, marginLeft: 10}}>Gift From Customer Care</Text>
                </View>
                <Text style={{fontSize: 12, fontWeight: '700', marginLeft: 10}}>15% off your next purchase</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={{width: 80, height: 30, backgroundColor: Colors.PRIMARY, borderRadius: 10, right: 10, top: 15, alignItems: 'center'}} onPress={handleApplyVoucher2}>
                  <Text style={{color: 'white', top: 4}}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>


      <TouchableWithoutFeedback onPress={closeModal}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Card</Text>
          <Text style={styles.label}>Card Holder</Text>
          <TextInput
            style={styles.input}
           placeholder='required'
            onChangeText={(text) => {
              setCardHolderName(text);
              setIsCardHolderNameEdited(true);
            }}
          />
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
           placeholder='required'
           keyboardType="numeric"
           maxLength={16}
            onChangeText={(text) => {
              const num = text.split(' ');
              setCardNumber(num);
              setIsCardNumberEdited(true);
              
            }}
          />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
                maxLength={5}
                onChangeText={(text) => {
                  // Remove non-digit characters
                  let cleanedText = text.replace(/\D/g, '');
              
                  // Format as MM/YY
                  if (cleanedText.length > 2) {
                    cleanedText = cleanedText.slice(0, 2) + '/' + cleanedText.slice(2, 4);
                  }
              
                  // Set the formatted text
                  setExpiryDate(cleanedText);
                }}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder='required'
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
             
              />
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
       
        </View>
      </Modal>
</TouchableWithoutFeedback> 
    </View>




 
    <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        
        <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
        <Text style={styles.checkoutButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
   
  },
  subText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 0,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  address: {
    fontSize: 20,
    fontWeight:'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  address1: {
    fontSize:14,
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    marginLeft: 10,
  },
  editButton1: {
    marginLeft: 75,
  },
  Cardcontainer: {
    flexDirection: 'row',
    marginBottom: 20,
    margin:30
  },
  Card: {
    backgroundColor: '#f8f8ff',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 20,
    flex: 1,
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  iconLeft: {
    position: 'absolute',
    left: -10,
    top: -10,
  },
  iconRight: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  cardNumbers: {
    flexDirection: 'row',
    gap:40,
    marginBottom: 30,
    marginTop:30
  },
  cardDetails: {
    flexDirection: 'row',
    gap:100,
  },
  Add: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical:20,
    marginLeft: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  addIcon: {
    marginTop: 0,
  },
  subViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f8ff',
    marginBottom: 10,
    borderRadius: 20,
  },
  editButton2: {
    marginLeft: 95,
  },
  imageWrapper: {
    position: 'relative',
    width: 70,
    height: 70,
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 20,
    height: 20,
    borderRadius: 99,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    fontFamily: 'RalewayB',
    fontSize:25,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 20
  },
  text2: {
    fontFamily: 'RalewayB',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft:20,
    marginRight:'auto'
  },
   text3: {
    fontFamily: 'RalewayB',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 10,
    marginLeft:'auto'
  },
  textPrice: {
    fontFamily: 'RalewayB',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 0
  },
  unselectedDelivery:{
    backgroundColor:'white',
    color:'blue'
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems:'center',
   
    padding: 10,
    justifyContent:'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 0
  },
  itemImage: {
    position: 'relative',
    width: 80,
    height:80,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'white'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0
  },
  itemText: {
    fontSize: 11,
    fontWeight: 'bold',
   marginRight:'auto',
   paddingLeft:20
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
  quantityBox: {
    width: 30,
    height: 30,
    backgroundColor: '#e6e6fa',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
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
  productItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10
  },
  productDetails: {
    flex: 1
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productPrice: {
    fontSize: 14,
    color: '#888'
  },
  productQuantity: {
    fontSize: 14,
    color: '#555'
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10
  },
  shippingOptionsContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },

  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f8f8f8'
  },
  selectedDelivery: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2
  },
  unselectedDelivery: {
    borderColor: '#ddd',
    borderWidth: 1
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  infoContainer: {
    marginLeft: 'auto'
  },
  deliveryText1: {
    fontSize: 14,
    color: '#888'
  },
  text3: {
    fontSize: 14,
    color: '#333'
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor:'black',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
  },

  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    backgroundColor:'#F0F8FF',
    borderColor: Colors.WHITE,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:20,
    paddingRight:20,
    marginLeft:10,
    marginRight:10
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'red',
  },
  infoContainer:{
  backgroundColor:'white',
  padding:10,
  borderRadius:20,
  marginRight:'auto'
  },
  deliveryText1:{
    color:'blue',
    marginLeft:9,
    marginRight:6,
    marginLeft:'auto'
  },
  addToCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft:10,
    paddingRight:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',paddingVertical:'100%'
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor:'black',
  },
 
  modalContainer: {
   backgroundColor:'white',
   flex:1
  },
  modalTitleVoucher: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop:30,
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
  modalContainer1: {

   padding:50,
    backgroundColor:'white',
  alignSelf:'center',
  borderRadius:20
  },
   modalContainer2: {

   padding:100,
    backgroundColor:'rgba(0,0,0,0.5)',
  alignSelf:'center',
  borderRadius:20
  },
  modalTitleVoucher: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft:20
  },
  imageContainer: {
    position: 'relative',
    width: 300, 
    height: 140, 
    marginBottom: 0,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 60, 
    left: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBackground:{
    flex:1,
 backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf:'baseline'
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  cardContainer: {
    width: 290,
    height: 200,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 160,
  },
  iconWrapper: {
    top: 10,
    left: 10,
  },
  cardNumberContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    left: 20,
    top: 50,
  },
  cardInput: {
    fontWeight: '700',
    fontSize: 16,
    borderBottomWidth: 1,
    width: 40,
    textAlign: 'center',
  },
  cardHolderContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 60,
    left: 30,
    top: 70,
    marginRight: 20,
  },
  cardHolderInput: {
    fontWeight: '400',
    fontSize: 16,
    borderBottomWidth: 1,
    flex: 1,
  },
  expiryDateInput: {
    fontWeight: '400',
    fontSize: 16,
    borderBottomWidth: 1,
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 200,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
  plusIcon: {
    top: 100,
    left: 13,
  },
  saveButton: {
    width: 100,
    height: 40,
    backgroundColor: Colors.PRIMARY,
    alignSelf:'center',
    borderRadius: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf:'center',
    marginTop:6
  },
  modalContainer: {
    justifyContent:'flex-end',
    margin:0
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    label: {
      marginBottom: 5,
      color: '#333',
    },
    input: {
      backgroundColor: '#f1f1f1',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      marginRight: 10,
    },
    saveButton: {
      backgroundColor: Colors.PRIMARY,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    saveButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: 'grey',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    cancelButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});

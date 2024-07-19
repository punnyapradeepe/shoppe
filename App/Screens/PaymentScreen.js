import React, { useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EditBtn, TIckB, TickW } from '../Utils/SvgIcons';
import Colors from '../Utils/Colors';
import Modal from 'react-native-modal';

const PaymentScreen = () => {
  const [selectedShipping, setSelectedShipping] = useState('Standard');
  const [address, setAddress] = useState('26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city');
  const [info, setInfo] = useState('punnyapradeep1328@gmail.com');
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  const [tempInfo, setTempInfo] = useState(info);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  

  const type = [
    {
      id: '1',
      images: require('./../../assets/Images/img40.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$17,00',
      color: 'Black',
      size: 'M',
    },
    {
      id: '2',
      images: require('./../../assets/Images/img21.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$12,00',
      color: 'Red',
      size: 'S',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <View style={styles.imageWrapper}>
          <Image source={item.images} style={styles.itemImage} />
          <View style={styles.badge}>
            <Text style={{ fontWeight: 'bold' }}>1</Text>
          </View>
        </View>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.textPrice}>{item.price}</Text>
      </View>
    </View>
  );

  const handleSaveAddress = () => {
    setAddress(tempAddress);
    setAddressModalVisible(false);
  };

  const handleCancelAddress = () => {
    setTempAddress(address);
    setAddressModalVisible(false);
  };

  const handleSaveInfo = () => {
    setInfo(tempInfo);
    setInfoModalVisible(false);
  };

  const handleCancelInfo = () => {
    setTempInfo(info);
    setInfoModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 20 ,flex:1}}>
        <Text style={styles.text}>Payment</Text>
        <Text style={styles.subText}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setAddressModalVisible(true)}>
            <EditBtn />
          </TouchableOpacity>
        </View>

        <Text style={styles.subText}>Contact Information</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{info}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setInfoModalVisible(true)}>
            <EditBtn />
          </TouchableOpacity>
        </View>

        <ScrollView
        showsVerticalScrollIndicator={false} style={{marginLeft:-10,marginRight:-10}} >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:0 }}>
            <Text style={[styles.text1, { marginRight: 6 }]}>Items</Text>
            <View style={{ width: 30, height: 30, borderRadius: 99, backgroundColor: '#F0F8FF', alignItems: 'center', justifyContent: 'center', marginRight: 90 }}>
              <Text style={{ fontWeight: 'bold' }}>2</Text>
            </View>
            <TouchableOpacity style={{ width: 100, height: 30, backgroundColor: 'white', borderWidth: 3, borderColor: 'blue', alignItems: 'center', borderRadius: 20, justifyContent: 'center' }}>
              <Text style={{ color: 'blue' }}>Add Voucher</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <FlatList
              data={type}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatList}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <Text style={styles.text1}>Shipping Options</Text>

          <View style={{ padding:5 }}>
            <TouchableOpacity
              style={[
                styles.deliveryContainer,
                selectedShipping === 'Standard' ? styles.selectedDelivery : styles.unselectedDelivery
              ]}
              onPress={() => setSelectedShipping('Standard')}
            >
              <Text style={styles.text2}>Standard</Text>
              <View style={{ right:160 }}>
                {selectedShipping === 'Standard' ? <TIckB /> : <TickW />}
              </View>
              <View style={{ width: 70, height: 24, backgroundColor: 'white', borderRadius: 10, marginLeft: -133, gap: 7 }}>
                <Text style={styles.deliveryText1}>5-7days</Text>
              </View>
              <Text style={styles.text2}>FREE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryContainer,
                selectedShipping === 'Express' ? styles.selectedDelivery : styles.unselectedDelivery
              ]}
              onPress={() => setSelectedShipping('Express')}
            >
              <Text style={styles.text2}>Express</Text>
              <View style={{ right:150 }}>
                {selectedShipping === 'Express' ? <TIckB /> : <TickW />}
              </View>
              <View style={{ width: 70, height: 20, backgroundColor: 'white', borderRadius: 10, marginLeft: -120 }}>
                <Text style={styles.deliveryText1}>1-2days</Text>
              </View>
              <Text style={styles.text2}>$800</Text>
            </TouchableOpacity>

            <Text style={{ marginLeft: 18, marginRight: 20 }}>Delivered on or before Thursday, 23 April 2020</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
            <Text style={styles.text1}>
              Payment Method
            </Text>
            <TouchableOpacity style={styles.editButton2}>
              <EditBtn />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ width: 73, height: 30, backgroundColor: '#F0F8FF', alignItems: 'center', borderRadius: 20, marginLeft: 20, marginTop: 0, marginBottom: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: 'blue', top: 5 }}>Card</Text>
          </TouchableOpacity>

        </ScrollView>
        </View>
        

        <Modal isVisible={isAddressModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Address</Text>
            <TextInput
              style={styles.input}
              value={tempAddress}
              onChangeText={setTempAddress}
              placeholder="Enter your address"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={handleCancelAddress} />
              <Button title="Save" onPress={handleSaveAddress} />
            </View>
          </View>
        </Modal>

        <Modal isVisible={isInfoModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Contact Information</Text>
            <TextInput
              style={styles.input}
              value={tempInfo}
              onChangeText={setTempInfo}
              placeholder="Enter your information"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={handleCancelInfo} />
              <Button title="Save" onPress={handleSaveInfo} />
            </View>
          </View>
        </Modal>

       
 
      <View style={styles.footer}>
          <Text style={styles.totalText}>Total  $29.00</Text>
          <TouchableOpacity style={styles.checkoutButton}>
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
    fontSize: 17,
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
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    marginLeft: 10,
  },
  editButton1: {
    marginLeft: 75,
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
    fontSize:20,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingLeft: 25
  },
  text2: {
    fontFamily: 'RalewayB',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 18
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
    marginHorizontal: 1,
    padding: 10,
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
    width: 70,
    height: 70,
    borderRadius: 99,
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
    marginBottom: 30,
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
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20, // Apply padding left and right here
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
  deliveryText1:{
    color:'blue',
    marginLeft:9,
    marginRight:6
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
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    
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

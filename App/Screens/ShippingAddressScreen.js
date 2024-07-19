import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput } from 'react-native';
import { EditBtn } from '../Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';
import Modal from 'react-native-modal';
import Colors from '../Utils/Colors';

export default function ShippingAddressScreen({ route }) {
  const { totalQuantity } = route.params;
  const navigation = useNavigation();
  
  // State to manage the address
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
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
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
      <View style={styles.ellipse}>
        <Image source={require('./../../assets/Images/Logo.png')} style={styles.loginImg} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total $29.00</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('payment')}>
          <Text style={styles.checkoutButtonText}>Check Out</Text>
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
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  subText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 0,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  address: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    marginLeft: 10,
  },
  ellipse: {
    position: 'absolute',
    width: 134,
    height: 134,
    borderRadius: 67,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    top: 300,
    left: 120,
  },
  loginImg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityIndicator: {
    width: 30,
    height: 30,
    borderRadius: 99,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
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

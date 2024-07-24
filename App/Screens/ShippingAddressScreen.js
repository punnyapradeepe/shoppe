import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { EditBtn } from '../Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';
import Modal from 'react-native-modal';
import Colors from '../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

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
      
      <View style={styles.centered}>
        <View style={styles.imageContainer}>
          <Image source={require('./../../assets/Images/Logo.png')} style={styles.loginImg} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total $29.00</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('payment')}>
          <Text style={styles.checkoutButtonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
      
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Address</Text>
          <TextInput
            style={styles.input}
            value={tempAddress}
            onChangeText={setTempAddress}
            placeholder="Enter your address"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: Colors.PRIMARY }]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: Colors.PRIMARY }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
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
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingBottom: 10,
  },
  subText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 0,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  address: {
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    marginLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'white',
    borderRadius: 99,
    padding: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginImg: {
    resizeMode: 'contain',
    width: 100, 
    height: 100, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',
  },
  totalText: {
    fontSize: 25,
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
    fontSize: 25,
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
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

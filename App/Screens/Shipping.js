import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';
import Modal from 'react-native-modal';
import Colors from './../Utils/Colors';
import { EditBtn } from './../Utils/SvgIcons';

export default function Shipping() {
  const navigation = useNavigation();

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
      <View style={styles.header}>
        <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Address</Text>
      </View>

      <Text style={styles.subText}>Shipping Address</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{address}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <EditBtn />
        </TouchableOpacity>
      </View>

      <View style={styles.centered}>
        <Image source={require('./../../assets/Images/Logo.png')} style={styles.logoImg} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'RalewayB',
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  address: {
    fontSize: 14,
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
  logoImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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

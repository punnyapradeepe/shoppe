import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Colors from './../Utils/Colors';
import { EditBtn } from './../Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';

export default function Shipping() {
  const [address, setAddress] = useState({
    place: '26, Duong So 2',
    ward: 'Thao Dien Ward',
    district: 'An Phu, District 2',
    city: 'Ho Chi Minh city',
    pin: '700000'
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
const navigation= useNavigation();
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
      <View style={styles.addressContainer}>
        <View style={{display:'flex' , flexDirection:'row',marginBottom:20}}>
      <Text style={styles.subText}>Shipping Address</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <EditBtn />
        </TouchableOpacity>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Place:</Text>
          <Text style={styles.addressText}>{address.place}</Text>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Ward:</Text>
          <Text style={styles.addressText}>{address.ward}</Text>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>District:</Text>
          <Text style={styles.addressText}>{address.district}</Text>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>City:</Text>
          <Text style={styles.addressText}>{address.city}</Text>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Pin Code:</Text>
          <Text style={styles.addressText}>{address.pin}</Text>
        </View>
       
      </View>

     

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Address</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Place</Text>
              <TextInput
                style={styles.input}
                value={tempAddress.place}
                onChangeText={(text) => setTempAddress({ ...tempAddress, place: text })}
                placeholder="Enter place"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ward</Text>
              <TextInput
                style={styles.input}
                value={tempAddress.ward}
                onChangeText={(text) => setTempAddress({ ...tempAddress, ward: text })}
                placeholder="Enter ward"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>District</Text>
              <TextInput
                style={styles.input}
                value={tempAddress.district}
                onChangeText={(text) => setTempAddress({ ...tempAddress, district: text })}
                placeholder="Enter district"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                value={tempAddress.city}
                onChangeText={(text) => setTempAddress({ ...tempAddress, city: text })}
                placeholder="Enter city"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Pin Code</Text>
              <TextInput
                style={styles.input}
                value={tempAddress.pin}
                onChangeText={(text) => setTempAddress({ ...tempAddress, pin: text })}
                placeholder="Enter pin code"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    marginHorizontal: 20,
    marginTop: 10,
  },
  addressBox: {
    backgroundColor: '#F5F5F5',
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  addressLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  addressText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  editButton: {
    marginTop: 10,
    marginLeft:'auto'
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.DARK_GRAY,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    width: '100%',
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
  cancelButton: {
    backgroundColor: Colors.GRAY,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

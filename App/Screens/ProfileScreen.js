import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { SideArrow } from '../Utils/SvgIcons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userid');
      Alert.alert('Success', 'You have successfully logged out.', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
      ]);
    } catch (error) {
      console.error('Error removing userid from AsyncStorage', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      if (!userId) {
        Alert.alert('Error', 'User ID not found.');
        return;
      }

      const response = await fetch(`http://192.168.1.40:5000/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      await AsyncStorage.removeItem('userid');
      Alert.alert('Success', 'Your account has been deleted.', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
      ]);
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'Failed to delete account.');
    }
  };

  const renderRow = (text, navigateTo) => (
    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate(navigateTo)}>
      <Text style={styles.Text2}>{text}</Text>
      <View style={styles.arrowContainer}>
        <SideArrow />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.SettingsText}>Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.Text}>Personal</Text>
          {renderRow('Profile', 'myprofile')}
          {renderRow('Shipping Address', 'Shipping')}
          {renderRow('My orders', 'orderscreen')}
         
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.Text}>Shop</Text>
          <View style={styles.row}>
            <Text style={styles.Text2}>Country</Text>
            <View style={styles.rowRight}>
              <Text>Vietnam</Text>
              <SideArrow />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.Text2}>Currency</Text>
            <View style={styles.rowRight}>
              <Text>$ USD</Text>
              <SideArrow />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.Text2}>Sizes</Text>
            <View style={styles.rowRight}>
              <Text>UK</Text>
              <SideArrow />
            </View>
          </View>
          {renderRow('Terms and Conditions', 'terms')}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.Text}>Account</Text>
          <View style={styles.row}>
            <Text style={styles.Text2}>Language</Text>
            <View style={styles.rowRight}>
              <Text>English</Text>
              <SideArrow />
            </View>
          </View>
          {renderRow('About Slada', 'about')}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>Delete My Account</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Slada</Text>
        <Text style={styles.footerVersion}>version 1.0 April, 2020</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SettingsText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  Text2: {
    fontSize: 17,
    fontWeight: '400',
  },
  arrowContainer: {
    marginRight: 5,
    marginLeft: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  logoutButtonText: {
    color: 'white',
    alignSelf: 'center',
  },
  deleteButton: {
    fontSize: 15,
    color: 'darkred',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'darkred',
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  footerVersion: {
    marginLeft: 10,
  },
});

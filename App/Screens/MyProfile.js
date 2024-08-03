import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { EditBtn } from '../Utils/SvgIcons';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyProfile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userid');
        console.log('Retrieved userId from AsyncStorage:', userId);
        if (userId) {
          const response = await fetch(`http://192.168.1.40:5000/users/${userId}`); // Update with your JSON server URL
          const data = await response.json();
          console.log('Fetched user data:', data);
          setUser(data);
          setName(data.name || '');
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
          setPassword(data.password);
        } else {
          console.warn('No userId found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      if (userId) {
        const updatedUser = { name, email, phoneNumber, password };
        const response = await fetch(`http://192.168.1.40:5000/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Updated user data:', data);
          setUser(data);
        } else {
          console.error('Error updating user data');
        }
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginTop: 23, marginRight: 0 }}>
          <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.SettingsText}>Settings</Text>
      </View>
      <Text style={styles.Text1}>Your Profile</Text>

      <Image
        source={require('./../../assets/Images/avatar-2 1.png')}
        style={{ position: 'relative', borderRadius: 99, borderWidth: 4, borderColor: 'white' }}
      />
      <View style={{ position: 'absolute', top: 130, left: 80 }}>
        <EditBtn />
      </View>
      {user ? (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Name:</Text>
          <View style={{ backgroundColor: '#e6e6fa', padding: 10, marginTop: 10, borderRadius: 20, marginBottom: 20 }}>
            <TextInput value={name} onChangeText={setName} placeholder="Name" />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Email:</Text>
          <View style={{ backgroundColor: '#e6e6fa', padding: 10, marginTop: 10, borderRadius: 20, marginBottom: 20 }}>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Phone Number:</Text>
          <View style={{ backgroundColor: '#e6e6fa', padding: 10, marginTop: 10, borderRadius: 20, marginBottom: 20 }}>
            <TextInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Password:</Text>
          <View style={{ backgroundColor: '#e6e6fa', padding: 10, marginTop: 10, borderRadius: 20, marginBottom: 20 }}>
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
          </View>
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
      <TouchableOpacity
        style={{ backgroundColor: Colors.PRIMARY, padding: 10, borderRadius: 20, marginTop: 30 }}
        onPress={handleSave}
      >
        <Text style={{ color: 'white', alignSelf: 'center' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  SettingsText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  Text1: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
});

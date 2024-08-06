import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageMapping from './../../Components/imageMapping'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


export default function OrderDetailScreen() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const getImageSource = (imageName) => {
    return imageMapping[imageName]; 
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userid');
        console.log('Retrieved User ID:', userId);
        
        if (userId) {
          const response = await fetch(`http://192.168.1.40:5000/myorder`);
          const data = await response.json();
          console.log('Fetched Data:', data);

          const userOrder = data.find(order => order.userId === userId);
          console.log('User Order:', userOrder);

          if (userOrder) {
            setOrderDetails(userOrder);
          } else {
            console.log('No order found for this user.');
          }
        } else {
          console.log('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No order details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{display:'flex', flexDirection:'row'}}>
        <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={() => navigation.goBack()} />
     <Text style={styles.heading}>Order Details</Text>
     </View>
      <FlatList
        data={orderDetails.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={getImageSource(item.image)}
              style={styles.image}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productText}>Price: {item.price}</Text>
              <Text style={styles.productText}>Size: {item.size}</Text>
              <Text style={styles.productText}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop:20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productText: {
    fontSize: 16,
    color: '#666',
  },
  orderSummary: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 20,
    elevation: 2,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

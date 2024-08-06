import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function OrderDetailScreen() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text>No order details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Orders</Text>
      <FlatList
        data={orderDetails.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Size: {item.size}</Text>
              <Text>Quantity: {item.quantity}</Text>
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
    backgroundColor: '#fff',
  
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop:20
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderSummary: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

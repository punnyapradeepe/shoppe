import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import RecentlyViewed from './../../Components/RecentlyViwed';
import JustForYou from '../../Components/JustForYou';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './../../Components/imageMapping';
import { AntDesign } from '@expo/vector-icons';
import AddToCart from '../../Components/AddToCart';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MostPopularDetail = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.40:5000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => {
        console.error('Error fetching product details:', error);
        setProduct(null);
      });
  }, [id]);

  const getImageSource = (imageName) => {
    return imageMapping[imageName];
  };

  const handleAddToCartPress = async (product) => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const productData = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        userId: userId,
        quantity: 1
      };

      const response = await fetch('http://192.168.1.40:5000/cart');
      const cartItems = await response.json();
      const existingItem = cartItems.find(item => item.id === product.id && item.userId === userId);

      if (existingItem) {
        await fetch(`http://192.168.1.40:5000/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...existingItem,
            quantity: existingItem.quantity + 1
          }),
        });
      } else {
        await fetch('http://192.168.1.40:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }
    } catch (error) {
      console.error('Failed to add or update cart item:', error);
    }
  };

  const handleFavPress = async (product) => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const productData = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        userId: userId,
        quantity:1
      };

      const response = await fetch('http://192.168.1.40:5000/favorites');
      const favoriteItems = await response.json();
      const existingItem = favoriteItems.find(item => item.id === product.id && item.userId === userId);

      if (!existingItem) {
        await fetch('http://192.168.1.40:5000/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }
    } catch (error) {
      console.error('Failed to add favorite item:', error);
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text> 
        </ScrollView>
      </SafeAreaView>
    );
  }


  return (
   
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <ScrollView style={styles.container}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Image source={getImageSource(product.image)} style={styles.image} />
        <Text style={styles.type}> {product.price}</Text>
        <Text style={styles.type}> {product.title}</Text>
        {product.text && <Text style={styles.description}>Description: {product.text}</Text>}
       
        <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
      }}>
        Size guide
      </Text>
      <TouchableOpacity style={{
        backgroundColor: '#007bff',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <AntDesign name="arrowright" size={24} color="#fff" /> 
      </TouchableOpacity>
    </View>
        <RecentlyViewed />
        <JustForYou />
    
      </ScrollView>
      <AddToCart product={product} onAddToCartPress={handleAddToCartPress} onFavPress={handleFavPress} />

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  type: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
});

export default MostPopularDetail;

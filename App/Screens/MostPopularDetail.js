import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import RecentlyViewed from './../../Components/RecentlyViwed';
import JustForYou from '../../Components/JustForYou';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './../../Components/imageMapping';

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

  if (!product) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <ScrollView style={styles.container}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Image source={getImageSource(product.image)} style={styles.image} />
        <Text style={styles.type}>Type: {product.type}</Text>
        {product.text && <Text style={styles.description}>Description: {product.text}</Text>}
        <RecentlyViewed />
        <JustForYou />
    
      </ScrollView>
    </View>
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
    marginBottom: 20,
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

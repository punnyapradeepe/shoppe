import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import RecentlyViewed from './../../Components/RecentlyViwed';
import JustForYou from '../../Components/JustForYou';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './../../Components/imageMapping';
import { AntDesign } from '@expo/vector-icons';


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
    <View style={{ flex: 1, paddingTop: 30 }}>
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

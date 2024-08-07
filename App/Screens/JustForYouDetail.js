import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { StarImgClr, StarImgLayout } from '../Utils/SvgIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddToCart from '../../Components/AddToCart';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './../../Components/imageMapping'; 
import FlashSale from './../../Components/FlashSale';
import JustForYou from '../../Components/JustForYou';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JustForYouDetail = ({ route }) => {
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


  const handleBuyNowPress = async (product) => {
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

      // Save product details to the server
      await fetch('http://192.168.1.40:5000/buynow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      // Optionally, handle navigation or show a success message
      console.log('Product saved for Buy Now');
    } catch (error) {
      console.error('Failed to save product for Buy Now:', error);
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
          <AntDesign name="arrowleft" size={30} color={Colors.TEXT} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Image
          source={getImageSource(product.image)}
          style={styles.image}
        />
        <Text style={styles.text}>Description: {product.title}</Text>
        <Text style={styles.price}>Price: {product.price}</Text>

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

        <View style={styles.reviewerContainer}>
          <Image
            source={require('./../../assets/Images/veronika.png')}
            style={styles.reviewerImage}
          />
          <View style={styles.reviewerDetails}>
            <Text>Veronika</Text>
            <StarImgClr />
            <StarImgClr />
            <StarImgClr />
            <StarImgClr />
            <StarImgLayout />
          </View>
          <Text>
            Lorem ipsum dolor sit amet, conset sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed...
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All Reviews</Text>
        </TouchableOpacity>
       
        <JustForYou/>
        <FlashSale/>
      </ScrollView>
      <AddToCart product={product} onAddToCartPress={handleAddToCartPress} onFavPress={handleFavPress} onBuyNowPress={handleBuyNowPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
    marginBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.HEADER_BACKGROUND,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
  },
  image: {
    width: '100%',
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  sizeGuideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sizeGuideText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 20,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 15,
  },
  reviewerContainer: {
    marginTop: 20,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 99,
    marginBottom: 10,
  },
  reviewerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'Regular',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default JustForYouDetail;

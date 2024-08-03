import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './../Utils/Colors';
import AddToCart from '../../Components/AddToCart';
import { AntDesign } from '@expo/vector-icons';
import MostPopular from '../../Components/MostPopular';
import JustForYou from '../../Components/JustForYou';
import { EllipsImg, Share, StarImgClr, StarImgLayout } from '../Utils/SvgIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const NewItemDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState(item); // Initialize product with item from route params

  const renderItem = ({ item }) => (
    <Image source={item} style={styles.image} />
  );

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.container}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={() => navigation.goBack()} />
          <View style={styles.imageContainer}>
            <FlatList
              data={item.images}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              onScroll={onScroll}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(image, index) => index.toString()}
              style={styles.flatList}
            />
            <View style={styles.dotContainer}>
              {item.images.map((_, index) => (
                <View key={index} style={[styles.dot, index === activeIndex ? styles.activeDot : null]} />
              ))}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <Text style={styles.description}>{item.Dis}</Text>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Text style={styles.TextStyle}>Variations</Text>
            <Text style={styles.TextStyle}></Text>
            <Text>{item.color}</Text>
            <Text>{item.size}</Text>
            <TouchableOpacity style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>

          <View style={styles.variationsContainer}>
            {item.variations && item.variations.map((variation, index) => (
              <Image key={index} source={variation} style={styles.variationImage} />
            ))}
          </View>

          <Text style={styles.TextStyle}>Specifications</Text>
          <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: '700' }}>Material</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            {item.Material && item.Material.map((material, index) => (
              <View key={index} style={styles.materialContainer}>
                <Text style={styles.materialText}>{material}</Text>
              </View>
            ))}
          </View>
          <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: '700' }}>Origin</Text>
          <View style={styles.originContainer}>
            <Text style={styles.originText}>EU</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>Size guide</Text>
            <TouchableOpacity style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>

          <Text style={styles.TextStyle}>Delivery</Text>
          <TouchableOpacity style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>Standard</Text>
            <Text style={styles.deliveryText1}>5-7 days</Text>
            <Text style={styles.deliveryText}>$100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>Express</Text>
            <Text style={styles.deliveryText1}>1-2 days</Text>
            <Text style={styles.deliveryText}>$800</Text>
          </TouchableOpacity>

          <Text style={styles.TextStyle}>Rating & Reviews</Text>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop: 20, marginBottom: 20 }}>
            <StarImgClr style={{ width: 15, height: 15 }} />
            <StarImgClr style={{ width: 15, height: 15 }} />
            <StarImgClr style={{ width: 15, height: 15 }} />
            <StarImgClr style={{ width: 15, height: 15 }} />
            <StarImgLayout style={{ width: 15, height: 15 }} />
            <View style={{ width: 38, height: 20, backgroundColor: 'lightblue', borderRadius: 10, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>4/5</Text>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Image source={require('./../../assets/Images/veronika.png')} style={styles.reviewImage} />
            <View>
              <Text>Veronika</Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                <StarImgClr style={{ width: 15, height: 15 }} />
                <StarImgClr style={{ width: 15, height: 15 }} />
                <StarImgClr style={{ width: 15, height: 15 }} />
                <StarImgClr style={{ width: 15, height: 15 }} />
                <StarImgLayout style={{ width: 15, height: 15 }} />
              </View>
              <Text>Lorem ipsum dolor sit amet, conset sadip.</Text>
              <Text>ipsum sit amet.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View All Reviews</Text>
          </TouchableOpacity>
          <MostPopular />
          <Text style={styles.recentlyViewedText}>You Might Like</Text>
          <JustForYou />

        </View>
      </ScrollView>
      <AddToCart product={product} onAddToCartPress={handleAddToCartPress} onFavPress={handleFavPress} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  imageContainer: {
    height: 250,
    marginTop: 20,
  },
  image: {
    width: width - 32,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  flatList: {
    height: 250,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.PRIMARY,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
   
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginBottom: 16,
  },
  variationsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  variationImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 4,
    marginRight: 8,
  },
  TextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialContainer: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
  },
  materialText: {
    fontSize: 14,
    color: '#000',
  },
  originContainer: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
  },
  originText: {
    fontSize: 14,
    color: '#000',
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
  },
  deliveryText: {
    color: 'black',
    fontWeight: '700',
  },
  deliveryText1: {
    color: 'gray',
    fontWeight: '700',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentlyViewedText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 20,
  },
  reviewImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default NewItemDetail;

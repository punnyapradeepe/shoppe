import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../App/Utils/Colors';
import { AddBtn, DeleteBtn } from '../App/Utils/SvgIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageMapping from './../Components/imageMapping'; 
import { useFocusEffect } from '@react-navigation/core';

const WishList = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        fetchFavorites(userId);
      }
    }, [userId])
  );



  const handleAddToCart = async (item) => {
    try {
      const response = await fetch(`http://192.168.1.40:5000/cart?userId=${userId}`);
      const cartItems = await response.json();
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        await fetch(`http://192.168.1.40:5000/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...existingItem,
            quantity: existingItem.quantity + 1,
          }),
        });
      } else {
        await fetch('http://192.168.1.40:5000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            ...item,
            quantity: 1, 
          }),
        });
      }

      await fetch(`http://192.168.1.40:5000/favorites/${item.id}`, {
        method: 'DELETE',
      });

      fetchFavorites(userId);
    } catch (error) {
      console.error('Error updating favorites and cart:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await fetch(`http://192.168.1.40:5000/favorites/${itemId}`, {
        method: 'DELETE',
      });

      setFavorites(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to delete favorite item:', error);
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      const response = await fetch(`http://192.168.1.40:5000/favorites?userId=${userId}`);
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const getImageSource = (imageName) => {
    return imageMapping[imageName];
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={getImageSource(item.image)} 
        style={styles.itemImage} 
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.priceContainer}>
          {item.originalPrice && <Text style={styles.orgPrice}>{item.originalPrice}</Text>}
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <View style={styles.colorSizeContainer}>
          <Text style={styles.itemColor}>{item.category}</Text>
          <Text style={styles.itemSize}>{item.size}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
              <AddBtn />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => handleDelete(item.id)}>
              <DeleteBtn />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  orgPrice: {
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemPrice: {
    fontSize: 19,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Raleway',
  },
  colorSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemColor: {
    fontSize: 17,
    color: Colors.LIGHTBLUE,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 2,
    width: 54,
    textAlign: 'center',
    marginRight: 5,
  },
  itemSize: {
    fontSize: 17,
    color: Colors.LIGHTBLUE,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 2,
    width: 50,
    textAlign: 'center',
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft:'auto',
    marginTop: 5,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  addButton: {
    marginRight:60
  },
  flatList: {
    paddingBottom: 20,
  },
});

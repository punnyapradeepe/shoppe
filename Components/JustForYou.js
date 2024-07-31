import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../App/Utils/Colors';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './imageMapping';

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.40:5000/products?category=clothing')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.type !== 'flashsale' &  product.type !== 'stories');
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getImageSource = (imageName) => {
    return imageMapping[imageName];
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          {products.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() => navigation.navigate('justforyoudetail', { id: item.id })}
            >
              <View style={styles.imageContainer}>
                <Image source={getImageSource(item.image)} style={styles.image} />
              </View>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    backgroundColor: Colors.WHITE,
    width: '48%',
    borderRadius: 20,
    margin: '1%',
    marginBottom: 10,
  },
  imageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 6,
    borderColor: Colors.WHITE,
    alignSelf: 'center',
  },
  itemText: {
    paddingLeft: 5,
    fontWeight: '400',
    marginVertical: 10,
  },
  itemPrice: {
    paddingLeft: 8,
    paddingTop: 10,
    fontWeight: '700',
    fontFamily: 'Raleway',
    fontSize: 17,
    marginBottom: 5,
  },
});

export default JustForYou;

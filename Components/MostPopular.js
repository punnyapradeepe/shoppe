import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../App/Utils/Colors';
import { HeartImg2, TextImg } from '../App/Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './../Components/imageMapping'

const MostPopular = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.40:5000/products?category=clothing')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.type === 'mostpopular');
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getImageSource = (imageName) => {
    return imageMapping[imageName] ; 
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.recentlyViewedText}>Most Popular</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
          <Text style={{ fontWeight: 'bold', marginRight: 5 }}>See All</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('populardetail', { id: item.id })}
            style={{ backgroundColor: Colors.WHITE, width: 145, height: 210, marginRight: 10, borderRadius: 10 }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={getImageSource(item.image)}
                style={{ width: 145, height: 250, borderRadius: 10, borderWidth: 6, borderColor: Colors.WHITE }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <View style={{ paddingTop: 15, left: 13 }}>
                <TextImg />
              </View>
              <View style={{ paddingTop: 15, left: -19 }}>
                <HeartImg2 />
              </View>
              <Text style={{ paddingTop: 7, fontWeight: '400', gap: 10, fontFamily: 'Raleway', fontWeight: '650', fontSize: 17, right: 10 }}>{item.sale}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MostPopular;

const styles = StyleSheet.create({
  imageContainer: {
    width: 140,
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 5
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

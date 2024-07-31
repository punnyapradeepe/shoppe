import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clk2, ClkImg, ClkTym, ClkTym1 } from '../App/Utils/SvgIcons';
import imageMapping from './../Components/imageMapping';

const FlashSale = () => {
  const navigation = useNavigation();
  const [flashSaleRow1, setFlashSaleRow1] = useState([]);
  const [flashSaleRow2, setFlashSaleRow2] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.40:5000/products?category=clothing1')
      .then(response => response.json())
      .then(data => {
        const row1Items = data.filter(product => product.type === 'flashsale' && product.row === 1);
        const row2Items = data.filter(product => product.type === 'flashsale' && product.row === 2);

        setFlashSaleRow1(row1Items);
        setFlashSaleRow2(row2Items);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getImageSource = (imageName) => {
    return imageMapping[imageName];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.recentlyViewedText}>Flash Sale</Text>
        <View style={styles.timerContainer}>
          <View><ClkImg /></View>
          <View style={styles.timerBox}><ClkTym1 /></View>
          <View style={styles.timerBox}><Clk2 /></View>
          <View style={styles.timerBox}><ClkTym /></View>
        </View>
      </View>

    
      <View style={styles.rowContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {flashSaleRow1.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('flashSale', { id: item.id })}>
              <View style={styles.imageContainer}>
                <Image source={getImageSource(item.image)} style={styles.image} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.rowContainer}>
      
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {flashSaleRow2.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('flashSale', { id: item.id })}>
              <View style={styles.imageContainer}>
                <Image source={getImageSource(item.image)} style={styles.image} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  recentlyViewedText: {
    fontSize: 30,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerBox: {
    backgroundColor: 'pink',
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  rowContainer: {
    marginBottom: 10,
  },
  rowTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  imageContainer: {
    width: 130,
    height: 150,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginRight: 10,
  
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

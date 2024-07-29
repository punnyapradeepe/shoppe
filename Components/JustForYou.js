import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../App/Utils/Colors';
import { useNavigation } from '@react-navigation/core';
import imageMapping from './imageMapping';

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.40:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const getImageSource = (imageName) => {
    return imageMapping[imageName] ; 
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {products.map((item) =>{
          return(
   
          
              <TouchableOpacity
                key={item.id}
                style={styles.itemContainer}
                onPress={() => navigation.navigate('justforyoudetail', { item })}
              >
                <View style={styles.imageContainer}>
                <Image source={getImageSource(item.image)} style={styles.image} />
                </View>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </TouchableOpacity>
          
         
          )
        } 

        )}
        </View>
      </ScrollView>

    </View>
  );
};

export default JustForYou;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
   
  },
  itemContainer: {
    backgroundColor: Colors.WHITE,
    width: '48%',
    borderRadius: 20,
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

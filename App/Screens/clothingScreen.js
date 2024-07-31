import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from './../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import imageMapping from './../../Components/imageMapping';
import { AntDesign } from '@expo/vector-icons';

const CategoryScreen = () => {
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;

  useEffect(() => {
    fetch(`http://192.168.1.40:5000/products?category=${category}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [category]);

  const getImageSource = (imageName) => {
    return imageMapping[imageName];
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft:10}}>
          <AntDesign name="arrowleft" size={30} color={Colors.TEXT} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.productsContainer}>
          {products.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() => navigation.navigate('justforyoudetail', {id:item.id })}
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

export default CategoryScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.HEADER_BACKGROUND,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TEXT,
   
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  productsContainer: {
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

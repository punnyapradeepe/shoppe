import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import imageMapping from './../Components/imageMapping'

const Stories = () => {


  const [products, setProducts] = useState([]);
  

 useEffect(() => {
    fetch('http://192.168.1.40:5000/products?category=clothing')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.type === 'stories');
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getImageSource = (imageName) => {
    return imageMapping[imageName] ; 
  };

  return (
   
    <View style={styles.container}>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image 
              source={getImageSource(item.image)}
              style={styles.image} 
              resizeMode="cover"
            />
            <Image 
              source={require('./../assets/Images/Group 1497.png')} 
              style={styles.overlayImage} 
            />
            {item.live && (
              <Image
                source={require('./../assets/Images/baige.png')}  
                style={styles.liveImage} 
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  imageContainer: {
    width: 105,
    height: 190,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginRight:5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlayImage: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  liveImage: {
    position: 'absolute',
    top: '3%',
    left: '6%',
  },
});

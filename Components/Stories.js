import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

const Stories = () => {
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/Img6.png'),
      img: require('./../assets/Images/Group 1497.png'),
      live: require('./../assets/Images/baige.png')
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/Img7.png'),
      img: require('./../assets/Images/Group 1497.png')
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/Img8.png'),
      img: require('./../assets/Images/Group 1497.png')
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/Img9.png'),
      img: require('./../assets/Images/Group 1497.png')
    },
  ];

  return (
   
    <View style={styles.container}>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {type.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image 
              source={item.imageSource} 
              style={styles.image} 
              resizeMode="cover"
            />
            <Image 
              source={item.img} 
              style={styles.overlayImage} 
            />
            {item.live && (
              <Image
                source={item.live}  
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

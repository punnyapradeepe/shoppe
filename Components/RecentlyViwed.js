import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const RecentlyViewed = () => {
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/Img1.png'),
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/Img2.png'),
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/Img3.png'),
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/Img4.png'),
    },
    {
      id: '5',
      imageSource: require('./../assets/Images/Img5.png'),
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img12.png'),
    },
    {
      id: '7',
      imageSource: require('./../assets/Images/img15.png'),
    },
    {
      id: '8',
      imageSource: require('./../assets/Images/img13.png'),
    },
    {
      id: '9',
      imageSource: require('./../assets/Images/Img1.png'),
    },
    {
      id: '10',
      imageSource: require('./../assets/Images/Img2.png'),
    },
    {
      id: '11',
      imageSource: require('./../assets/Images/Img3.png'),
    },
    {
      id: '12',
      imageSource: require('./../assets/Images/Img4.png'),
    },
    {
      id: '13',
      imageSource: require('./../assets/Images/Img5.png'),
    },
    {
      id: '14',
      imageSource: require('./../assets/Images/img12.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {type.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image source={item.imageSource} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyViewed;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 70,
    height:70,
    borderRadius:99
  },
});

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../App/Utils/Colors'; // Assuming you have Colors in your project
import { Clk2, ClkImg, ClkTym, ClkTym1, ClockImg } from '../App/Utils/SvgIcons';

const FlashSale = () => {
  const type1 = [
    {
      id: '1',
      imageSource: require('./../assets/Images/img40.png'),
      img: require('./../assets/Images/discount.png'),
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img41.png'),
      img: require('./../assets/Images/discount.png')
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/img42.png'),
      img: require('./../assets/Images/discount.png')
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img43.png'),
      img: require('./../assets/Images/discount.png')
    },
  ];

  const type2 = [
    {
      id: '5',
      imageSource: require('./../assets/Images/img44.png'),
      img: require('./../assets/Images/discount.png'),
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img45.png'),
      img: require('./../assets/Images/discount.png')
    },
    {
      id: '7',
      imageSource: require('./../assets/Images/img46.png'),
      img: require('./../assets/Images/discount.png')
    },
    {
      id: '8',
      imageSource: require('./../assets/Images/img47.png'),
      img: require('./../assets/Images/discount.png')
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.recentlyViewedText}>Flash Sale</Text>
        <View style={{paddingLeft:100}}>
        <ClkImg/>
        </View>
        <View style={styles.timerContainer}>
          <View style={styles.timerBox}>
            <ClkTym1/>
          </View>
          <View style={styles.timerBox}>
            <Clk2/>
          </View>
          <View style={styles.timerBox}>
            <ClkTym/>
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {type1.map((item) => (
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
          </View>
        ))}
      </ScrollView>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {type2.map((item) => (
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
          </View>
        ))}
      </ScrollView>
      
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerBox: {
    backgroundColor: 'pink',
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  imageContainer: {
    width: 99,
    height: 103,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth:4,
    borderColor:'white',
    borderRadius: 10,
  },
  overlayImage: {
    position: 'absolute',
    top: '4%',
    left: '57%',
  },
});

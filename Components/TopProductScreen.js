import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TopProductScreen = () => {
  const type = [
    {
      id: '1',
      imageSource: require('./../assets/Images/Img1.png'),
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img26.png'),
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/img31.png'),
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img35.png'),
    },
    {
      id: '5',
      imageSource: require('./../assets/Images/img25.png'),
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img30.png'),
    },
    {
      id: '7',
      imageSource: require('./../assets/Images/img44.png'),
    },
    {
      id: '8',
      imageSource: require('./../assets/Images/img45.png'),
    },
    {
      id: '9',
      imageSource: require('./../assets/Images/img46.png'),
    },
    {
      id: '10',
      imageSource: require('./../assets/Images/img50.png'),
    },
    {
      id: '1',
      imageSource: require('./../assets/Images/img40.png'),
    },
    {
      id: '2',
      imageSource: require('./../assets/Images/img41.png'),
    },
    {
      id: '3',
      imageSource: require('./../assets/Images/img42.png'),
    },
    {
      id: '4',
      imageSource: require('./../assets/Images/img21.png'),
    },
    {
      id: '5',
      imageSource: require('./../assets/Images/img22.png'),
    },
    {
      id: '6',
      imageSource: require('./../assets/Images/img26.png'),
    },
    
  ];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.recentlyViewedText}>Top Produts</Text>
      </View>
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

export default TopProductScreen

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imageContainer: {
    marginRight: 10,
   

  },
  recentlyViewedText: {
    fontSize: 30,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 20, 
    marginTop:10
  },
  image: {
    width: 100,
    height:100,
    borderRadius:99,
    borderWidth:5,
    borderColor:'white'
  },
})

 


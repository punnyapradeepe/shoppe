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
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10, 
    marginTop:10
  },
  image: {
    width: 55,
    height:55,
    borderRadius:99,
    borderWidth:5,
    borderColor:'white'
  },
})

 


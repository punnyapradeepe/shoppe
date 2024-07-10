import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from './../Utils/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.bubblesContainer}>
        <Image
          style={styles.bubble}
          source={require('./../../assets/Images/bubble 01 (3).png')}
        />
        <Image
          style={styles.bubble}
          source={require('./../../assets/Images/bubble 02 (2).png')}
        />
      </View>
      <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          source={require('./../../assets/Images/Card Shape.png')}
        />
        <View style={styles.contentContainer}>
          <Image
            style={styles.homeImage}
            source={require('./../../assets/Images/HomeImg.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Hello</Text>
            <View style={styles.description}>
              <Text>Lorem ipsum dolor sit amet,</Text>
              <Text>  consectetur adipiscing elit.</Text>
              <Text>Sed non consectetur turpis.</Text>
              <Text>   Morbi eu eleifend lacus.</Text>
            </View>
          </View>
        </View>
      </View>
      <Image
        style={styles.dots}
        source={require('./../../assets/Images/Dots.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  bubblesContainer: {
    position: 'relative',
  },
  bubble: {
    resizeMode: 'contain',
  },
  cardContainer: {
    position: 'absolute',
    top: 70,
    bottom: 50,
    alignItems: 'center',
    right: 10,
    left: 10,
  },
  cardImage: {
    resizeMode: 'contain',
    position: 'relative',
    height: 680,
    width: 3020,
  },
  contentContainer: {
    position: 'absolute',
    width:'90%',
    top:0,
    left:9
  },
  homeImage: {
    resizeMode: 'contain',
    position: 'absolute',
    width:322,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textContainer: {
    position: 'absolute',
  },
  greeting: {
    fontSize: 30,
    fontWeight: 'bold',
    left: '60%',
    top: 380,
    fontFamily: 'RalewayB',
  },
  description: {
    left: '35%',
    fontSize: 30,
    gap: 10,
    alignContent: 'center',
    width: 224,
    height: 111,
    top: 390,
  },
  dots: {
    resizeMode: 'contain',
    left: '20%',
    bottom: 20,
  },
});

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Colors from './../Utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    imageSource: require('./../../assets/Images/HomeImg.png'),
    text: 'Lorem ipsum dolor sit amet,. consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
  },
  {
    id: '2',
    imageSource: require('./../../assets/Images/Placeholder_01.jpg'),
    text: 'Lorem ipsum dolor sit amet,. consectetur adipiscing elit.',
  },
  {
    id: '3',
    imageSource: require('./../../assets/Images/HomeImg.png'),
    text: 'Lorem ipsum dolor sit amet,. consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.',
  },
  {
    id: '4',
    imageSource: require('./../../assets/Images/Placeholder_01.jpg'),
    text: 'Lorem ipsum dolor sit amet,. consectetur adipiscing elit.',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('activity')} style={styles.button}>
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubblesContainer}>
        <Image
          style={styles.bubbleTopLeft}
          source={require('./../../assets/Images/bubble 01 (3).png')}
        />
        <Image
          style={styles.bubble}
          source={require('./../../assets/Images/bubble 02 (2).png')}
        />
      </View>

      <FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex((x / width).toFixed(0));
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.sliderContainer}>
            <Image style={styles.homeImage} source={item.imageSource} />
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>{item.id === '2' || item.id === '4' ? 'Ready' : 'Hello'}</Text>
              <View style={styles.description}>
                {item.text.split('. ').map((line, index) => (
                  <Text key={index}>{line}</Text>
                ))}
              </View>
              {item.id === '2' || item.id === '4' ? renderButton() : null}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex == index && styles.activeIndicator
            ]}
          />
        ))}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.cancelButton}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  bubblesContainer: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: -1,
  },
  bubbleTopLeft: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  bubble: {
    position: 'absolute',
    resizeMode: 'cover',
    top: '40%',
    width: width * 0.5,
    height: height * 0.4,
  },
  sliderContainer: {
    width,
    height: height * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  homeImage: {
    width: '80%',
    height: height * 0.45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 0,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'RalewayB',
  },
  description: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    gap: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: 201,
    height: 50,
    borderRadius: 99,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '83%',
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 90,
    backgroundColor: 'gray',
    marginLeft: 5,
  },
  activeIndicator: {
    width: 15,
    height: 15,
    borderRadius: 99,
    backgroundColor: Colors.PRIMARY,
  },
  cancelButton: {
    alignSelf: 'center',
    marginBottom: 40,
  },
});

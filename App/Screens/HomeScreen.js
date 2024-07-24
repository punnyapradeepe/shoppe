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
      
      <View style={{ height: height * 0.85, justifyContent: 'center', alignItems: 'center',flex:1 }}>
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
            <View style={{ width, height: height * 0.85, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.cardContainer}>
                {/*<Image style={styles.cardImage} source={require('./../../assets/Images/Card Shape.png')} />*/}
                <View style={styles.contentContainer}>
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
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' ,position:'absolute',top:'83%'}}>
        {data.map((_, index) => (
          <View
            key={index}
            style={{
              width: currentIndex == index ? 15 : 14,
              height: currentIndex == index ? 15 : 14,
              borderRadius: currentIndex == index ? 99 : 90,
              backgroundColor: currentIndex == index ? Colors.PRIMARY : 'gray',
              marginLeft: 5,
              top: '10%',
            }}
          />
        ))}
      </View>
      
          <TouchableOpacity onPress={() => navigation.goBack()} style={{alignSelf:'center',marginBottom:40}}>
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
    top: 0,
    left: 0,
    width: width * 0.5, 
    height: height * 0.3, 
    resizeMode: 'contain',
  },
  bubble: {
    position: 'absolute',
    resizeMode: 'cover',
    top: '40%',
    width: width * 0.5,
    height: height * 0.4,
  }, circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cardContainer: {
    width: '82%',
    height: '89%',
    elevation:5,
    alignItems: 'center',
    marginBottom: 20,
    top: 65,
    position: 'relative',
    backgroundColor:'white',
    borderRadius:30
  },
  cardImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height * 0.45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom:30,
    fontFamily: 'RalewayB',
  },
  description: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
    gap:10,
    fontSize:20
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width:201,
    height:50,
    borderRadius:99,
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

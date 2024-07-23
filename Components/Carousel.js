import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, SafeAreaView, Dimensions, Animated, Text } from 'react-native';
import Colors from '../App/Utils/Colors';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const carouselData = [
    { id: '1', imageSource: require('./../assets/Images/img20-removebg-preview.png'), backgroundColor: '#a52a2a', text: 'Big Sale' ,text1: 'Up to 50%',text2: 'Happening ' ,text3: 'Now'},
    { id: '2', imageSource: require('./../assets/Images/img46-removebg-preview.png'), backgroundColor: '#ADD8E6' ,text2: 'Sale is Live!!' ,text3:'Buy Now'},
    { id: '3', imageSource: require('./../assets/Images/img40-removebg-preview.png'), backgroundColor: '#1c5c9a', text: 'Big Sale' ,text1: 'Up to 50%',text2: 'Happening Now'  },
    { id: '4', imageSource: require('./../assets/Images/img41-removebg-preview.png'), backgroundColor: '#00008B',  text: 'Big Sale' ,text1: 'Up to 50%',text2: 'Happening Now' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(autoplay);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.text1}>{item.text1}</Text>
      <Text style={styles.text2}>{item.text2}</Text>
      <Text style={styles.text3}>{item.text3}</Text>
      <Image source={item.imageSource} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={carouselData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          snapToInterval={width}
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
        />
        <View style={styles.indicatorContainer}>
          {carouselData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: index === currentIndex ? Colors.PRIMARY : '#95a5a6' },
                { width: index === currentIndex ? 50 : 10 }
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  
  },
  itemContainer: {
    width,
  
    position: 'relative',
  },
  image: {
  marginBottom:-60,
    resizeMode: 'contain',
  },
  text: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1, 
  },
  text1: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1, 
  },
  text2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1, 
  },
  text3: {
    position: 'absolute',
    top: '60%',
    left: '60%',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1, 
  },
  text4: {
    position: 'absolute',
    top: '70%',
    left: '60%',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1, 
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Carousel;

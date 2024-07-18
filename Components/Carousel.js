import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, SafeAreaView, Animated } from 'react-native';
import Colors from '../App/Utils/Colors';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const carouselData = [
    { id: '1', imageSource: require('./../assets/Images/img20.png'), backgroundColor: '#a52a2a' },
    { id: '2', imageSource: require('./../assets/Images/img46.png'), backgroundColor: '#ADD8E6' },
    { id: '3', imageSource: require('./../assets/Images/img40.png'), backgroundColor: '#483d8b' },
    { id: '4', imageSource: require('./../assets/Images/img41.png'), backgroundColor: '#00008B' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(autoplay);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'contain',
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

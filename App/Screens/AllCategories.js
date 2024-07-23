import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, TextInput, Dimensions } from 'react-native';
import Colors from '../Utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { CameraImg, Text109, Text218, Text530, Text87 } from './../Utils/SvgIcons';
import { useNavigation } from '@react-navigation/native';
import TopProductScreen from '../../Components/TopProductScreen';
import NewItems from '../../Components/NewItems';
import FlashSale from '../../Components/FlashSale';
import MostPopular from '../../Components/MostPopular';
import JustForYou from '../../Components/JustForYou';
import Carousel from '../../Components/Carousel';

const { width } = Dimensions.get('window'); // Get screen width

const AllCategories = () => {
  const navigation = useNavigation();

  const images = [
    require('./../../assets/Images/img20.png'),
    require('./../../assets/Images/img21.png'),
    require('./../../assets/Images/img22.png'),
    require('./../../assets/Images/img23.png'),
    require('./../../assets/Images/img24.png'),
    require('./../../assets/Images/img25.png'),
    require('./../../assets/Images/img26.png'),
    require('./../../assets/Images/img27.png'),
    require('./../../assets/Images/img28.png'),
    require('./../../assets/Images/img29.png'),
    require('./../../assets/Images/img30.png'),
    require('./../../assets/Images/img31.png'),
    require('./../../assets/Images/img32.png'),
    require('./../../assets/Images/img33.png'),
    require('./../../assets/Images/img34.png'),
    require('./../../assets/Images/img35.png'),
    require('./../../assets/Images/h1.png'),
    require('./../../assets/Images/h2.png'),
    require('./../../assets/Images/h3.png'),
    require('./../../assets/Images/h4.png'),
    require('./../../assets/Images/j1.png'),
    require('./../../assets/Images/j2.png'),
    require('./../../assets/Images/j3.png'),
    require('./../../assets/Images/j4.png'),
  ];

  const categoryTexts = ['Clothing', 'Shoes', 'Bags', 'Watch', 'Hoodies', 'Jeans'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Shop</Text>
        <TextInput placeholder='Search' style={styles.textInput} />
        <View style={styles.cameraIcon}>
          <CameraImg />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.carouselContainer}>
          <Carousel />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.recentlyViewedText}>Categories</Text>
          <View style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See All</Text>
            <TouchableOpacity style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainContainer}>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: 2 }).map((_, colIndex) => (
                <TouchableOpacity key={colIndex} style={styles.whiteBackground}>
                  <View style={styles.imageGrid}>
                    {Array.from({ length: 4 }).map((_, imgIndex) => (
                      <Image
                        key={imgIndex}
                        source={images[rowIndex * 8 + colIndex * 4 + imgIndex]}
                        style={[styles.categoryImage, { height: width * 0.2 }]} // Adjust image height based on screen width
                      />
                    ))}
                  </View>
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryText}>{categoryTexts[rowIndex * 2 + colIndex]}</Text>
                    <View style={styles.categoryIcons}>
                      {rowIndex === 0 && colIndex === 0 && <Text109 />}
                      {rowIndex === 0 && colIndex === 1 && <Text530 />}
                      {rowIndex === 1 && colIndex === 0 && <Text87 />}
                      {rowIndex === 1 && colIndex === 1 && <Text218 />}
                      {rowIndex === 2 && colIndex === 0 && <Text109 />}
                      {rowIndex === 2 && colIndex === 1 && <Text218 />}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <TopProductScreen />
        <NewItems />
        <FlashSale />
        <MostPopular />
        <Text style={{
    flex: 1,
    fontWeight: 'bold',
    fontSize: 25,
    padding:10
  }}>Just For You</Text>
        <JustForYou />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 25,
  },
  textInput: {
    flex: 2,
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  cameraIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  scrollContent: {
    paddingBottom: 0, // Remove extra space at the bottom
  },
  carouselContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontWeight: 'bold',
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  mainContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  whiteBackground: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryImage: {
    width: '48%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth:4,
    borderColor:'white'

  },
  categoryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   
  },
  categoryText: {
    fontSize: 16,
    color: Colors.TEXT,
    fontWeight: 'bold',
  },
  categoryIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AllCategories;

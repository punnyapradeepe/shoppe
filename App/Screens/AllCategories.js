import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import Colors from '../Utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { CameraImg, Text109, Text218, Text530, Text87 } from './../Utils/SvgIcons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import TopProductScreen from '../../Components/TopProductScreen';
import NewItems from '../../Components/NewItems';
import FlashSale from '../../Components/FlashSale';
import MostPopular from '../../Components/MostPopular';
import JustForYou from '../../Components/JustForYou';
import TabNavigation from '../Navigations/TabNavigation';
import Carousel from '../../Components/Carousel';



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
    <View style={{padding:20}}>
      <View style={{display:'flex' , flexDirection:'row',gap:1,borderColor:'white'}}>
        <Text style={{paddingTop:40,fontWeight:'bold',fontSize:25}}>Shop</Text>
        <TextInput placeholder='Search' style={styles.textInput} />
        <View style={{position:'absolute',top:45,right:20}}>
        <CameraImg/>
        </View>
      </View>
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
      <View style={{marginTop:10,marginRight:10}}>
      <Carousel/>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.recentlyViewedText}>Categories</Text>
        <View style={styles.seeAllContainer}>
          <Text style={styles.seeAllText}>See All</Text>
          <TouchableOpacity  style={styles.circleButton}>
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
                      style={styles.categoryImage}
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
      <TopProductScreen/>
      <NewItems/>
      <FlashSale/>
      <MostPopular/>
      <JustForYou/>
   

      </ScrollView>

   
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    paddingLeft: '34%',
    fontWeight:'bold'
    
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
    gap: 10,
  },
  textInput: {
    position:'relative',
    backgroundColor: '#F8F8F8',
    padding: 5,
    borderRadius: 8,
    marginTop: 30,
    marginHorizontal: 10,
    color: Colors.BLACK,
    height: 50,
    width:240,
    
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
    height: 200,
  },
  categoryImage: {
    width: '48%',
    height: 80,
    marginBottom: 5,
    resizeMode: 'cover',
    borderRadius: 5,
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
  categoryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
});

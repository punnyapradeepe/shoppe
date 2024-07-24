import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from './../App/Utils/Colors';
import { Text109, Text218, Text530, Text87 } from './../App/Utils/SvgIcons';
import { useNavigation } from '@react-navigation/core';

const Categories = () => {
  const navigation = useNavigation();

  const images = [
    require('./../assets/Images/img20.png'),
    require('./../assets/Images/img21.png'),
    require('./../assets/Images/img22.png'),
    require('./../assets/Images/img23.png'),
    require('./../assets/Images/img24.png'),
    require('./../assets/Images/img25.png'),
    require('./../assets/Images/img26.png'),
    require('./../assets/Images/img27.png'),
    require('./../assets/Images/img28.png'),
    require('./../assets/Images/img29.png'),
    require('./../assets/Images/img30.png'),
    require('./../assets/Images/img31.png'),
    require('./../assets/Images/img32.png'),
    require('./../assets/Images/img33.png'),
    require('./../assets/Images/img34.png'),
    require('./../assets/Images/img35.png'),
  ];

  const categoryTexts = ['Clothing', 'Shoes', 'Bags', 'Watch'];

  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
        <Text style={styles.recentlyViewedText}>Categories</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }} onPress={() => navigation.navigate('allc')}>
          <Text style={{ fontWeight: 'bold', marginRight: 5 }}>See All</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        {Array.from({ length: 2 }).map((_, rowIndex) => (
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
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  recentlyViewedText: {
    fontSize: 30,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
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
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    height: 300,
  },
  categoryImage: {
    width: '48%',
    height: 140,
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
});

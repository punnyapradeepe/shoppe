import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { StarImgClr, StarImgLayout } from '../Utils/SvgIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddToCart from '../../Components/AddToCart';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import imageMapping from './../../Components/imageMapping'; 
import JustForYou from '../../Components/JustForYou';

const JustForYouDetail = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [product, setProduct] = useState(null); // Initialize as null

  useEffect(() => {
    fetch(`http://192.168.1.40:5000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => {
        console.error('Error fetching product details:', error);
        setProduct(null);
      });
  }, [id]);

  const getImageSource = (imageName) => {
    return imageMapping[imageName];
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Text style={styles.loadingText}></Text> 
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Image
          source={getImageSource(product.image)}
          style={styles.image}
        />
        <Text style={styles.text}>Description: {product.title}</Text>
        <Text style={styles.price}>Price: {product.price}</Text>

        <View style={styles.sizeGuideContainer}>
          <Text style={styles.sizeGuideText}>Size guide</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>

        <View style={styles.reviewerContainer}>
          <Image
            source={require('./../../assets/Images/veronika.png')}
            style={styles.reviewerImage}
          />
          <View style={styles.reviewerDetails}>
            <Text>Veronika</Text>
            <StarImgClr />
            <StarImgClr />
            <StarImgClr />
            <StarImgClr />
            <StarImgLayout />
          </View>
          <Text>
            Lorem ipsum dolor sit amet, conset sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed...
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All Reviews</Text>
        </TouchableOpacity>
        <JustForYou/>
      </ScrollView>
      <AddToCart />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
    marginBottom: 80,
  },
  image: {
    width: '100%',
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  sizeGuideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sizeGuideText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 20,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 15,
  },
  reviewerContainer: {
    marginTop: 20,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 99,
    marginBottom: 10,
  },
  reviewerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'Regular',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default JustForYouDetail;

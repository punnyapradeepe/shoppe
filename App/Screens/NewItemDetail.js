import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './../Utils/Colors';
import AddToCart from '../../Components/AddToCart';
import { AntDesign } from '@expo/vector-icons';
import MostPopular from '../../Components/MostPopular';
import JustForYou from '../../Components/JustForYou';
import { EllipsImg, Share, StarImgClr, StarImgLayout } from '../Utils/SvgIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const NewItemDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState(null); 

  const renderItem = ({ item }) => (
    <Image source={item} style={styles.image} />
  );

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };
  const handleAddToCartPress = async (product) => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const productData = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        userId: userId,
        quantity: 1
      };
  
     
      const response = await fetch('http://192.168.1.40:5000/cart');
      const cartItems = await response.json();
      const existingItem = cartItems.find(item => item.id === product.id && item.userId === userId);
  
      if (existingItem) {
        
        await fetch(`http://192.168.1.40:5000/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...existingItem,
            quantity: existingItem.quantity + 1
          }),
        });
      } else {
        
        await fetch('http://192.168.1.40:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }
    } catch (error) {
      console.error('Failed to add or update cart item:', error);
    }


    
  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text> 
        </ScrollView>
      </SafeAreaView>
    );
  }


  
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.container}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={()=>navigation.goBack()}/>
          <View style={styles.imageContainer}>
            <FlatList
              data={item.images}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              onScroll={onScroll}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(image, index) => index.toString()}
              style={styles.flatList}
            />
            <View style={styles.dotContainer}>
              {item.images.map((_, index) => (
                <View key={index} style={[styles.dot, index === activeIndex ? styles.activeDot : null]} />
              ))}
            </View>
          </View>
          <View style={{display:'flex' ,flexDirection:'row'}}>
          <Text style={styles.price}>{item.price}</Text>
          </View>
          <Text style={styles.description}>{item.Dis}</Text>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Text style={styles.TextStyle}>Variations</Text>
            <Text style={styles.TextStyle}></Text>
            <Text>{item.color}</Text>
            <Text>{item.size}</Text>
            <TouchableOpacity style={{  width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 85}}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>

          <View style={styles.variationsContainer}>
            {item.variations && item.variations.map((variation, index) => (
              <Image key={index} source={variation} style={styles.variationImage} />
            ))}
          </View>

          <Text style={styles.TextStyle}>Specifications</Text>
          <Text style={{ marginTop: 10, marginBottom: 10 ,fontWeight:'700'}}>Material</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            {item.Material && item.Material.map((material, index) => (
              <View key={index} style={styles.materialContainer}>
                <Text style={styles.materialText}>{material}</Text>
              </View>
            ))}
          </View>
          <Text style={{ marginTop: 10, marginBottom: 10 ,fontWeight:'700' }}>Origin</Text>
          <View style={styles.originContainer}>
            <Text style={styles.originText}>EU</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>Size guide</Text>
            <TouchableOpacity style={styles.circleButton}>
              <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>

          <Text style={styles.TextStyle}>Delivery</Text>
          <TouchableOpacity style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>Standard</Text>
            <Text style={styles.deliveryText1}>5-7 days</Text>
            <Text style={styles.deliveryText}>$100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>Express</Text>
            <Text style={styles.deliveryText1}>1-2 days</Text>
            <Text style={styles.deliveryText}>$800</Text>
          </TouchableOpacity>
          
          <Text style={styles.TextStyle}>Rating & Reviews</Text>

          <View style={{display:'flex',flexDirection:'row',gap:5,marginTop:20,marginBottom:20}}>
           <StarImgClr style={{width: 15, height: 15}} />
           <StarImgClr style={{width: 15, height: 15}} />
           <StarImgClr style={{width: 15, height: 15}} />
           <StarImgClr style={{width: 15, height: 15}} />
           <StarImgLayout style={{width: 15, height: 15}} />
           <View style={{width:38,height:20,backgroundColor:'lightblue',borderRadius:10,alignItems:'center'}}><Text style={{fontWeight:'bold'}}>4/5</Text></View>
           
          </View>

          <View style={{display:'flex',flexDirection:'row' ,gap:20}}>
            <Image source={require('./../../assets/Images/veronika.png')} style={{width:60,height:60,borderRadius:50,alignItems:'center',borderWidth:5,borderColor:'white'}}/>
            
              
           <View>
              <Text>Veronika</Text>
              <View style={{display:'flex',flexDirection:'row' ,gap:5}}>
              <StarImgClr style={{width: 15, height: 15}} />
              <StarImgClr style={{width: 15, height: 15}} />
              <StarImgClr style={{width: 15, height: 15}} />
              <StarImgClr style={{width: 15, height: 15}} />
              <StarImgLayout style={{width: 15, height: 15}} />
              </View>
              <Text>
  Lorem ipsum dolor sit amet, conset sadip.</Text>
  <Text>ipsun sit amet.</Text>
 


            </View>

            </View>
            <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>View All Reviews</Text>
        </TouchableOpacity>
          <MostPopular/>
          <Text style={styles.recentlyViewedText}>You Might Like</Text>
          <JustForYou/>
        </View>
      </ScrollView>
      <AddToCart style={styles.addToCart} product={product} onAddToCartPress={handleAddToCartPress} />
    </SafeAreaView>
  );
};

export default NewItemDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
 
  },
  container: {
    flex: 1,
    padding: 20,
   
   
  },
  imageContainer: {
    position: 'relative',
    width: width - 40,
    height: 450,
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  flatList: {
    flex: 1,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 210,
  },
  image: {
    width: width - 40,
    height: 450,
    borderRadius: 10,
  },
  textStyle: {
    marginTop: 10, 
    fontSize: 16, 
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.GRAY,
    marginHorizontal: 4,
  },
  button: {
    height: 50,
    width: 330,
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

  activeDot: {
    backgroundColor: Colors.PRIMARY,
    width: 40,
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10, 
    marginTop:10
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Raleway',
    color: 'black',
    paddingTop: 15,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Raleway',
    marginBottom: 10,
    paddingTop: 10,
   

  },
  variationsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  variationImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 10,
  },
  materialContainer: {
    backgroundColor: 'pink',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    height: 30,
    alignItems: 'center'
  },
  materialText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  originContainer: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    width: 60,
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  deliveryText1:{
    color:'blue',
    marginLeft:-110
  },
  addToCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

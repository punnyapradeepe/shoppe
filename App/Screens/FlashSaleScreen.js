import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Clk2, ClkImg, ClkImgw, ClkTym, ClkTym1, D13 } from '../Utils/SvgIcons';
import JustForYou from '../../Components/JustForYou';
import Discount20 from '../../Components/Discount20';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const FlashSaleScreen = () => {
  const navigation = useNavigation();
  const [selectedDiscount, setSelectedDiscount] = useState('All');

  const handlePress = (discount) => {
    setSelectedDiscount(discount);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../../assets/Images/bubble 02 (3).png')} 
        style={styles.bubble1}
      />
      <Image 
        source={require('./../../assets/Images/bubble 01 (4).png')} 
        style={styles.bubble2}
      />
      <View style={styles.clkImg}>
        <ClkImgw />
      </View>
      <View style={styles.timerContainer}>
        <View style={styles.timerBox}>
          <ClkTym1 />
        </View>
        <View style={styles.timerBox}>
          <Clk2 />
        </View>
        <View style={styles.timerBox}>
          <ClkTym />
        </View>
      </View>
      <View>
        <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.text}>Flash Sale</Text>
        <Text style={styles.subText}>Choose Your Discount</Text>
      </View>
      <View style={styles.buttonContainer}>
        {['All', '10%', '20%', '30%', '40%', '50%'].map((discount) => (
          <TouchableOpacity
            key={discount}
            style={[
              styles.discountBtn,
              selectedDiscount === discount && styles.selectedBtn
            ]}
            onPress={() => handlePress(discount)}
          >
            <Text
              style={[
                styles.btnText,
                selectedDiscount === discount && styles.selectedBtnText
              ]}
            >
              {discount}
            </Text>
            {selectedDiscount === discount && (
              <View style={styles.selectedBtnTriangle} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.articleText}>ARTICLE REIMAGINED</Text>
        <Image 
          source={require('./../../assets/Images/f1.png')} 
          style={styles.image}
        />
        <View style={styles.overlayImage}>
          <Image 
            source={require('./../../assets/Images/baige.png')} 
            style={styles.overlayImage}
          />
          <Image 
            source={require('./../../assets/Images/play (1).png')} 
            style={styles.overlayImage}
          />
        </View>
        <View style={styles.discountContainer}>
          <Text style={styles.text1}>20% Discount</Text>
          <D13 style={styles.discountIcon} />
        </View>
        <Discount20 />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    position: 'relative',
  },
  bubble1: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bubble2: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  clkImg: {
    position: 'absolute',
    right: 110,
    top: 40,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    top: 40,
  },
  timerBox: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 70,
  },
  text1: {
    fontFamily: 'RalewayB',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
  subText: {
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  discountBtn: {
    paddingHorizontal:40,
    paddingVertical:10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedBtn: {
    borderColor: 'blue',
  },
  btnText: {
    fontWeight: 'bold',
    color: 'black',
  },
  selectedBtnText: {
    color: 'blue',
  },
  articleText: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf:'center',
    letterSpacing: 5,
  },
  image: {
    width: '100%',
    height: 300, 
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  overlayImage: {
    position: 'absolute',
    top: 90,
    left: 280,
  },
  discountContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 65,
  },
  discountIcon: {
    marginLeft: 10,
  },
  selectedBtnTriangle: {
    position: 'absolute',
    top: -1,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '180deg' }],
  },
});

export default FlashSaleScreen;

import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Clk2, ClkImg, ClkImgw, ClkTym, ClkTym1, D13, PlayBtn, StartImg } from '../Utils/SvgIcons';
import JustForYou from '../../Components/JustForYou';
import Discount20 from '../../Components/Discount20';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import NewItems from '../../Components/NewItems';

const FlashSaleScreen = () => {
  const navigation=useNavigation();
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
        
          <View style={{paddingTop: 20,}}>
      <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={()=>navigation.goBack()}/></View>
        <Text style={styles.text}>Flash Sale</Text>
       
        <Text style={styles.subText}>Choose Your Discount</Text>
      </View>
      <SafeAreaView style={styles.buttonContainer}>
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
      </SafeAreaView>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.articleText}>ARTICLE REIMAGINED</Text>
        <Image 
          source={require('./../../assets/Images/f1.png')} 
          style={styles.image}
        />
        <Image 
          source={require('./../../assets/Images/baige.png')} 
          style={{position:'absolute',top:130,left:270}}
        />
        <Image 
          source={require('./../../assets/Images/play (1).png')} 
          style={{position:'absolute',top:80,left:130}}
        />
        <View style={{display:'flex' ,flexDirection:'row'}}>
          <Text style={styles.text1}>20% Discount</Text>
          <View style={{marginLeft:170,marginTop:15}}>
            <D13/>
          </View>
        </View>
        
        <NewItems/>
        <View style={{marginTop:20}}>
        <JustForYou/>
        </View>
      </ScrollView>
    </View>
  );
};

export default FlashSaleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom:0,
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
    top: 50,
    left: 249,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 270,
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
    paddingTop: 20,
  },
  text1: {
    fontFamily: 'RalewayB',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom:10
  },
  subText: {
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  discountBtn: {
    width: 45,
    height: 25,
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
    marginLeft: 65,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 0,
    letterSpacing: 5, 
  },
  
  image: {
    width: '100%',
    height:150,
    resizeMode: 'contain',
    marginTop: 0,
    position:'relative',
    borderRadius:10
  },
  selectedBtnTriangle: {
    position: 'absolute',
   top:-1,
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
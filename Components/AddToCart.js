import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from './../App/Utils/Colors';
import { FavBtn } from '../App/Utils/SvgIcons';

export default function AddToCart() {
  return (
    <View style={styles.container}>
      <View style={{marginLeft:20,marginTop:7}}>
      <FavBtn />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buyNowButton]}>
          <Text style={[styles.buttonText, styles.buyNowButtonText]}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight:10,
    paddingBottom:10
  },
  button: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buyNowButton: {
    backgroundColor: Colors.PRIMARY,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
   
  },
  buyNowButtonText: {
    color: Colors.WHITE,
  },
});

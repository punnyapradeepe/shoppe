import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SideArrow } from '../Utils/SvgIcons';
import { ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.SettingsText}>Settings</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
      <Text style={styles.Text}>Personal</Text>
        <View style={styles.row}>
          <Text style={styles.Text2}>Profile</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.Text2}>Shipping Address</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.Text2}>Payment Method</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
        </View>
        
        </View>

      <View style={styles.contentContainer}>
      <Text style={styles.Text}>Shop</Text>
        <View style={styles.row}>
          <Text style={styles.Text2}>Country</Text>
          <View style={styles.rowRight}>
           <Text>Vietnam</Text>  
           <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.Text2}>Currency</Text>
          <View style={styles.rowRight}>
           <Text>$ USD</Text>  
           <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.Text2}>Sizes</Text>
          <View style={styles.rowRight}>
           <Text>UK</Text>  
           <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.Text2}>Terms and Conditons</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.contentContainer}>
      <Text style={styles.Text}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.Text2}>Language</Text>
          <View style={styles.rowRight}>
           <Text>English</Text>  
        <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.Text2}>About Slada</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <SideArrow />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{fontSize:15,color:'darkred',marginBottom:10,marginLeft:10}}>Delete My Account</Text>

      <Text style={{ fontSize: 20,
    fontWeight: '700',
   marginLeft:10}}>Slada</Text>
    <Text style={{ marginLeft:10}}>version 1.0 April,2020</Text>
     
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'White',
    flex: 1,
    padding: 20,
  
  },
  SettingsText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,

  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'rgba(0, 0, 0, 0.1)',
   
  },
  row: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
   
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom:10
  },
  Text2: {
    fontSize: 17,
    fontWeight: '400',
  },
  arrowContainer: {
    marginRight: 5,
    marginLeft: 10,
  },
});

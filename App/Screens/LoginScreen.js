import { View, Image, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'



export default function LoginScreen() {
  return (
   
    <View style={styles.container}>
      <View style={styles.ellipse}>
        <Image source={require('./../../assets/Images/loginImg.png')} style={styles.loginImg} />
      </View >
      <Text style={styles.text}>Shoppe</Text>
      <View style={{alignItems:'center',padding:10
      }}>
      <Text>BeautifulneCommerce UI Kit</Text>
      <Text style={{padding:10}}>for your online store</Text>
      </View>
      <View>
      
      <TouchableOpacity  style={styles.button}> 
          <Text style={styles.buttonText}> Let's Get Started </Text>
      </TouchableOpacity>
     <View>
      <Text>I already have an a</Text>
     </View>
      </View>
    </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipse: {
    width: 134,
    height: 134,
    borderRadius: 67,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImg: {
    width: 90, 
    height: 90,
    resizeMode: 'contain', 
  },
  text:{
   fontFamily:'RalewayB',
   fontSize:50,
   paddingTop:10
  },
  button: {
   height:61,
   width:330,
   marginTop:63,
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
    fontFamily:'Regular'
  },

}
)

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { ClrImg, Gift, Gift2, GiftBox, GiftRed, Plus, SettingImg } from '../Utils/SvgIcons'

export default function PaymentMethod() {
  return (
    <View  style={styles.container}>
      <Text style={styles.SettingsText}>Settings</Text>
      <View style={{backgroundColor:'white',flex:1}}>
      <Text style={styles.Text2}>Payment Methods</Text>
      <View style={ styles.Cardcontainer}>
        <View style={styles.Card}>
          
          
        <View style={{display:'flex',flexDirection:'row',}}>
          <View style={{left:-70,top:-30}}>
        <ClrImg/>
        </View>
        <View style={{right:-70,top:-30}}>
        <SettingImg/>
        </View>
        </View>
    


    
        </View>
        <View style={styles.Add}>
        <View style={{marginTop:50}}>
         
        <Plus/>
          
        </View>
        </View>
        </View>
<ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.subViews}>
        <View style={styles.gift}>
        <Gift2/>
        </View>
        <View style={{marginLeft:-50}}>
        <Text>April 19,2020 12:31</Text>
        <Text style={{ fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,}}>Order #92287157</Text>
        </View>
        <Text style={ {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10
  }}>-$14.00</Text>
      </View>

      <View style={styles.subViews}>
        <View style={styles.gift}>
        <GiftRed/>
        </View>
        <View style={{marginLeft:-50}}>
        <Text>April 19,2020 12:31</Text>
        <Text style={{ fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,}}>Order #92287157</Text>
        </View>
        <Text style={ {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10,
    color:'darkred'
  }}>-$37.00</Text>
      </View>

      <View style={styles.subViews}>
        <View style={styles.gift}>
        <Gift2/>
        </View>
        <View style={{marginLeft:-50}}>
        <Text>April 19,2020 12:31</Text>
        <Text style={{ fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,}}>Order #92287157</Text>
        </View>
        <Text style={ {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10
  }}>-$21.00</Text>
      </View>

      <View style={styles.subViews}>
        <View style={styles.gift}>
        <Gift2/>
        </View>
        <View style={{marginLeft:-50}}>
        <Text>April 19,2020 12:31</Text>
        <Text style={{ fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,}}>Order #92287157</Text>
        </View>
        <Text style={ {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10
  }}>-$75.00</Text>
      </View>

      <View style={styles.subViews}>
        <View style={styles.gift}>
        <Gift2/>
        </View>
        <View style={{marginLeft:-50}}>
        <Text>April 19,2020 12:31</Text>
        <Text style={{ fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,}}>Order #92287157</Text>
        </View>
        <Text style={ {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10
  }}>-$214.00</Text>
      </View>

      <View style={styles.subViews}>
        <View style={styles.gift}>
        <Gift2/>
        </View>
        <View style={{marginLeft:-50}}>
        <Text>April 19,2020 12:31</Text>
        <Text style={{ fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,}}>Order #92287157</Text>
        </View>
        <Text style={ {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10
  }}>-$53.00</Text>
      </View>
      </ScrollView>



      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  
  },
  SettingsText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,

  },
  Text2: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  Cardcontainer:{
    display:'flex',
    flexDirection:'row',
  },
  Card:{
    backgroundColor:'lightblue',
    paddingHorizontal:80,
    paddingVertical:50,
    borderRadius:20
  },
  Add:{
    backgroundColor:Colors.PRIMARY,paddingHorizontal:20,
    marginLeft:5,
    borderRadius:20,
    alignItems:'center'
  },
  subViews:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:5,
    paddingVertical:5,
    backgroundColor:'lightblue',
    marginBottom:10,
    marginTop:10,
    borderRadius:20,
    paddingRight:10
},
gift:{
  marginLeft:10,
  marginTop:10,
  marginRight:0
}
 
})
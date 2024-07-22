import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View ,TouchableWithoutFeedback} from 'react-native';
import { ClrImg, EditBtn, Gift, GiftBox, Plus, SettingImg, TIckB, TickW } from '../Utils/SvgIcons';
import Colors from '../Utils/Colors';
import Modal from 'react-native-modal';

const PaymentScreen = () => {
  const [selectedShipping, setSelectedShipping] = useState('Standard');
  const [address, setAddress] = useState('26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city');
  const [info, setInfo] = useState('punnyapradeep1328@gmail.com');
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  const [tempInfo, setTempInfo] = useState(info);
  const [voucherCode, setVoucherCode] = useState('');
  const [isVoucherModalVisible, 
  setVoucherModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState('29.00');
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
const [cardHolderName, setCardHolderName] = useState('');
const [expiryDate, setExpiryDate] = useState('');


  const type = [
    {
      id: '1',
      images: require('./../../assets/Images/img40.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$17.00',
      color: 'Black',
      size: 'M',
    },
    {
      id: '2',
      images: require('./../../assets/Images/img21.png'),
      text: 'Lorem ipsum dolor sit amet \n consectetur.',
      price: '$12.00',
      size: 'S',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
  
        <View style={styles.imageWrapper}>
          <Image source={item.images} style={styles.itemImage} />
          <View style={styles.badge}>
            <Text style={{ fontWeight: 'bold' }}>1</Text>
          </View>
        </View>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.textPrice}>{item.price}</Text>
    
    </View>
  );
 // State to control modal visibility
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [isEditable, setIsEditable] = useState(false);
 

 const openModal = () => {
  setIsModalVisible(true);
};

const closeModal = () => {
  setIsModalVisible(false);
};
const toggleEditable = () => {
  setIsEditable(!isEditable);
};

const saveDetails = () => {
  setIsEditable(false);
  closeModal();
};

  const handleSaveAddress = () => {
    setAddress(tempAddress);
    setAddressModalVisible(false);
  };

  const handleCancelAddress = () => {
    setTempAddress(address);
    setAddressModalVisible(false);
  };

  const handleSaveInfo = () => {
    setInfo(tempInfo);
    setInfoModalVisible(false);
  };

  const handleCancelInfo = () => {
    setTempInfo(info);
    setInfoModalVisible(false);
  };

  const handleApplyVoucher = () => {
    // Update total amount to 5 as an example
    setTotalAmount(27.55);
    setVoucherModalVisible(false);
  };
  
  const handleApplyVoucher2 = () => {
    // Update total amount to 5 as an example
    setTotalAmount(24.65);
    setVoucherModalVisible(false);
  };
  

  const handleCancelVoucher = () => {
    setVoucherModalVisible(false);
  };

    useEffect(() => {
    if (selectedShipping === 'Express') {
      if (totalAmount === '29.00') {
        setTotalAmount("37.00");
      } else if (totalAmount === 27.55) {
        setTotalAmount(35.55);
      } else if (totalAmount === 24.65) {
        setTotalAmount(32.65);
      }
    }
    else{
      if (totalAmount === '29.00') {
        setTotalAmount('29.00');
      } else if (totalAmount === 27.55) {
        setTotalAmount(27.55);
      } else if (totalAmount === 24.65) {
        setTotalAmount(24.65);
      }
      else if (totalAmount === '37.00') {
        setTotalAmount('29.00');
      } else if (totalAmount === 35.55) {
        setTotalAmount(27.55);
      }else if (totalAmount === 32.65) {
        setTotalAmount(24.65);
      }
    }
  }, [selectedShipping, totalAmount]);
  

  return (
    
    <View style={styles.container}>
      <View style={{ padding: 20 ,flex:1}}>
        <Text style={styles.text}>Payment</Text>
        <Text style={styles.subText}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setAddressModalVisible(true)}>
            <EditBtn />
          </TouchableOpacity>
        </View>

        <Text style={styles.subText}>Contact Information</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{info}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setInfoModalVisible(true)}>
            <EditBtn />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{marginLeft:-10,marginRight:-10}} >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:0 }}>
            <Text style={[styles.text1, { marginRight: 6 }]}>Items</Text>
            <View style={{ width: 30, height: 30, borderRadius: 99, backgroundColor: '#F0F8FF', alignItems: 'center', justifyContent: 'center', marginRight: 90 }}>
              <Text style={{ fontWeight: 'bold' }}>2</Text>
            </View>
            <TouchableOpacity 
  style={{ width: 100, height: 30, backgroundColor: 'white', borderWidth: 3, borderColor: 'blue', alignItems: 'center', borderRadius: 20, justifyContent: 'center' }}
  onPress={() => setVoucherModalVisible(true)}
>
  <Text style={{ color: 'blue' }}>Add Voucher</Text>
</TouchableOpacity>

          </View>

          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <FlatList
              data={type}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatList}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <Text style={styles.text1}>Shipping Options</Text>

         <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity
              style={[
                styles.deliveryContainer,
                selectedShipping === 'Standard' ? styles.selectedDelivery : styles.unselectedDelivery
              ]}
              onPress={() => setSelectedShipping('Standard')}
            >
               <View>
                {selectedShipping === 'Standard' ? <TIckB /> : <TickW />}
              </View>
              <Text style={styles.text2}>Standard</Text>
             
              <View style={{ width: 70, height: 24, backgroundColor: 'white', borderRadius:10 }}>
                <Text style={styles.deliveryText1}>5-7days</Text>
              </View>
              <Text style={styles.text2}>FREE</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.deliveryContainer,
                selectedShipping === 'Express' ? styles.selectedDelivery : styles.unselectedDelivery
              ]}
              onPress={() => setSelectedShipping('Express')}
            >
              <Text style={styles.text2}>Express</Text>
              <View style={{ right:150 }}>
                {selectedShipping === 'Express' ? <TIckB /> : <TickW />}
              </View>
              <View style={{ width: 70, height: 20, backgroundColor: 'white', borderRadius: 10, marginLeft: -120 }}>
                <Text style={styles.deliveryText1}>1-2days</Text>
              </View>
              <Text style={styles.text2}>$8.00</Text>
            </TouchableOpacity>

            <Text style={{ marginLeft: 18, marginRight: 20 }}>Delivered on or before Thursday, 23 April 2020</Text>
        

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
            <Text style={styles.text1}>
              Payment Method
            </Text>
            <TouchableOpacity style={styles.editButton2}>
              <EditBtn />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ width: 73, height: 30, backgroundColor: '#F0F8FF', alignItems: 'center', borderRadius: 20, marginLeft: 20, marginTop: 0, marginBottom: 10 }} onPress={openModal}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: 'blue', top: 5 }}>Card</Text>
          </TouchableOpacity>

        </ScrollView>
     
        </View>
        

        

        <Modal isVisible={isAddressModalVisible}>
        <View style={ {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
          <View style={ {
    backgroundColor: 'white',
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  }}>
            <Text style={{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }}>Edit Address</Text>
            <TextInput
              style={ {
                borderColor: Colors.GRAY,
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
              }}
              value={tempAddress}
              onChangeText={setTempAddress}
              placeholder="Enter your address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[ {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }, { backgroundColor: Colors.PRIMARY }]} onPress={handleCancelAddress}>
                <Text style={ {
    color: 'white',
    fontWeight: 'bold',
  }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[{
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }, { backgroundColor: Colors.PRIMARY }]} onPress={handleSaveAddress}>
                <Text style={ {
    color: 'white',
    fontWeight: 'bold',
  }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>




      <Modal isVisible={isInfoModalVisible}>
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      backgroundColor: 'white',
      borderColor: Colors.PRIMARY,
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      width: '80%',
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      }}>Edit Contact Information</Text>
      <TextInput
        style={{
          borderColor: Colors.GRAY,
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        value={tempInfo}
        onChangeText={setTempInfo}
        placeholder="Enter your information"
      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity
          style={[{
            flex: 1,
            marginHorizontal: 5,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.PRIMARY,
          }]}
          onPress={handleCancelInfo}
        >
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
          }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
            flex: 1,
            marginHorizontal: 5,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.PRIMARY,
          }]}
          onPress={handleSaveInfo}
        >
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
          }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

     
        <View>
      <TouchableOpacity onPress={() => setVoucherModalVisible(true)}>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={handleCancelVoucher}>
      <Modal
        isVisible={isVoucherModalVisible}
        onBackdropPress={handleCancelVoucher}
        onRequestClose={() => handleCancelVoucher()}
      >
          <View style={styles.modalContainer1}>
            <Text style={{fontSize: 20, fontWeight: '700', color: Colors.BLACK, marginLeft: -140, marginBottom: 20}}>Active Vouchers</Text>

            <View style={styles.imageContainer}>
              <View style={{width: 300, height: 100, backgroundColor: 'white', borderWidth: 2, borderColor: 'blue', borderRadius: 10}}>
                <View style={{display: 'flex', flexDirection: 'row', gap: 115}}>
                  <Text style={{fontSize: 17, fontWeight: '700', color: Colors.PRIMARY, marginLeft: 10}}>Voucher</Text>
                  <Image source={require('./../../assets/Images/Valid.png')} style={{top: 5}}/>
                </View>
                <View>
                  <Text style={{width: 300, color: 'blue', marginRight: 0, marginTop: 0}}>-------------------------------------------------------------------------</Text>
                </View>
                <View style={{display:'flex' ,flexDirection:'row',gap:5}}>
                  <View style={{marginLeft:10}}>
                  <Gift/>
                  </View>
                <Text style={{fontSize: 17, fontWeight: '700', color: Colors.BLACK, marginLeft: 10}}>First Purchase</Text>
                </View>
                <Text style={{fontSize: 12, fontWeight: '700', marginLeft: 10}}>5% off for your next order</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={{width: 80, height: 30, backgroundColor: Colors.PRIMARY, borderRadius: 10, right: 10, top: 15, alignItems: 'center'}} onPress={handleApplyVoucher}>
                  <Text style={{color: 'white', top: 4}}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.imageContainer}>
              <View style={{width: 300, height: 100, backgroundColor: 'white', borderWidth: 2, borderColor: 'blue', borderRadius: 10}}>
                <View style={{display: 'flex', flexDirection: 'row', gap: 115,
                  padding:5,borderBottomWidth:1,borderColor:'blue',borderStyle:'dashed'}}>
                  <Text style={{fontSize: 17, fontWeight: '700', color: Colors.PRIMARY, marginLeft: 10}}>Voucher</Text>
                  <Image source={require('./../../assets/Images/Valid (1).png')} style={{}}/>
                </View>
                
                <View style={{display:'flex' ,flexDirection:'row',gap:5}}>
                  <View style={{marginLeft:10}}>
                  <GiftBox/>
                  </View>
                <Text style={{fontSize: 17, fontWeight: '700', color: Colors.BLACK, marginLeft: 10}}>Gift From Customer Care</Text>
                </View>
                <Text style={{fontSize: 12, fontWeight: '700', marginLeft: 10}}>15% off your next purchase</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={{width: 80, height: 30, backgroundColor: Colors.PRIMARY, borderRadius: 10, right: 10, top: 15, alignItems: 'center'}} onPress={handleApplyVoucher2}>
                  <Text style={{color: 'white', top: 4}}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          height: 1000,
          width:400,
          marginLeft:-20,
          marginRight:-10,
          marginBottom:-30
        }}>
          <View style={{
            width: '110%',
            height: 350,
            width:350,
            padding: 20,
            marginLeft:-30,
            marginRight:5,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 10 }}>Payment Methods</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <View style={{ width: 290, height: 200, backgroundColor: 'lightblue', marginLeft: 8, borderRadius: 20 ,overflow:'hidden'}}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 160 }}>
                  <View style={{ top: 10, left: 10 }}>
                    <ClrImg />
                  </View>
                  <View style={{ top: 10, left: 10 }}>
                    <SettingImg />
                  </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 20, left: 20, top: 50 }}>
  {cardNumber.map((num, index) => (
    <TextInput
      key={index}
      style={{
        fontWeight: '700',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: isEditable ? 'black' : 'transparent',
        width: 40,
        textAlign: 'center'
      }}
      editable={isEditable}
      value={num}
      placeholder="* * * *"
      keyboardType="numeric"
      maxLength={4}
      onChangeText={(text) => {
        // Ensure only digits are allowed
        if (/^\d*$/.test(text)) {
          const newCardNumber = [...cardNumber];
          newCardNumber[index] = text;
          setCardNumber(newCardNumber);
        }
      }}
    />
  ))}
</View>


                <View style={{ display: 'flex', flexDirection: 'row', gap: 60, left: 30, top: 70 ,marginRi2ht:20}}>
                  <TextInput
                    style={{
                      fontWeight: '400',
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: isEditable ? 'black' : 'transparent',
                      flex: 1
                    }}
                    editable={isEditable}
                    value={cardHolderName}
                    placeholder="AMANDA MORGAN"
                    onChangeText={setCardHolderName}
                  />
                 <TextInput
  style={{
    fontWeight: '400',
    fontSize: 16,
    borderBottomWidth: 1,
  
    borderBottomColor: isEditable ? 'black' : 'transparent',
    flex: 1
  }}
  editable={isEditable}
  value={expiryDate}
  placeholder="MM/YY"
  keyboardType="numeric"
  maxLength={5} // Allows for MM/YY format
  onChangeText={(text) => {
    // Remove non-digit characters
    let cleanedText = text.replace(/\D/g, '');

    // Format as MM/YY
    if (cleanedText.length > 2) {
      cleanedText = cleanedText.slice(0, 2) + '/' + cleanedText.slice(2, 4);
    }

    // Set the formatted text
    setExpiryDate(cleanedText);
  }}
/>

                </View>
              </View>
              <TouchableOpacity
                style={{ width: 40, height: 200, backgroundColor: Colors.PRIMARY, borderRadius: 20 }}
                onPress={toggleEditable}
              >
                <View style={{ top: 100, left: 13 }}>
                  <Plus />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: Colors.PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 20
              }}
              onPress={saveDetails}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>




 
      <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${totalAmount}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontFamily: 'RalewayB',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
   
  },
  subText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 0,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  address: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    marginLeft: 10,
  },
  editButton1: {
    marginLeft: 75,
  },
  editButton2: {
    marginLeft: 95,
  },
  imageWrapper: {
    position: 'relative',
    width: 70,
    height: 70,
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 20,
    height: 20,
    borderRadius: 99,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    fontFamily: 'RalewayB',
    fontSize:20,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingLeft: 25
  },
  text2: {
    fontFamily: 'RalewayB',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 18
  },
  textPrice: {
    fontFamily: 'RalewayB',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 0
  },
  unselectedDelivery:{
    backgroundColor:'white',
    color:'blue'
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems:'center',
   
    padding: 10,
    justifyContent:'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 0
  },
  itemImage: {
    position: 'relative',
    width: 70,
    height: 70,
    borderRadius: 99,
    borderWidth: 5,
    borderColor: 'white'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0
  },
  itemText: {
    fontSize: 11,
    fontWeight: 'bold',
    // marginBottom: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  orgPrice: {
    fontSize: 14,
    color: 'red',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemPrice: {
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Raleway',
  },
  quantityBox: {
    width: 30,
    height: 30,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20, // Apply padding left and right here
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor:'black',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    
  },

  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    backgroundColor:'#F0F8FF',
    borderColor: Colors.WHITE,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft:20,
    paddingRight:20,
    marginLeft:10,
    marginRight:10
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'red',
  },
  deliveryText1:{
    color:'blue',
    marginLeft:9,
    marginRight:6
  },
  addToCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft:10,
    paddingRight:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',paddingVertical:'100%'
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor:'black',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContainer1:{
   height:400,
   width:350,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop:30
  },

  modalTitleVoucher: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop:30,
    
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalContainer1: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitleVoucher: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    width: 300, 
    height: 140, 
    marginBottom: 0,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 60, 
    left: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
 
});

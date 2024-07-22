import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import Colors from '../Utils/Colors';
import { ClrImg, Gift, Gift2, GiftBox, GiftRed, Plus, SettingImg } from '../Utils/SvgIcons';
import Modal from 'react-native-modal';

export default function PaymentMethod() {
  const [isModalVisible, setIsModalVisible] = useState(false);
 const [isEditable, setIsEditable] = useState(false);
 const [cardNumber, setCardNumber] = useState(['', '', '', '']);
 const [cardHolderName, setCardHolderName] = useState('');
 const [expiryDate, setExpiryDate] = useState('');

const [storedCardNumber, setStoredCardNumber] = useState(['* * * *', '* * * *', '* * * *', '1579']);
  const [storedCardHolderName, setStoredCardHolderName] = useState('AMANDA MORGAN');
  const [storedExpiryDate, setStoredExpiryDate] = useState('12/22');

 const openModal = () => {
  setIsModalVisible(true);
  setIsEditable(true);
};

const closeModal = () => {
  setIsModalVisible(false);
};
const toggleEditable = () => {
  setIsEditable(!isEditable);
};



const saveDetails = () => {
  setStoredCardNumber(cardNumber);
  setStoredCardHolderName(cardHolderName);
  setStoredExpiryDate(expiryDate);
  setIsEditable(false);
  closeModal();
};
  return (
    <View style={styles.container}>
      <Text style={styles.SettingsText}>Settings</Text>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Text style={styles.Text2}>Payment Methods</Text>
        <View style={styles.Cardcontainer}>
          <View style={styles.Card}>
            <View style={styles.cardIcons}>
              <View style={styles.iconLeft}>
                <ClrImg />
              </View>
              <View style={styles.iconRight}>
                <SettingImg />
              </View>
            </View>

            <View style={styles.cardNumbers}>
            {storedCardNumber.map((num, index) => (
                <Text key={index}>{num}</Text>
              ))}
            </View>

            <View style={styles.cardDetails}>
            <Text>{storedCardHolderName}</Text>
            <Text>{storedExpiryDate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.Add}  onPress={openModal}>
            <View style={styles.addIcon}>
              <Plus />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.subViews}>
            <View style={styles.gift}>
              <Gift2 />
            </View>
            <View style={styles.orderDetails}>
              <Text>April 19,2020 12:31</Text>
              <Text style={styles.orderNumber}>Order #92287157</Text>
            </View>
            <Text style={styles.amount}>-$14.00</Text>
          </View>

          <View style={styles.subViews}>
            <View style={styles.gift}>
              <GiftRed />
            </View>
            <View style={styles.orderDetails}>
              <Text>April 19,2020 12:31</Text>
              <Text style={styles.orderNumber}>Order #92287157</Text>
            </View>
            <Text style={[styles.amount, { color: 'darkred' }]}>-$37.00</Text>
          </View>

          <View style={styles.subViews}>
            <View style={styles.gift}>
              <Gift2 />
            </View>
            <View style={styles.orderDetails}>
              <Text>April 19,2020 12:31</Text>
              <Text style={styles.orderNumber}>Order #92287157</Text>
            </View>
            <Text style={styles.amount}>-$21.00</Text>
          </View>

          <View style={styles.subViews}>
            <View style={styles.gift}>
              <Gift2 />
            </View>
            <View style={styles.orderDetails}>
              <Text>April 19,2020 12:31</Text>
              <Text style={styles.orderNumber}>Order #92287157</Text>
            </View>
            <Text style={styles.amount}>-$75.00</Text>
          </View>

          <View style={styles.subViews}>
            <View style={styles.gift}>
              <Gift2 />
            </View>
            <View style={styles.orderDetails}>
              <Text>April 19,2020 12:31</Text>
              <Text style={styles.orderNumber}>Order #92287157</Text>
            </View>
            <Text style={styles.amount}>-$214.00</Text>
          </View>

          <View style={styles.subViews}>
            <View style={styles.gift}>
              <Gift2 />
            </View>
            <View style={styles.orderDetails}>
              <Text>April 19,2020 12:31</Text>
              <Text style={styles.orderNumber}>Order #92287157</Text>
            </View>
            <Text style={styles.amount}>-$53.00</Text>
          </View>
        </ScrollView>

      </View>
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
        }}>
          <View style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
            <View style={{ backgroundColor: 'lightblue', borderRadius: 20, overflow: 'hidden', paddingHorizontal: 40, paddingBottom: 90 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ top: 10, }}>
                  <ClrImg />
                </View>
                <View style={{ top: 10, }}>
                  <SettingImg />
                </View>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', gap: 20, top: 50 }}>
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
                      if (/^\d*$/.test(text)) {
                        const newCardNumber = [...cardNumber];
                        newCardNumber[index] = text;
                        setCardNumber(newCardNumber);
                      }
                    }}
                  />
                ))}
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', gap: 60, top: 70, marginRight: 20 }}>
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
                  maxLength={5}
                  onChangeText={(text) => {
                    let cleanedText = text.replace(/\D/g, '');
                    if (cleanedText.length > 2) {
                      cleanedText = cleanedText.slice(0, 2) + '/' + cleanedText.slice(2, 4);
                    }
                    setExpiryDate(cleanedText);
                  }}
                />
              </View>
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
  );
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
  Cardcontainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  Card: {
    backgroundColor: '#e0ffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    flex: 1,
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  iconLeft: {
    position: 'absolute',
    left: -10,
    top: -10,
  },
  iconRight: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  cardNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Add: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical:20,
    marginLeft: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  addIcon: {
    marginTop: 0,
  },
  subViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e0ffff',
    marginBottom: 10,
    borderRadius: 20,
  },
  gift: {
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  orderNumber: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  amount: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
});

import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,TouchableWithoutFeedback ,} from 'react-native';
import React, { useState } from 'react';
import Colors from '../Utils/Colors';
import { ClrImg, Delete, Gift, Gift2, GiftBox, GiftRed, Plus, SettingImg } from '../Utils/SvgIcons';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PaymentMethod() {
  const navigation= useNavigation();

  const openModal = () => {
    if (!hasChangesBeenSaved) {
      setBackupCardNumber(storedCardNumber);
      setBackupCardHolderName(storedCardHolderName);
      setBackupExpiryDate(storedExpiryDate);
      setCardNumber(storedCardNumber);
      setCardHolderName(storedCardHolderName);
      setExpiryDate(storedExpiryDate);
      setIsModalVisible(true);
    }
  };

const closeModal = () => {
  setIsModalVisible(false);
};
const toggleEditable = () => {
  setIsEditable(!isEditable);
};



const saveDetails = () => {
  // Update stored values only for fields that were edited
  if (isCardNumberEdited) {
    setStoredCardNumber(cardNumber);
  }

  if (isCardHolderNameEdited) {
    setStoredCardHolderName(cardHolderName);
  }

  if (isExpiryDateEdited) {
    setStoredExpiryDate(expiryDate);
  }

  // Reset the edit tracking flags
  setIsCardNumberEdited(false);
  setIsCardHolderNameEdited(false);
  setIsExpiryDateEdited(false);

  // Disable editing and close the modal
  
  setIsEditable(false);
  setHasChangesBeenSaved(true);
  closeModal();

};


const cancelChanges = () => {
  // Check if the card number was edited
  if (isCardNumberEdited) {
    setCardNumber(backupCardNumber);
  } else {
    setCardNumber(storedCardNumber);
  }

  // Check if the card holder name was edited
  if (isCardHolderNameEdited) {
    setCardHolderName(backupCardHolderName);
  } else {
    setCardHolderName(storedCardHolderName);
  }

  // Check if the expiry date was edited
  if (isExpiryDateEdited) {
    setExpiryDate(backupExpiryDate);
  } else {
    setExpiryDate(storedExpiryDate);
  }

  setHasChangesBeenSaved(false); // Allow modal to be opened again
    closeModal();
};

const dltChanges = () => {
  // Check if the card number was edited
  if (isCardNumberEdited) {
    setCardNumber(backupCardNumber);
  } else {
    setCardNumber(storedCardNumber);
  }

  // Check if the card holder name was edited
  if (isCardHolderNameEdited) {
    setCardHolderName(backupCardHolderName);
  } else {
    setCardHolderName(storedCardHolderName);
  }

  // Check if the expiry date was edited
  if (isExpiryDateEdited) {
    setExpiryDate(backupExpiryDate);
  } else {
    setExpiryDate(storedExpiryDate);
  }

  setHasChangesBeenSaved(false); // Allow modal to be opened again
  
};








const openEditModal = () => {
 
    setBackupCardNumber(storedCardNumber);
    setBackupCardHolderName(storedCardHolderName);
    setBackupExpiryDate(storedExpiryDate);
    setCardNumber(storedCardNumber);
    setCardHolderName(storedCardHolderName);
    setExpiryDate(storedExpiryDate);
    setIsEditModalVisible(true);

};

const closeEditModal = () => {
setIsEditModalVisible(false);
};
const toggleEditEditable = () => {
setIsEditable(!isEditable);
};



const saveEditDetails = () => {
if (isCardNumberEdited) {
  setStoredCardNumber(cardNumber);
}

if (isCardHolderNameEdited) {
  setStoredCardHolderName(cardHolderName);
}

if (isExpiryDateEdited) {
  setStoredExpiryDate(expiryDate);
}

// Reset the edit tracking flags
setIsCardNumberEdited(false);
setIsCardHolderNameEdited(false);
setIsExpiryDateEdited(false);

// Disable editing and close the modal
setIsEditable(false);
closeEditModal();
};


const cancelEditChanges = () => {
// Check if the card number was edited
if (isCardNumberEdited) {
  setCardNumber(backupCardNumber);
} else {
  setCardNumber(storedCardNumber);
}

// Check if the card holder name was edited
if (isCardHolderNameEdited) {
  setCardHolderName(backupCardHolderName);
} else {
  setCardHolderName(storedCardHolderName);
}

// Check if the expiry date was edited
if (isExpiryDateEdited) {
  setExpiryDate(backupExpiryDate);
} else {
  setExpiryDate(storedExpiryDate);
}

closeEditModal();
};





  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <View style={{marginTop:23,marginRight:0}}>
      <Ionicons name="arrow-back-sharp" size={34} color="black" onPress={()=>navigation.goBack()}/>
      </View>
      <Text style={styles.SettingsText}>Settings</Text>
      </View>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Text style={styles.Text2}>Payment Methods</Text>
        <View style={styles.Cardcontainer}>
          <TouchableOpacity style={styles.Card} onPress={openEditModal}>
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
          </TouchableOpacity>
          
            <TouchableOpacity style={styles.Add} onPress={openModal}>
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
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Card</Text>
          <Text style={styles.label}>Card Holder</Text>
          <TextInput
            style={styles.input}
           placeholder='required'
            onChangeText={(text) => {
              setCardHolderName(text);
              setIsCardHolderNameEdited(true);
            }}
          />
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
           placeholder='required'
           keyboardType="numeric"
           maxLength={16}
            onChangeText={(text) => {
              const num = text.split(' ');
              setCardNumber(num);
              setIsCardNumberEdited(true);
              
            }}
          />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
                maxLength={5}
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
            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder='required'
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
             
              />
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
       
        </View>
      </Modal>

      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={closeEditModal}
        onBackButtonPress={closeEditModal}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.modalTitle}>Edit Card</Text>
          <TouchableOpacity onPress={dltChanges}>
          <Delete/>
          </TouchableOpacity>
          </View>
          <Text style={styles.label}>Card Holder</Text>
          <TextInput
            style={styles.input}
            value={cardHolderName}
            onChangeText={(text) => {
              setCardHolderName(text);
              setIsCardHolderNameEdited(true);
            }}
          />
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder='**** **** **** ****'
           keyboardType="numeric"
           maxLength={16}
            onChangeText={(text) => {
              const num = text.split(' ');
              setCardNumber(num);
              setIsCardNumberEdited(true);
              
            }}
          />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={expiryDate}
                keyboardType="numeric"
                maxLength={5}
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
            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder='required'
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
             
              />
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveEditDetails}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
       
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
  Text1: {
    fontSize: 20,
    fontWeight: '600',
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
    backgroundColor: '#f8f8ff',
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
    backgroundColor: '#f8f8ff',
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
  modalContainer: {
  justifyContent:'flex-end',
  margin:0
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../App/Utils/Colors';
import { useNavigation } from '@react-navigation/native';

const NewItems = () => {
  const navigation = useNavigation();

  const type = [
    {
      id: '1',
      images: [
        require('./../assets/Images/hb1.png'),
        require('./../assets/Images/hb3.png'),
      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$17,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Black',
      size: 'M',
      variations: [
        require('./../assets/Images/hb2.png'),
        require('./../assets/Images/hb4.png'),
      ],
      Material: [
        'Cotton 95%', 'Nylon 5%'
      ]
    },
    {
      id: '2',
      images: [
        require('./../assets/Images/dr1.png'),
        require('./../assets/Images/dr2.png'),
      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$32,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Red',
      size: 'S',
      variations: [
        require('./../assets/Images/db1.png'),
        require('./../assets/Images/dy1.png'),
      ],
      Material: [
        'Cotton 95%'
      ]
    },
    {
      id: '3',
      images: [
        require('./../assets/Images/j4.png'),

      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Black',
      size: 'S',
      variations: [
        require('./../assets/Images/j1.png'),
        require('./../assets/Images/j2.png'),
      ],
      Material: [
        'Cotton 50%', 'Nylon 50%'
      ]
    },
    {
      id: '4',
      images: [
        require('./../assets/Images/db1.png'),
        require('./../assets/Images/db2.png'),
      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$21,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Blue',
      size: 'M',
      variations: [
        require('./../assets/Images/db3.png'),
        require('./../assets/Images/db4.png'),
      ],
      Material: [
        'Cotton 95%', 'Nylon 5%'
      ]
    },

    {
      id: '5',
      images: [
        require('./../assets/Images/img29.png'),

      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$17,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Black',
      size: 'M',
      variations: [
        require('./../assets/Images/img28.png'),
        require('./../assets/Images/img29.png'),
        require('./../assets/Images/img30.png'),
      ],
      Material: [
        'Cotton 95%', 'Nylon 5%'
      ]
    },
    {
      id: '6',
      images: [
        require('./../assets/Images/img33.png'),
        require('./../assets/Images/img32.png'),
      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$32,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Red',
      size: 'S',
      variations: [
        require('./../assets/Images/img34.png'),
        require('./../assets/Images/img35.png'),
      ],
      Material: [
        'Cotton 95%'
      ]
    },
    {
      id: '7',
      images: [
        require('./../assets/Images/img23.png'),

      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$21,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Blue',
      size: 'M',
      variations: [
        require('./../assets/Images/img21.png'),
        require('./../assets/Images/img22.png'),
      ],
      Material: [
        'Cotton 95%', 'Nylon 5%'
      ]
    },
    {
      id: '8',
      images: [
        require('./../assets/Images/img26.png'),

      ],
      text: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$15,00',
      Dis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, scelerisque eu mauris id, pretium pulvinar sapien.',
      color: 'Black',
      size: 'S',
      variations: [
        require('./../assets/Images/img24.png'),
        require('./../assets/Images/img25.png'),
      ],
      Material: [
        'Cotton 50%', 'Nylon 50%'
      ]
    },
  ];

  const handlePress = (item) => {
    navigation.navigate('NewItemDetail', { item });
  };

  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={styles.recentlyViewedText}>New Items</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('alln')}>
          <Text style={{ fontWeight: 'bold', marginRight: 5 }}>See All</Text>
          <TouchableOpacity style={styles.circleButton}>
            <AntDesign name="arrowright" size={24} color={Colors.WHITE} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {type.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item)} style={{ backgroundColor: Colors.WHITE, width: 190, height: 210, marginRight: 10, borderRadius: 20 }}>
            <View style={styles.imageContainer}>
              <Image
                source={item.images[0]}
                style={{ width: 190, height: 130, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 6, borderColor: Colors.WHITE }}
              />
            </View>
            <Text style={{ paddingLeft: 5, fontWeight: '400', gap: 10 }}>{item.text}</Text>
            <Text style={{ paddingLeft: 8, paddingTop: 10, fontWeight: '400', gap: 10, fontFamily: 'Raleway', fontWeight: '700', fontSize: 17 }}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewItems;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  imageContainer: {
    width: 204,
    height: 140,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginRight: 5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlayImage: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  recentlyViewedText: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },
  liveImage: {
    position: 'absolute',
    top: '3%',
    left: '6%',
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
// Tipos de navegação
type RootStackParamList = {
  Home: undefined;
  MapScreen: undefined;
};

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MapScreen'>;

type Props = {
  navigation: MapScreenNavigationProp;
};

const locations = [
  {
    id: 0,
    coordinate: { latitude: -23.4967109437889, longitude: -47.51667432322461 },
    title: 'Barraca de Frutas e Horta - Torre',
    description: 'Sorocaba/SP',
    address: 'R. Manoel Martins, 100 - Júlio de Mesquita Filho, Sorocaba - SP, 18053-270',
    image: require('./img1local.jpg'),
  },
  {
    id: 1,
    coordinate: { latitude: -23.819795249441395, longitude: -46.11795051871871 },
    title: 'Horta Comunitária Rua 21',
    description: 'Bertioga/SP',
    address: 'Rua João Lucheti Antiga, R. Eng. Paulo Rubens Arieta Filho - Jardim Rio da Praia, Bertioga - SP, 01250-000',
    image: require('./nt.jpg'),
  },
  {
    id: 2,
    coordinate: { latitude: -22.963050701644356, longitude: -47.19224320445346 },
    title: 'Horta Comunitária do Parque Itajaí',
    description: 'Campinas/SP',
    address: 'R. Pedro Miguel - Conj. Hab. Parque Itajai, Campinas - SP, 13058-092',
    image: require('./img3local.jpg'),
  },
  {
  id: 3,
    coordinate: { latitude: -14.122770520869082, longitude: -39.72624405490691},
    title: 'Horta Comunitária',
    description: 'Ipiaú/BA',
    address: 'Tv. Segunda Santa Rita, 178 - Ipiau, Ipiaú - BA, 45570-000',
    image: require('./img4local.jpg'),
  },
  {
  id: 4,
    coordinate: { latitude: -19.890329391272434, longitude: -43.92825290542286},
    title: 'Empório Von Rondon',
    description: 'Belo Horizonte/MG',
    address: 'Av. Cristiano Machado, 1950 - LJ 63 - Cidade Nova, Belo Horizonte - MG, 31170-024',
    image: require('./img5local.jpg'),
  },
  {
  id: 5,
    coordinate: { latitude: -3.1030949642064796, longitude: -60.061570795794225},
    title: 'Hortifruti da Horta',
    description: 'Manaus/AM',
    address: 'R. da Prosperidade, 33 - Compensa, Manaus - AM, 69035-640',
    image: require('./img6local.jpg'),
  },
  {
  id: 6,
    coordinate: { latitude: -23.257568046626567, longitude: -47.292391021909836},
    title: 'Horta do Vô Milton',
    description: 'Itu/SP',
    address: 'R. Mato Grosso, 41 - Brasil, Itu - SP, 13301',
    image: require('./img7local.jpg'),
  },
  {
  id: 7,
    coordinate: { latitude: -16.700126981205745, longitude: -49.09995940469072},
    title: 'Horta Comunitária',
    description: 'Sen. Canedo/GO',
    address: 'Estância Goiás horti-granjeiro (antiga engopa - Jardim de Todos Os Santos, Sen. Canedo - GO, 75264-899',
    image: require('./img8local.jpg'),
  },
  {
  id: 8,
    coordinate: { latitude: 2.8413544644171127, longitude: -60.68297437882769},
    title: 'Horto Municipal de Boa Vista',
    description: 'Boa Vista/RR',
    address: 'Av. Brg. Eduardo Gomes, 100 - Aeroporto, Boa Vista - RR, 69310-005',
    image: require('./img9local.jpg'),
  },
  {
  id: 9,
    coordinate: { latitude: 2.8413544644171127, longitude: -60.68297437882769},
    title: 'Horto Municipal de Boa Vista',
    description: 'Boa Vista/RR',
    address: 'Av. Brg. Eduardo Gomes, 100 - Aeroporto, Boa Vista - RR, 69310-005',
    image: require('./img9local.jpg'),
  },
  {
  id: 10,
    coordinate: { latitude: -23.509292934008812, longitude: -47.50144589343959},
    title: 'Horta Comunitária',
    description: 'Sorocaba/SP',
    address: 'Jardim Itangua, Sorocaba - SP, 18056-610',
    image: require('./img10local.jpg'),
  },
];

// Função para abrir coords no Google Maps
const openInMaps = (latitude: number, longitude: number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url);
};

export default function MapScreen({ navigation }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  const toggleModal = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const onMarkerPress = useCallback((location: typeof locations[0]) => {
    setSelectedLocation(location);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ffffff', '#ddffee']} style={StyleSheet.absoluteFill} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>exit</Text>
      </TouchableOpacity>

      <View style={styles.mapcont}>
        <MapView
          style={styles.mapview}
          mapType='hybrid'
          initialRegion={{
            latitude: -23.5,
            longitude: -47.5,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          customMapStyle={mapStyle} // Aqui está o seu estilo customizado
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              coordinate={loc.coordinate}
              onPress={() => onMarkerPress(loc)}
              title={loc.title}
              description={loc.description}
              zIndex={loc.id===10?999:loc.id}
            >
              {loc.id === 10 ? (
                <Animatable.Image
                  animation="pulse"
                  iterationCount="infinite"
                  easing="ease-out"
                  source={require('./vip.png')}
                  style={{ width: 35, height: 35, resizeMode: 'contain', position:'absolute', borderWidth:2,borderColor:'#fcdcaa',borderRadius:20}}
                />
              ) : (
                <Image
                  source={require('./care.png')}
                  style={{ width: 30, height: 30, resizeMode: 'contain'}}
                />
              )}


            </Marker>
          ))}
        </MapView>
      </View>

      <Modal
        
        
        isVisible={!!selectedLocation}
        style={styles.modal}
        onBackdropPress={toggleModal}
        hideModalContentWhileAnimating={false}
        backdropTransitionOutTiming={400}
        animationInTiming={400}
        animationOutTiming={400}
        backdropTransitionInTiming={300}
        hasBackdrop={true}
        backdropOpacity={0.2}
        onBackButtonPress={toggleModal}


      >
        {selectedLocation && (
          <View style={selectedLocation.id === 10 ? styles.modalContentVIP : styles.modalContent}>
        {selectedLocation.id === 10 && (
          <Text style={styles.vipBadge}>🌟 ÁREA VERIFICADA 🌟</Text>
        )}

        <Text style={styles.modalTitle}>{selectedLocation.title}</Text>
        <Text style={styles.modalText}>{selectedLocation.description}</Text>
        <Image source={selectedLocation.image} style={styles.modalImage} />
        <Text style={styles.modalText}>{selectedLocation.address}</Text>

        <TouchableOpacity
          onPress={() =>
            openInMaps(
              selectedLocation.coordinate.latitude,
              selectedLocation.coordinate.longitude
            )
          }
          style={
            selectedLocation.id === 10
              ? styles.closeButtonVIP
              : styles.closeButton
          }
        >
          <Text style={styles.closeButtonText}>
            🌎 Ver no Maps
          </Text>
        </TouchableOpacity>
      </View>
        )}
      </Modal>
    </View>
  );
}

// Estilo customizado para Google Maps (visual mais clean e moderno)
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#e0f2f1' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#c8e6c9' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#a5d6a7' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#4dd0e1' }],
  },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000000',
    zIndex: 10,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    textShadowColor: 'rgba(255, 255, 255, 1.0)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 30,
  },
  mapview: { width: '100%', height: '100%' },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  modalText: { fontSize: 16, marginVertical: 10, textAlign: 'center' },
  modalImage: { width: 300, height: 200, borderRadius: 20 },
  closeButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#008822',
    borderWidth: 2,
  },
  closeButtonText: { color: '#000', fontSize: 16 },
  mapcont: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalContentVIP: {
  backgroundColor: '#fff8e1',
  padding: 20,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#ffd700',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 10,
},

vipBadge: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#d4af37',
  marginBottom: 10,
  backgroundColor: '#fff3c0',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#d4af37',
  textAlign: 'center',
},

closeButtonVIP: {
  backgroundColor: '#fff8e1',
  padding: 10,
  borderRadius: 10,
  marginTop: 10,
  borderColor: '#d4af37',
  borderWidth: 2,
},

});

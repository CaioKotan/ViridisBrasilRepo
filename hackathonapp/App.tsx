import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import MapScreen from './MapScreen';
import Analytics from './analytics';
import Pessoafisica from './Pessoafisica';
import Pessoajuridica from './Pessoajuridica';
import CriarContaPFisica from './criarcontapessoafisica';
import CriarContaPJuridica from './criarcontapessoajuridica';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import Logo from './logo copy.png';

type RootStackParamList = {
  Home: undefined;
  Analytics: undefined;
  MapScreen: undefined;
  Pessoafisica: undefined;
  Pessoajuridica: undefined;
  CriarContaPFisica: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#0b4b0e' }]}>
      <LinearGradient colors={['#0b4b0e', '#22ac93']} style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }} // Início no canto superior esquerdo
        end={{ x: 1.5, y: 1 }}   // Fim no canto inferior direito
        />

      <Image source={Logo} style={styles.logo}/>
      <View style={styles.c1}>
        
        <Text style={styles.title}>VIRIDIS</Text>
        <Text style={styles.desc}>BRASIL</Text>
        
      </View>
      <View style={styles.contbuttons}>  
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pessoafisica')}>
          <LinearGradient colors={['#0b4b0e', '#0b4b0e']} style={[StyleSheet.absoluteFill, {borderRadius:30}]}
          start={{ x: 0, y: 0 }} // Início no canto superior esquerdo
          end={{ x: 1, y: 0 }}   // Fim no canto inferior direito
          pointerEvents="none"/>
          <Text style={styles.buttonText}>Pessoa física</Text>
        </TouchableOpacity>
        <Text style={styles.forgotpassword}>Ou</Text>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Pessoajuridica')}>
          <LinearGradient colors={['#bed2d0', '#bed2d0']} style={[StyleSheet.absoluteFill, {borderRadius:30}]}
          start={{ x: 0, y: 0 }} // Início no canto superior esquerdo
          end={{ x: 1, y: 0 }}   // Fim no canto inferior direito
          pointerEvents="none"
          />
          <Text style={styles.button2Text}>Pessoa jurídica</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid, detachPreviousScreen: false, cardStyle:{backgroundColor:'#000000'}}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pessoafisica" component={Pessoafisica} />
        <Stack.Screen name="Pessoajuridica" component={Pessoajuridica} />
        <Stack.Screen name="CriarContaPFisica" component={CriarContaPFisica} />
        <Stack.Screen name="CriarContaPJuridica" component={CriarContaPJuridica} />
        <Stack.Screen name="Analytics" component={Analytics} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily:'Montserrat',
    fontSize: 56,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Cor da sombra
    textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra (X, Y)
    textShadowRadius: 15, // Difusão da sombra
    color:'#edb232',
    marginBottom:24,
  },
  desc: {
    bottom:20,
    fontFamily:'Montserrat',
    fontSize: 26,
    marginBottom: 20,
    color:'#dfdfdf',
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Cor da sombra
    textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra (X, Y)
    textShadowRadius: 15, // Difusão da sombra
  },
  button: {
    backgroundColor: '#448844',
    padding: 5,
    borderRadius: 30,
    width:280,
    height:60,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#fff',
    elevation: 5,
    marginBottom:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  button2: {
    backgroundColor: '#448844',
    padding: 5,
    borderRadius: 30,
    width:280,
    height:60,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#fff',
    elevation: 5,
    marginBottom:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  button2Text: {
    color: '#2b5f56',
    fontSize: 20,
  },
  c1:{
    height:'70%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  c2:{
    position:'absolute',
    
    backgroundColor:'#fff',
    borderRadius:44,
    height:'50%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  forgotpassword:{
    color:'#fff',
    marginBottom:20
  },
  btnlineargradient:{
    
  },
  c2cont:{
    justifyContent:'center',
    alignItems:'center'
  },
  entry:{
    width:280,
    height:60,
    backgroundColor:'#ffffff00',
    marginBottom:20,
    borderRadius:40,
    borderWidth:1,
    borderColor:'#fff',
    color:'#fff',
    textAlign:'center',
    fontSize:20,
  },
  entry2:{
    width:280,
    height:60,
    backgroundColor:'#ffffff00',
    marginBottom:70,
    borderRadius:40,
    borderWidth:1,
    borderColor:'#fff',
    color:'#fff',
    textAlign:'center',
    fontSize:20,
  },
  logo:{
    top:200,
    width:250,
    height:250,
    resizeMode:'contain',
  },
  contbuttons:{
    bottom:160,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  }
});

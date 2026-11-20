import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import Modal from 'react-native-modal';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // ajuste o caminho para seu arquivo firebaseConfig

type RootStackParamList = {
  CriarContaPJuridica: undefined;
  MapScreen: undefined;
};

type CriarContaPJuridicaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CriarContaPJuridica'
>;

type Props = {
  navigation: CriarContaPJuridicaScreenNavigationProp;
};

const CriarContaPJuridica: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleCriarConta = async () => {
    if (!email || !senha || !confirmarSenha || !razaoSocial) {
      setModalMessage('Preencha todos os campos');
      setModalVisible(true);
      return;
    }

    if (senha !== confirmarSenha) {
      setModalMessage('As senhas não coincidem');
      setModalVisible(true);
      return;
    }

    if (!isChecked) {
      setModalMessage('Você precisa aceitar os termos de privacidade');
      setModalVisible(true);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigation.navigate('MapScreen');
    } catch (error: any) {
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0b4b0e', '#22ac93']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 1 }}
      />

      <View style={styles.c2}>
        <View style={styles.c2cont}>
          <Text style={styles.title2}>Vamos</Text>
          <Text style={styles.title}>Criar a sua</Text>
          <Text style={styles.title}>conta de</Text>
          <Text style={styles.title}>pessoa jurídica!</Text>
        </View>
      </View>

      <View style={styles.c1}>
        <TextInput
          style={styles.entry}
          placeholder="Email"
          placeholderTextColor="#bed2d0"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.entry}
          placeholder="CNPJ"
          placeholderTextColor="#bed2d0"
          value={cnpj}
          onChangeText={setCnpj}
        />
        <TextInput
          style={styles.entry}
          placeholder="Senha"
          placeholderTextColor="#bed2d0"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.entry2}
          placeholder="Confirmar Senha"
          placeholderTextColor="#bed2d0"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <View style={styles.termos}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#4630EB' : undefined}
          />
          <Text style={styles.termostext}>Eu li e concordo com os </Text>
          <Text style={styles.termostext2}>termos de privacidade</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCriarConta}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={toggleModal}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{modalMessage}</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CriarContaPJuridica;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: { fontSize: 40, fontWeight: 'bold', color: '#fec606', marginBottom: -10, top:140, textAlign:'left', alignSelf:'flex-start'},
  title2: { fontSize: 40, fontWeight: 'regular', color: '#fec606', marginBottom: -10, top:140, textAlign:'left', alignSelf:'flex-start'},
  button: { padding: 5, borderRadius: 30, width: 280, height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', elevation: 5, marginBottom: 5 },
  button2: { padding: 5, borderRadius: 30, width: 280, height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', elevation: 5, marginBottom: 5 },
  buttonText: { color: '#fff', fontSize: 20 },
  button2Text: { color: '#2b5f56', fontSize: 20 },
  c1: { marginBottom: 180, height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center', top:190},
  c2: { position: 'absolute',bottom:520, backgroundColor: '#0b4b0e', borderRadius: 44, height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center',textAlign:'left'},
  forgotpassword: { color: '#2b5f56', marginBottom: 20 },
  c2cont: { bottom: 70, justifyContent: 'flex-start', alignItems: 'flex-start' ,textAlign:'left',width:'85%'},
  entry: { width: 280, height: 60, borderRadius: 40, borderWidth: 1, borderColor: '#fff', color: '#fff', textAlign: 'center', fontSize: 20, marginBottom: 20 },
  entry2: { width: 280, height: 60, borderRadius: 40, borderWidth: 1, borderColor: '#fff', color: '#fff', textAlign: 'center', fontSize: 20, marginBottom:40},
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { backgroundColor: '#a02020ff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  closeButton: { backgroundColor: '#ffffff00', padding: 10, borderRadius: 10, marginTop: 10, borderWidth: 2, borderColor: '#fff' },
  closeButtonText: { color: 'white', fontSize: 16 },
  checkbox: {
    margin: 8,
    width:20
  },
  termos:{
    display:'flex',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    
  },
  termostext:{
    color:'#fff'
  },
  termostext2:{
    color:'#fff',
    fontWeight:'bold'
  }
});

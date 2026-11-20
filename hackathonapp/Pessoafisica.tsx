import React, { useState, useEffect } from 'react';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

type RootStackParamList = {
  Pessoafisica: undefined;
  MapScreen: undefined;
  CriarContaPFisica: undefined;
};

type PessoafisicaScreenNavigationProp = StackNavigationProp<RootStackParamList, "Pessoafisica">;

type Props = {
  navigation: PessoafisicaScreenNavigationProp;
};

const Pessoafisica: React.FC<Props> = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in
        navigation.navigate('MapScreen');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setModalVisible(true);
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#0b4b0e' }]}>
      <LinearGradient
        colors={['#0b4b0e', '#22ac93']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 1 }}
      />
      <View style={styles.c1}>
        <Text style={styles.title}>Pessoa física</Text>
        <TextInput
          style={styles.entry}
          placeholder="Email ou Telefone"
          placeholderTextColor="#bed2d0"
          value={email}
          onChangeText={setEmail} // ✅ Atualiza o estado conforme o usuário digita
        />
        <TextInput
          style={styles.entry2}
          placeholder="Senha"
          placeholderTextColor="#bed2d0"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha} // ✅ Atualiza o estado conforme o usuário digita
        />
      </View>
      <View style={styles.c2}>
        <View style={styles.c2cont}>
          <Text style={styles.forgotpassword}>Esqueceu a senha?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin} // ✅ Verifica email e senha antes de navegar
          >
            <LinearGradient
              colors={['#0b4b0e', '#0b4b0e']}
              style={[StyleSheet.absoluteFill, { borderRadius: 30 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              pointerEvents="none"
            />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.forgotpassword}>Ou</Text>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('CriarContaPFisica')}>
            <LinearGradient
              colors={['#bed2d0', '#bed2d0']}
              style={[StyleSheet.absoluteFill, { borderRadius: 30 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              pointerEvents="none"
            />
            <Text style={styles.button2Text}>Crie uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={toggleModal}
        useNativeDriver
        hideModalContentWhileAnimating
      >
          
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Usuário ou senha incorretos</Text>
          {errorMessage ? <Text style={styles.modalText}>{errorMessage}</Text> : null}
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Pessoafisica;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: { fontSize: 40, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  button: { padding: 5, borderRadius: 30, width: 280, height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', elevation: 5, marginBottom: 5 },
  button2: { padding: 5, borderRadius: 30, width: 280, height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', elevation: 5, marginBottom: 5 },
  buttonText: { color: '#fff', fontSize: 20 },
  button2Text: { color: '#2b5f56', fontSize: 20 },
  c1: { marginBottom: 180, height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' },
  c2: { position: 'absolute', top: 500, backgroundColor: '#0b4b0e', borderRadius: 44, height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' },
  forgotpassword: { color: '#fff', marginBottom: 20 },
  c2cont: { bottom: 55, justifyContent: 'center', alignItems: 'center' },
  entry: { width: 280, height: 60, borderRadius: 40, borderWidth: 1, borderColor: '#fff', color: '#fff', textAlign: 'center', fontSize: 20, marginBottom: 80 },
  entry2: { width: 280, height: 60, borderRadius: 40, borderWidth: 1, borderColor: '#fff', color: '#fff', textAlign: 'center', fontSize: 20 },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: { backgroundColor: '#a02020ff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  modalText: { fontSize: 16, marginVertical: 10 },
  closeButton: {
    backgroundColor: '#ffffff00',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  closeButtonText: { color: 'white', fontSize: 16 },
});

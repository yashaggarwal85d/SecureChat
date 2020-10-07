import { Text,Container,Header } from 'native-base';
import {TextInput, TouchableOpacity,View } from 'react-native';
import React, { useRef,useState,useEffect } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../../firebase/Config';
import { StyleSheet } from 'react-native';

export default AuthScreen = (props) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [error,setError] = useState('');

  useEffect( () => {
    firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
          props.navigation.navigate('Chat');
        }
        else{
          setVerificationId(null)
        } 
    });
}, []);  

  const sendVerification = () => {

    setError('');
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    console.log(recaptchaVerifier.current);
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId).catch(function (error) {
        setError(String(error))
    })

  };

  const confirmCode = () => {

    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        props.navigation.navigate('chat');
      }).catch(function (error) {
        setError(String(error))
      })
  };

  const goback = () => {
    setVerificationId(null);
    setError('');
  }

  if(verificationId)
  {
    return (
      <Container style={styles.container}>
      <Header>
        <Text onPress={goback}>Back</Text>
      </Header>
        <View>
    <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Verifiy</Text>
        </TouchableOpacity>
        <Text>{error}</Text>
        </View>
        </Container>
    
    )
      
  }

  return (
    <Container style={styles.container}>
      <View>
        <TextInput
          placeholder='Phone number'
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.textInput}
          defaultValue={phoneNumber}
        />
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
        
        <Text>{error}</Text>
        
        </View>
    </Container>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      fontSize: 24,
      borderBottomColor: '#7f8c8d33',
      borderBottomWidth: 2,
      marginBottom: 10,
      textAlign: 'center',
    },
    sendVerification: {
      padding: 20,
      backgroundColor: '#3498db',
      borderRadius: 10,
    },
    sendCode: {
      padding: 20,
      backgroundColor: '#9b59b6',
      borderRadius: 10,
    },
    buttonText: {
      textAlign: 'center',
      color: '#ffffff',
    },
  });
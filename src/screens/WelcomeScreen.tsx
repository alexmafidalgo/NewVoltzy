import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/welcomeStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Welcome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.title}>Voltzy</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Image source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/rocket-2-svgrepo-com 1.svg' }} style={styles.icon} />
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

// styles imported from ../styles/welcomeStyles

export default WelcomeScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/loginStyles';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Welcome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempted with:', { username, password });
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/6db458de7b24599d0724eb1ec520230086ce99a9?width=364' }}
        style={styles.avatar}
      />
      <Text style={styles.title}>Log In</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.link}> Sign in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token_v1';

export async function setToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.warn('Failed to save token', e);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.warn('Failed to read token', e);
    return null;
  }
}

export async function removeToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.warn('Failed to remove token', e);
  }
}

export default { setToken, getToken, removeToken };

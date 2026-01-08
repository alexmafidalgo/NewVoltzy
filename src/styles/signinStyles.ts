import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  avatarContainer: { width: 182, height: 182, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 32, fontWeight: '700', marginTop: 8 },
  modal: { width: '100%', padding: 15, borderRadius: 12, backgroundColor: 'rgba(171,200,171,0.5)', marginTop: 12 },
  input: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: '#D9D9D9', borderWidth: 1, borderColor: 'rgba(217,217,217,1)', marginBottom: 12 },
  button: { backgroundColor: '#357850', padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  footer: { alignItems: 'center', marginTop: 16 },
  link: { color: 'rgba(255,255,255,0.9)', fontWeight: '700' }
});

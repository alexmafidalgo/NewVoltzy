import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  avatar: { width: 182, height: 176, borderRadius: 90 },
  title: { color: '#FFF', fontSize: 32, fontWeight: '700', marginTop: 8 },
  modal: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(171,200,171,0.5)',
    marginTop: 12,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: 'rgba(217,217,217,1)',
    marginBottom: 12,
  },
  button: { backgroundColor: '#357850', padding: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  signupRow: { alignItems: 'center', marginTop: 12 },
  link: { color: 'rgba(255,255,255,0.9)', fontWeight: '700' }
});

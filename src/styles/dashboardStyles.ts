import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: '#FFF' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#D9D9D9', padding: 12, marginHorizontal: 4, borderRadius: 8, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#555' },
  statValue: { fontSize: 18, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8, color: '#2E2E2E' },
  lightRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  lightName: { fontSize: 16 },
  routine: { padding: 8, borderRadius: 8, backgroundColor: '#eee', textTransform: 'capitalize', textAlign: 'center', minWidth: 70 },
  routineActive: { backgroundColor: '#1E7B45', color: 'white' }
});

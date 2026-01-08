import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eaf7ea',
    minHeight: '100%'
  },
  topArea: {
    backgroundColor: '#2ca24b',
    borderRadius: 24,
    padding: 18,
    paddingTop: 24,
    marginBottom: 16,
    overflow: 'hidden'
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  header: { fontSize: 22, fontWeight: '700', color: '#fff' },
  houseText: { color: 'rgba(255,255,255,0.9)', marginTop: 6, fontSize: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  statLabel: { fontSize: 12, color: '#6b6b6b' },
  statValue: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  consumptionCard: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    marginTop: 6
  },
  chartPlaceholder: {
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)'
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 8, marginBottom: 8, color: '#1e3a1f' },
  lightsCard: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16
  },
  lightRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  lightName: { fontSize: 14, color: '#fff' },
  lightSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  routineRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  routine: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    minWidth: 70,
    textAlign: 'center'
  },
  routineActive: { backgroundColor: '#1E7B45', color: '#fff' },
  bottomNav: { height: 72, backgroundColor: '#fff', borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginTop: 8 }
});

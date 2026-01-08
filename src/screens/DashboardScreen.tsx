import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import styles from '../styles/dashboardStyles';

const DashboardScreen: React.FC = () => {
  const [lights, setLights] = useState({
    kitchen: true,
    bedroom: true,
    bathroom: true,
    livingRoom: true,
  });

  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);

  const toggleLight = (key: string) => {
    setLights(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hello, user</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statLabel}>Lights on</Text><Text style={styles.statValue}>5</Text></View>
        <View style={styles.statCard}><Text style={styles.statLabel}>Energy Used</Text><Text style={styles.statValue}>32.4 kW/h</Text></View>
        <View style={styles.statCard}><Text style={styles.statLabel}>Energy Saved</Text><Text style={styles.statValue}>14.8 kWh</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Lights</Text>
      {Object.keys(lights).map((k) => (
        <View key={k} style={styles.lightRow}>
          <Text style={styles.lightName}>{k}</Text>
          <Switch value={lights[k as keyof typeof lights]} onValueChange={() => toggleLight(k)} />
        </View>
      ))}

      <Text style={styles.sectionTitle}>Routines</Text>
      <View style={styles.routinesRow}>
        {['night','day','eco','comfort'].map(r => (
          <Text key={r} style={[styles.routine, activeRoutine===r && styles.routineActive]} onPress={() => setActiveRoutine(prev => prev===r ? null : r)}>{r}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

// styles imported from ../styles/dashboardStyles

export default DashboardScreen;

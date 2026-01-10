import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
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
    <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Decorative Blobs - Simplified */}
        <View style={styles.blobContainer}>
          <View style={[styles.blob, { top: 100, left: -50 }]} />
          <View style={[styles.blob, { top: 300, right: -30 }]} />
          <View style={[styles.blob, { bottom: 100, left: 20 }]} />
        </View>
        {/* Glassmorphism Header */}
        <View style={styles.glassHeader}>
          <View style={styles.headerContent}>
            {/* Home Icon */}
            <Svg width={47} height={47} viewBox="0 0 47 47" fill="none">
              <Path
                d="M17.625 43.0832V23.4998H29.375V43.0832M5.875 17.6248L23.5 3.9165L41.125 17.6248V39.1665C41.125 40.2053 40.7124 41.2015 39.9778 41.936C39.2433 42.6705 38.2471 43.0832 37.2083 43.0832H9.79167C8.7529 43.0832 7.75668 42.6705 7.02216 41.936C6.28765 41.2015 5.875 40.2053 5.875 39.1665V17.6248Z"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>

            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <View style={styles.divider} />
            </View>

            {/* Profile Picture */}
            <View style={styles.profilePicture}>
              <Image
                source={{ uri: PROFILE_PLACEHOLDER }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* House ID */}
          <Text style={styles.houseId}>House 1</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Lights on</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Energy Used</Text>
            <Text style={styles.statValue}>32.4<Text style={styles.statUnit}>kW/h</Text></Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Energy Saved</Text>
            <Text style={styles.statValue}>14.8<Text style={styles.statUnit}>kWh</Text></Text>
          </View>
        </View>

        {/* Consumption Chart */}
        <View style={styles.consumptionCard}>
          <Text style={styles.consumptionTitle}>Today's Consumption</Text>
          <View style={{ height: 120, marginTop: 12 }}>
            <Svg width="100%" height="100%" viewBox="0 0 350 120">
              <Defs>
                <SvgLinearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.02" />
                </SvgLinearGradient>
              </Defs>
              <Path d={generateAreaPath([20, 35, 65, 45, 55, 30, 25], 350, 120)} fill="url(#chartGrad)" />
              <Path d={generateLinePath([20, 35, 65, 45, 55, 30, 25], 350, 120)} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <View style={styles.timeLabels}>
            <Text style={styles.timeLabel}>6:07</Text>
            <Text style={styles.timeLabel}>9:00</Text>
            <Text style={styles.timeLabel}>12:00</Text>
            <Text style={styles.timeLabel}>15:00</Text>
            <Text style={styles.timeLabel}>18:00</Text>
          </View>
        </View>

        {/* Lights Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lights</Text>
        </View>
        <View style={styles.lightsCard}>
          <View style={styles.lightsGrid}>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Kitchen</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.kitchen}
                onValueChange={() => toggleLight('kitchen')}
                trackColor={{ false: '#e0e0e0', true: '#FFFFFF' }}
                thumbColor="#78B85E"
              />
            </View>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Bedroom</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.bedroom}
                onValueChange={() => toggleLight('bedroom')}
                trackColor={{ false: '#e0e0e0', true: '#FFFFFF' }}
                thumbColor="#78B85E"
              />
            </View>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Bathroom</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.bathroom}
                onValueChange={() => toggleLight('bathroom')}
                trackColor={{ false: '#e0e0e0', true: '#FFFFFF' }}
                thumbColor="#78B85E"
              />
            </View>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Living Room</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.livingRoom}
                onValueChange={() => toggleLight('livingRoom')}
                trackColor={{ false: '#e0e0e0', true: '#FFFFFF' }}
                thumbColor="#78B85E"
              />
            </View>
          </View>
        </View>

        {/* Routines Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Routines</Text>
        </View>
        <View style={styles.routinesCard}>
          <View style={styles.routineRow}>
            {['Night', 'Day', 'Eco', 'Comfort'].map(r => (
              <TouchableOpacity 
                key={r} 
                onPress={() => setActiveRoutine(prev => prev === r ? null : r)}
                style={[styles.routineButton, activeRoutine === r && styles.routineActive]}
              >
                <Text style={[styles.routineText, activeRoutine === r && styles.routineTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* House Action Buttons */}
        <View style={styles.houseButtons}>
          <TouchableOpacity style={styles.houseButton}>
            <Text style={styles.houseButtonText}>+ Add House</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.houseButton}>
            <Text style={styles.houseButtonText}>Edit House</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Helper functions for chart
function generateLinePath(data: number[], width: number, height: number) {
  if (!data || data.length === 0) return '';
  const step = width / (data.length - 1);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * (height - 20) - 10;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function generateAreaPath(data: number[], width: number, height: number) {
  const line = generateLinePath(data, width, height);
  if (!line) return '';
  return `${line} L ${width} ${height} L 0 ${height} Z`;
}

export default DashboardScreen;
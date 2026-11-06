import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [kitchenActive, setKitchenActive] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const logout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your chef account</Text>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>C</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Christoffel</Text>
            <Text style={styles.role}>Executive Chef</Text>
            <Text style={styles.restaurant}>Grillhouse</Text>
          </View>
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Email</Text>
              <Text style={styles.rowDescription}>
                chef@grillhouse.com
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Role</Text>
              <Text style={styles.rowDescription}>
                Executive Chef
              </Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>Kitchen Status</Text>
              <Text style={styles.rowDescription}>
                Show kitchen as active
              </Text>
            </View>

            <Switch
              value={kitchenActive}
              onValueChange={setKitchenActive}
              trackColor={{
                false: '#D8D2CB',
                true: '#F2A18E',
              }}
              thumbColor={
                kitchenActive ? '#E65B38' : '#FFFFFF'
              }
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>Notifications</Text>
              <Text style={styles.rowDescription}>
                Receive order notifications
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: '#D8D2CB',
                true: '#F2A18E',
              }}
              thumbColor={
                notifications ? '#E65B38' : '#FFFFFF'
              }
            />
          </View>
        </View>

        {/* Logout */}
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navText}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.navIcon}>🍽️</Text>
          <Text style={styles.navText}>Menu</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/orders')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Orders</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navActive}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5EF',
  },

  content: {
    padding: 22,
    paddingBottom: 110,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#292522',
  },

  subtitle: {
    fontSize: 14,
    color: '#77716B',
    marginTop: 4,
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E65B38',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 21,
    fontWeight: '800',
    color: '#292522',
  },

  role: {
    fontSize: 14,
    color: '#77716B',
    marginTop: 4,
  },

  restaurant: {
    fontSize: 13,
    color: '#E65B38',
    fontWeight: '700',
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#292522',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 26,
  },

  row: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rowInfo: {
    flex: 1,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#292522',
  },

  rowDescription: {
    fontSize: 12,
    color: '#77716B',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE8E1',
  },

  logoutButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E65B38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  logoutText: {
    color: '#E65B38',
    fontSize: 15,
    fontWeight: '800',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE8E1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 65,
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  navActive: {
    color: '#E65B38',
    fontSize: 12,
    fontWeight: '800',
  },

  navText: {
    color: '#77716B',
    fontSize: 12,
  },
});
import React from 'react';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome, Chef!</Text>
            <Text style={styles.restaurant}>Grillhouse</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>C</Text>
          </View>
        </View>

        {/* Kitchen Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusTop}>
            <View>
              <Text style={styles.cardTitle}>Kitchen Status</Text>
              <Text style={styles.statusText}>Kitchen Active</Text>
            </View>

            <View style={styles.activeDot} />
          </View>

          <Text style={styles.statusDescription}>
            Your kitchen is running smoothly.
          </Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <Pressable
  style={styles.actionCard}
  onPress={() => router.push('/menu')}
>
            <Text style={styles.actionIcon}>🍽️</Text>
            <Text style={styles.actionTitle}>My Menu</Text>
            <Text style={styles.actionDescription}>
              Manage dishes
            </Text>
          </Pressable>

          <Pressable
  style={styles.actionCard}
  onPress={() => router.push('/add-dish')}
>
  <Text style={styles.actionIcon}>➕</Text>
  <Text style={styles.actionTitle}>Add Dish</Text>
  <Text style={styles.actionDescription}>
    Create a dish
  </Text>
</Pressable>

          <Pressable style={styles.actionCard}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionTitle}>Orders</Text>
            <Text style={styles.actionDescription}>
              View orders
            </Text>
          </Pressable>

          <Pressable
  style={styles.actionCard}
  onPress={() => router.push('/profile')}
>
            <Text style={styles.actionIcon}>👨‍🍳</Text>
            <Text style={styles.actionTitle}>Profile</Text>
            <Text style={styles.actionDescription}>
              Your account
            </Text>
          </Pressable>
        </View>

        {/* Today's Summary */}
        <Text style={styles.sectionTitle}>Today's Summary</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>6</Text>
            <Text style={styles.summaryLabel}>Orders</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>12</Text>
            <Text style={styles.summaryLabel}>Dishes</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>4</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navActive}>Home</Text>
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
          <Text style={styles.navText}>Profile</Text>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  welcome: {
    fontSize: 27,
    fontWeight: '800',
    color: '#292522',
  },

  restaurant: {
    fontSize: 15,
    color: '#77716B',
    marginTop: 4,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E65B38',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
  },

  statusTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 13,
    color: '#77716B',
    marginBottom: 5,
  },

  statusText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#292522',
  },

  activeDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#54A85B',
  },

  statusDescription: {
    color: '#77716B',
    fontSize: 14,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#292522',
    marginBottom: 14,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 18,
    marginBottom: 12,
  },

  actionIcon: {
    fontSize: 25,
    marginBottom: 12,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#292522',
  },

  actionDescription: {
    fontSize: 12,
    color: '#77716B',
    marginTop: 4,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },

  summaryNumber: {
    fontSize: 25,
    fontWeight: '800',
    color: '#E65B38',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#77716B',
    marginTop: 4,
  },

  summaryDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#E5DED7',
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
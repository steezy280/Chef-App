import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddDishScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Main');

  const saveDish = async () => {
  if (!name || !description || !price) {
    Alert.alert('Missing information', 'Please complete all fields.');
    return;
  }

  try {
    const existingDishes = await AsyncStorage.getItem('dishes');
    const dishes = existingDishes ? JSON.parse(existingDishes) : [];

    const newDish = {
      name,
      description,
      price: `R${price}`,
      course,
    };

    await AsyncStorage.setItem(
      'dishes',
      JSON.stringify([...dishes, newDish])
    );

    Alert.alert(
      'Dish Added',
      `${name} has been added to your menu.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/menu'),
        },
      ]
    );
  } catch (error) {
    console.log('Could not save dish:', error);
    Alert.alert('Error', 'Could not save the dish.');
  }
};

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Add Dish</Text>

          <View style={styles.headerSpace} />
        </View>

        <Text style={styles.subtitle}>
          Create a new dish for your menu
        </Text>

        {/* Dish Name */}
        <Text style={styles.label}>Dish Name</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Grilled Chicken"
          placeholderTextColor="#99928B"
          value={name}
          onChangeText={setName}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your dish..."
          placeholderTextColor="#99928B"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Price */}
        <Text style={styles.label}>Price</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currency}>R</Text>

          <TextInput
            style={styles.priceInput}
            placeholder="0.00"
            placeholderTextColor="#99928B"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Course */}
        <Text style={styles.label}>Course</Text>

        <View style={styles.courseContainer}>
          {['Starter', 'Main', 'Dessert'].map((item) => (
            <Pressable
              key={item}
              onPress={() => setCourse(item)}
              style={[
                styles.courseButton,
                course === item && styles.courseButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.courseText,
                  course === item && styles.courseTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Save */}
        <Pressable
  style={styles.saveButtonText}
  onPress={saveDish}
>
  <Text style={styles.saveText}>Save Dish</Text>
</Pressable>

        {/* Cancel */}
        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </ScrollView>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  back: {
    fontSize: 38,
    color: '#292522',
    lineHeight: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#292522',
  },

  headerSpace: {
    width: 30,
  },

  subtitle: {
    textAlign: 'center',
    color: '#77716B',
    fontSize: 14,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#292522',
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#292522',
  },

  textArea: {
    height: 110,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  priceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  currency: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E65B38',
    marginRight: 8,
  },

  priceInput: {
    flex: 1,
    fontSize: 14,
    color: '#292522',
  },

  courseContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  courseButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  courseButtonActive: {
    backgroundColor: '#E65B38',
  },

  courseText: {
    color: '#77716B',
    fontWeight: '600',
    fontSize: 13,
  },

  courseTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  saveButtonText: {
    backgroundColor: '#E65B38',
    borderRadius: 15,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  cancelButton: {
    alignItems: 'center',
    paddingVertical: 18,
  },

  cancelText: {
    color: '#77716B',
    fontSize: 14,
    fontWeight: '600',
  },
});
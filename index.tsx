import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
  console.log('LOGIN CLICKED');

  if (email === 'chef@grillhouse.com' && password === 'Chef123') {
    router.replace('/home');
  } else {
    Alert.alert(
      'Login failed',
      'Use:\n\nEmail: chef@grillhouse.com\nPassword: Chef123'
    );
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>C</Text>
      </View>

      <Text style={styles.title}>ChefApp</Text>
      <Text style={styles.subtitle}>Welcome back, Chef!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="chef@grillhouse.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Chef123"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={login}
        >
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => Alert.alert('Forgot Password', 'Coming soon!')}
        >
          <Text style={styles.secondaryText}>Forgot password?</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        <Pressable
          style={styles.createButton}
          onPress={() => Alert.alert('Create Account', 'Coming soon!')}
        >
          <Text style={styles.createText}>Create Chef Account</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Grillhouse • Chef Management</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5EF',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  logo: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#E65B38',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#292522',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#77716B',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#292522',
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD6CF',
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#292522',
    marginBottom: 18,
  },

  loginButton: {
    height: 54,
    backgroundColor: '#E65B38',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonPressed: {
    opacity: 0.6,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },

  secondaryText: {
    color: '#E65B38',
    fontWeight: '600',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5DED7',
  },

  or: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 12,
  },

  createButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E65B38',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  createText: {
    color: '#E65B38',
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 20,
  },
});
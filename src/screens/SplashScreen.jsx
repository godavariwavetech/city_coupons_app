// src/screens/SplashScreen.js

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.Auth?.userId);

  console.log('SplashScreen → userId:', userId, '| Type:', typeof userId);

  useEffect(() => {
    const checkUserAndNavigate = () => {
      console.log('Deciding navigation... userId is:', userId);

      if (userId) {
        navigation.replace('TabNavigator');
      } else {
        navigation.replace('LoginScreen');
      }
    };

    const timer = setTimeout(checkUserAndNavigate, 2000);
    return () => clearTimeout(timer);
  }, [navigation, userId]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;

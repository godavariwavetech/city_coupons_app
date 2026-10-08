import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BniLogo = ({ size = 'large', style }) => {
  const isLarge = size === 'large';
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icon.png')}
        style={style || (isLarge ? styles.logoLarge : styles.logoSmall)}
        resizeMode="contain"
      />
    </View>
  );
};

export default BniLogo;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  logoLarge: { width: 220, height: 220 },
  logoSmall: { width: 140, height: 140 },
});

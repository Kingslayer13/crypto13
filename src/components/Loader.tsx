import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../shared/constants/styles';

export default function Loader(props: { label: string }) {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>{props.label || 'Loading'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

    backgroundColor: COLORS.BORDER_DEFAULT,
    opacity: 0.8,
    zIndex: 1000,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.TEXT_DEFAULT,
    fontFamily: FONTS.IBM_Plex_Bold,
  },
});

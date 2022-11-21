import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
} from 'react-native';
import { COLORS, FONTS } from '../shared/constants/styles';

export interface IInputProps extends TextInputProps {
  label: string;
  innerRef: any;
}

export default function CustomInput(props: IInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        ref={props.innerRef}
        style={styles.input}
        placeholderTextColor={COLORS.TEXT_DEFAULT}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    marginBottom: 7,
    position: 'relative',
    height: 50,
    color: COLORS.TEXT_DEFAULT,
    borderWidth: 1,
    borderColor: COLORS.BORDER_DEFAULT,
    padding: 10,
  },
  label: {
    position: 'absolute',
    top: -12,
    left: 10,
    backgroundColor: COLORS.BG_DEFAULT,
    fontFamily: FONTS.IBM_Plex_MediumItalic,
    color: COLORS.TEXT_DEFAULT,
  },
  input: {
    width: '100%',
    color: COLORS.TEXT_DEFAULT,
    fontFamily: FONTS.IBM_Plex_MediumItalic,
  },
});

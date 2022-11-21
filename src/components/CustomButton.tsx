import React from 'react';
import {
  Text,
  ButtonProps,
  Pressable,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS } from '../shared/constants/styles';

interface ICustomButtonProps extends ButtonProps {
  style: StyleProp<TextStyle>;
}

export default function CustomButton(props: ICustomButtonProps) {
  const { onPress, disabled, title = 'Save' } = props;
  const getStyles = (name: 'button' | 'text') => {
    const style = styles[name];
    return disabled ? { ...style, ...styles[`${name}Disabled`] } : style;
  };
  return (
    <Pressable
      style={{ ...getStyles('button'), ...props.style }}
      onPress={onPress}>
      <Text style={getStyles('text')}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 10,
    height: 50,
    borderColor: COLORS.BORDER_DEFAULT,
    borderWidth: 2,
    backgroundColor: COLORS.BG_DEFAULT,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.IBM_Plex_Bold,
    color: COLORS.TEXT_DEFAULT,
  },
  textDisabled: {
    color: 'grey',
  },
  buttonDisabled: {
    borderColor: 'grey',
  },
});

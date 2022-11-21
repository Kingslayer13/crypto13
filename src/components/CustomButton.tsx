import React, { useState } from 'react';
import {
  Text,
  ButtonProps,
  Pressable,
  StyleSheet,
  StyleProp,
  TextStyle,
  Animated,
} from 'react-native';
import { COLORS, FONTS } from '../shared/constants/styles';

interface ICustomButtonProps extends ButtonProps {
  style: StyleProp<TextStyle>;
}

export default function CustomButton(props: ICustomButtonProps) {
  const { onPress, disabled, title = 'Save' } = props;
  const [animation] = useState(new Animated.Value(0));
  const getStyles = (name: 'box' | 'text') => {
    const style = styles[name];
    return disabled ? { ...style, ...styles[`${name}Disabled`] } : style;
  };
  const handleAnimation = (event) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => onPress(event));
    });
  };
  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.BG_DEFAULT, COLORS.BORDER_DEFAULT],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };
  return (
    <Pressable style={props.style} onPress={handleAnimation}>
      <Animated.View style={{ ...getStyles('box'), ...animatedStyle }}>
        <Text style={getStyles('text')}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 50,
    padding: 10,
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
  boxDisabled: {
    borderColor: 'grey',
  },
});

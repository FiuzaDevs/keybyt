import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function ButtonTouch({title, ...rest}: ButtonProps){
    return (
      <TouchableOpacity style={styles.container} {...rest}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue_mar,
    height: 56,
    width: 128,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textTransform: "uppercase",
  },
});
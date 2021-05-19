import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, StyleSheet, Button } from "react-native";

import { useAuth } from "../context/auth";
import colors from "../styles/colors";

export function Home(){

    const {user, logout}:any = useAuth()
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{user?.email}</Text>
        <Button
          title="Logout"
          onPress={() => [logout(), navigation.navigate("welcome")]}
        />
        <Button
          title="NewUser"
          onPress={() => navigation.navigate("newUser")}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue_white,
  },
});
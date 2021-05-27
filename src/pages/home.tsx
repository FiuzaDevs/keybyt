import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import { useAuth } from "../context/auth";
import { useDevice } from "../context/device";
import colors from "../styles/colors";

export function Home() {
  const { user, userInfo, logout }: any = useAuth();
  const {device, controlUser}: any = useDevice();
  const navigation = useNavigation();

  // wherever the useState is located
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [sucessBiometric, setIsSucessBiometric] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });
  
  const userObject = JSON.parse(JSON.stringify(userInfo)) || [0];
  console.log(userObject[0].name);

  const handleBiometricAuth = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error("No Faces / Fingers found.");
      }

      // Authenticate user
      setIsSucessBiometric((await LocalAuthentication.authenticateAsync({promptMessage:"Use a biometria para liberar a porta!"})).success)
    } catch (error) {
      Alert.alert("An error as occured", error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{user?.email}</Text>
      <Text>
        {!(userObject[0] === "undefined")
          ? userObject[0]?.name + " " + userObject[0]?.lastname
          : "Carregando"}
      </Text>
      <Text>{sucessBiometric ? "true" : "false"}</Text>
      <View>
        {device?.map((item: any) => {
          <TouchableOpacity key={item?.id}>{device?.name}</TouchableOpacity>
        })}
      </View>
      <Button title="Biometric" onPress={() => handleBiometricAuth()} />

      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue_white,
    padding:5
  },
});

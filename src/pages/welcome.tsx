import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { useAuth } from "../context/auth";
import icon from "../../assets/keybyt-logo.png";

import colors from "../styles/colors";

export function Welcome() {
  const { user }: any = useAuth();

  const navigation = useNavigation();

  function handleStartLogin() {
    navigation.navigate("login");
  }
  function handleStartSingUp() {
    navigation.navigate("singUp");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Abra{"\n"}suas trancas de{"\n"}forma fácil e segura!
        </Text>
        <Image source={icon} style={styles.image} resizeMode="contain" />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleStartSingUp}
          >
            <Text style={styles.buttonText}>Crie uma conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleStartLogin}
          >
            <Text style={styles.buttonText}>Acessa sua conta</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="NewUser"
          onPress={() => navigation.navigate("newUser")}
        />
        <Text>{!!user ? "true" : "false"}</Text>
        <Text>{user?.email}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.blue_white,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",    
    paddingHorizontal: 20,
    marginTop:20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 38,
    lineHeight: 42,
  },
  image: {
    width: 320,
    height: Dimensions.get("window").width * 0.7,
    marginTop:25,
  },
  buttonView: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 35,
  },
  button: {
    backgroundColor: colors.blue_light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 56,
    width: 152,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
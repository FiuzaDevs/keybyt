import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAuth } from "../context/auth";

import colors from "../styles/colors";
import userImg from "../../assets/adaptive-icon.png";

export function Header() {
  const { userInfo, logout }: any = useAuth();
  const userObject = JSON.parse(JSON.stringify(userInfo)) || [0];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>
          {!(userObject[0]?.name === "undefined")
            ? userObject[0]?.name + " " + userObject[0]?.lastname
            : "Carregando"}
        </Text>
      </View >
      <Image source={userImg} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  greeting: {
    fontSize: 32,
  },
  userName: {
    fontSize: 32,
    lineHeight: 40,
  },
});

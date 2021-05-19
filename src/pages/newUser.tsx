import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useAuth } from "../context/auth";
import colors from "../styles/colors";

export function NewUser() {
  const { user, addUser, userInfo }: any = useAuth();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFilledName, setIsFilledName] = useState(false);
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  

  const navigation = useNavigation();
  if (!!userInfo) {
    return (
      <View style={styles.containerOFF}>
        <Text>Voce já cadastrou seu nome</Text>
        <Text>{user?.email}</Text>
        {userInfo?.map((data: any) => {
          return <Text key={data.id}>{data.name + " " + data.lastname}</Text>;
        })}
        <Button
          title="Voltar para a tela inicial"
          onPress={() => [navigation.navigate("home")]}
        />
      </View>
    );
  }
  const handleNewUser = async (username: string, lastname: string) => {
    setLoading(true);
    const { data: userInfo, error } = await addUser(username, lastname);
    console.log(userInfo);
    console.log(error);
    if (error) {
      Alert.alert("Error na criação de usuario", error.message);
    }
    if (!error) {
      navigation.navigate("home");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.wrapper}>
            <View style={styles.formulario}>
              <View style={styles.header}>
                <Text style={styles.title}>Informe seu nome!</Text>
                <Text>{user?.id}</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocusedName || isFilledName) && {
                    borderColor: colors.green,
                  },
                ]}
                placeholder="Digite o seu nome"
                onBlur={() => [
                  setIsFocusedName(false),
                  setIsFilledName(!!username),
                ]}
                onFocus={() => setIsFilledName(true)}
                onChangeText={(text) => setUsername(text)}
                value={username}
                autoCapitalize="none"
              />
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite o seu sobrenome"
                onBlur={() => [setIsFocused(false), setIsFilled(!!lastname)]}
                onFocus={() => setIsFilled(true)}
                onChangeText={(text) => setLastname(text)}
                autoCorrect={false}
                value={lastname}
                autoCapitalize="none"
              />
              <View
                style={{
                  marginTop: 40,
                  width: "100%",
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => handleNewUser(username, lastname)}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}> Avança</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text>{JSON.stringify(userInfo)}</Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 40,
    backgroundColor: colors.blue_white,
  },
  containerOFF: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: colors.blue_white,
  },
  wrapper: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 42,
  },
  button: {
    backgroundColor: colors.blue_light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginTop: 10,
    height: 56,
    width: 152,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  formulario: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },
  input: {
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: colors.blue_dark,
  },
  header: {
    alignItems: "center",
  },
});

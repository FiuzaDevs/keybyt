import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuth } from "../context/auth";
import colors from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export function Login() {
  const navigation = useNavigation();

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFilledEmail, setIsFilledEmail] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login }: any = useAuth();

  function handleInputBlur() {
    setIsFocusedEmail(false);
    setIsFilledEmail(!!email);
  }
  function handlerInputFocus() {
    setIsFocusedEmail(true);
  }
  function handlerInputChange(value: string) {
    setIsFilledEmail(!!value);
    setEmail(value);
  }

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    const { error, user } = await login(email,password);
    if (error) {
      Alert.alert("Error no Login", error.message);
    }/*
    if(!error){
      navigation.navigate("home");
    }*/
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
                <Text style={styles.title}>Iniciar sessão</Text>
              </View>
              <View style={styles.dados}>
                <TextInput
                  style={[
                    styles.input,
                    (isFocusedEmail || isFilledEmail) && {
                      borderColor: colors.green,
                    },
                  ]}
                  placeholder="Digite o email"
                  onBlur={handleInputBlur}
                  onFocus={handlerInputFocus}
                  onChangeText={handlerInputChange}
                  value={email}
                  autoCapitalize="none"
                />
                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: colors.green },
                  ]}
                  placeholder="Digite a senha"
                  onBlur={() => [setIsFocused(false), setIsFilled(!!password)]}
                  onFocus={() => setIsFilled(true)}
                  onChangeText={(text) => setPassword(text)}
                  autoCorrect={false}
                  value={password}
                  textContentType="password"
                  secureTextEntry={true}
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
                    onPress={() => handleLogin(email, password)}
                    disabled={loading}
                  >
                    <Text style={styles.buttonText}> Acessar Conta</Text>
                  </TouchableOpacity>
                  <Text style={styles.subtitle}>
                    Não tem Conta? Crie agora!
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                  >
                    <Text style={styles.buttonText}> Crie uma Conta! </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.blue_white,
  },
  dados: {
    borderRadius: 25,
    width: "100%",
    margin: 5,
    padding: 7,
    backgroundColor: colors.gray_white,
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
  subtitle: {
    color: "gray",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 16,
  },
});

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../context/auth";
import colors from "../styles/colors";

export function SingUp() {
  const navigation = useNavigation();

   const [isFocusedEmail, setIsFocusedEmail] = useState(false);
   const [isFilledEmail, setIsFilledEmail] = useState(false);
   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirm, setPasswordConfirm] = useState("");
   const [loading, setLoading] = useState(false);

  const { user, singUp }: any = useAuth();

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

  const handleSingUp = async (email: string, password: string, passwordConfirm:string) => {
    if(password === passwordConfirm){
      setLoading(true);
      const { error, user } = await singUp(email, password);
      if (error) {
        Alert.alert("Error no Login", error.message);
      }
       if (!error) {
         navigation.navigate("newUser");
       }
      setLoading(false);
    }
    else{
       Alert.alert("Error a Criar conta", "Senha de confirmação diferente");
    }
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
                <Text style={styles.title}>Crie a conta agora!</Text>
                <Text>{email + " " + password}</Text>
              </View>
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
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Confirme a senha"
                onBlur={() => [setIsFocused(false), setIsFilled(!!password)]}
                onFocus={() => setIsFilled(true)}
                onChangeText={(text) => setPasswordConfirm(text)}
                autoCorrect={false}
                value={passwordConfirm}
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
                  onPress={() => handleSingUp(email, password, passwordConfirm)}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}> Crie uma Conta! </Text>
                </TouchableOpacity>
                <Text style={styles.subtitle} >Já Conta? acessa ela agora</Text>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => navigation.goBack()}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}> Acessar Conta</Text>
                </TouchableOpacity>
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
    marginTop: 45,
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: colors.blue_dark,
  },
  header: {
    alignItems: "center",
  },
  subtitle:{
    color:"gray",
    fontWeight:'bold',
    marginTop:20,
    fontSize:16,
  }
});

import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Message, Client } from "paho-mqtt";

import { useAuth } from "../context/auth";
import { useDevice } from "../context/device";
import colors from "../styles/colors";
import { Header } from "../components/Header";
import { ButtonTouch } from "../components/ButtonTouch";

export function Home() {
  const { userInfo, logout }: any = useAuth();
  const { device, controlUser }: any = useDevice();
  const [callMensage, setCallMensage] = useState("nada");

  const controlUserObject = JSON.parse(JSON.stringify(controlUser)) || [0];
  const deviceObject = JSON.parse(JSON.stringify(device)) || [0];

  const navigation = useNavigation();

  //MQTT

  // Create a client instance
  const clientMQTT = new Client(
    "broker.mqttdashboard.com",
    Number(8000),
    "clientId-9DDYtvlB5o"
  );

  clientMQTT.onConnectionLost = onConnectionLost;
  clientMQTT.onMessageArrived = onMessageArrived;
  clientMQTT.onMessageDelivered;

  // called when the client loses its connection
  function onConnectionLost(responseObject: {
    errorCode: number;
    errorMessage: string;
  }) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message: { payloadString: string }) {
    console.log("onMessageArrived:" + message.payloadString);
    setCallMensage(message.payloadString);
  }

  function EnviarMensagem(mensagem: string) {
    let message = new Message(mensagem);
    message.destinationName = "testetccexpo/teste";
    clientMQTT.connect({ onSuccess: sendMessage, cleanSession: true });
    function sendMessage() {
      console.log(message);
      clientMQTT.subscribe("testetccexpo/teste");
      clientMQTT.send(message);
      clientMQTT.disconnect();
    }
  }

  const handleBiometricAuth = async (id: number, name: string) => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error(
          "Seu dispositivo não é compativel com sistema de biometria."
        );
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error(
          "Nenhum biometria cadastrada. Por favor registre a biometria usando as configurações do celular"
        );
      }

      // Authenticate user
      if (
        (
          await LocalAuthentication.authenticateAsync({
            promptMessage: `Use a biometria para liberar ${name}`,
          })
        ).success
      ) {
        setCallMensage("espera");
        let mensagem = id + name.replace(/\s/g, "");
        EnviarMensagem(mensagem);
      }
    } catch (error) {
      Alert.alert("An error as occured", error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Algum titulo</Text>
        <Text style={styles.subtitle}>Algum subtitulo?</Text>
      </View>

      <View style={styles.listaButton}>
        <Text style={styles.title}>Seus dispotivos</Text>
        {deviceObject?.map((item: any) => {
          return <ButtonTouch key={item?.id} title={item?.name} />;
        })}
      </View>
      <View>
        <Text style={styles.title}>Suas portas</Text>
        <FlatList
          data={controlUserObject}
          horizontal={true}
          style={{ maxHeight: 65 }}
          contentContainerStyle={styles.enviromentList}
          renderItem={({ item }) => (
            <ButtonTouch
              key={item?.id}
              title={item?.device_doors?.door_name}
              onPress={() =>
                handleBiometricAuth(item.id, item?.device_doors?.door_name)
              }
            />
          )}
        />
      </View>
      <View>
        <Text>{callMensage}</Text>
      </View>

      <ButtonTouch title="Logout" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.blue_white,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    paddingHorizontal: 30,
    width: "100%",
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 20,
    alignSelf: "center",
  },
  listaButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    overflow: "scroll",
  },
  enviromentList: {
    height: 56,
    justifyContent: "center",
    paddingBottom: 5,
    margin: 2,
  },
});
/* {controlUserObject?.map((item: any) => {
          return (
            <ButtonTouch key={item?.id} title={item?.device_doors?.door_name} />
          );
        })}
        */

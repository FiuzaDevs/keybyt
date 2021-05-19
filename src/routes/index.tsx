import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "../context/auth";
import AppLoading from "expo-app-loading";
// https://reactnavigation.org/docs/getting-started
// yarn add @react-navigation/native

import { Welcome } from "../pages/welcome";
import { Login } from "../pages/login";
import { SingUp } from "../pages/singUp";
import { Home } from "../pages/home";
import { NewUser } from "../pages/newUser";

const stackRoutes = createStackNavigator();

function Routes() {
  const { user, loading }: any = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <stackRoutes.Navigator headerMode="none">
          <stackRoutes.Screen name="welcome" component={Welcome} />
          <stackRoutes.Screen name="login" component={Login} />
          <stackRoutes.Screen name="singUp" component={SingUp} />
          <stackRoutes.Screen name="newUser" component={NewUser} />
          <stackRoutes.Screen name="home" component={Home} />
        </stackRoutes.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default Routes;

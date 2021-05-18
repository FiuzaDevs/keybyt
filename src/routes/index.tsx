import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "../context/auth";
// https://reactnavigation.org/docs/getting-started
// yarn add @react-navigation/native

import { Welcome } from "../pages/welcome";
import { Login } from "../pages/login";
import { SingUp } from "../pages/singUp";

const stackRoutes = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <AuthProvider>
      <stackRoutes.Navigator headerMode="none">
        <stackRoutes.Screen name="welcome" component={Welcome} />
        <stackRoutes.Screen
          name="login"
          component={Login}
          options={{ gestureEnabled: true, gestureDirection: "horizontal" }}
        />
        <stackRoutes.Screen name="singUp" component={SingUp} />
      </stackRoutes.Navigator>
    </AuthProvider>
  </NavigationContainer>
);

export default Routes;

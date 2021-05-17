import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {AuthProvider} from '../context/auth'
// https://reactnavigation.org/docs/getting-started
// yarn add @react-navigation/native

import { Welcome } from "../pages/Welcome";

const stackRoutes = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <AuthProvider>
      <stackRoutes.Navigator headerMode="none" screenOptions={{}}>
        <stackRoutes.Screen name="Welcome" component={Welcome} />
      </stackRoutes.Navigator>
    </AuthProvider>
  </NavigationContainer>
);

export default Routes;

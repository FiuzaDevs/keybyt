import React from "react";
import { createStackNavigator } from "@react-navigation/stack"; //yarn add @react-navigation/stack
import { Welcome } from "../pages/welcome";
import { Login } from "../pages/login";
import { SingUp } from "../pages/singUp";
import { NewUser } from "../pages/newUser";
// https://reactnavigation.org/docs/getting-started
// yarn add @react-navigation/native

const stackRoutes = createStackNavigator();

const AuthRoute: React.FC = () => {
  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{ animationTypeForReplace: "pop" }}
    >
      <stackRoutes.Screen name="welcome" component={Welcome} />
      <stackRoutes.Screen name="login" component={Login} />
      <stackRoutes.Screen name="singUp" component={SingUp} />
      <stackRoutes.Screen name="newUser" component={NewUser} />
    </stackRoutes.Navigator>
  );
};

export default AuthRoute;

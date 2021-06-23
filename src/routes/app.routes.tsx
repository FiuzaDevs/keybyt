import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack"; //yarn add @react-navigation/stack
import { Home } from "../pages/home";
import { useAuth } from "../context/auth";
import { NewUser } from "../pages/newUser";
import AppLoading from "expo-app-loading";
import { deviceDetails } from "../pages/deviceDetails";
// https://reactnavigation.org/docs/getting-started
// yarn add @react-navigation/native

const stackRoutes = createStackNavigator();

const AppRoute: React.FC = () => {
  const { userInfo }: any = useAuth();
  const [userObject, setUserObject] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log(userInfo + " userObject");
    if (typeof userInfo === "object" && userInfo !== null) {
      setUserObject(Object.keys(userInfo).length === 0);
    }
    setLoading(false);
  }, [userInfo]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{ animationTypeForReplace: "pop" }}
    >
      {!userObject ? (
        <>
          <stackRoutes.Screen name="home" component={Home} />
          <stackRoutes.Screen name="deviceDetails" component={deviceDetails} />
        </>
      ) : (
        <stackRoutes.Screen name="newUser" component={NewUser} />
      )}
    </stackRoutes.Navigator>
  );
};

export default AppRoute;

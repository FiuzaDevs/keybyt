import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../context/auth";
import { DeviceProvider } from "../context/device";
// https://reactnavigation.org/docs/getting-started
// yarn add @react-navigation/native

import { Session } from "@supabase/supabase-js";
import { supabase } from "../services/api";
import AuthRoute from "./auth.routes";
import AppRoute from "./app.routes";
import AppLoading from "expo-app-loading";

function Routes() {
  const [isSingIn, setIsSingIn] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
      }
    );
    session?.user?.aud === "authenticated"
      ? setIsSingIn(true)
      : setIsSingIn(false);

    setLoading(false);

    return () => {
      authListener?.unsubscribe();
    };
  }, [session]);

  if (loading) {
    <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        {isSingIn ? (
          <DeviceProvider>
            <AppRoute />
          </DeviceProvider>
        ) : (
          <AuthRoute />
        )}
      </AuthProvider>
    </NavigationContainer>
  );
}

export default Routes;

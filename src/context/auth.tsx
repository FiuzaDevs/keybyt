import React, { useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../services/api";
import "react-native-url-polyfill/auto"; // yarn add react-native-url-polyfill
// Nunca esuqece de impora!!
const AuthContext = React.createContext("");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setSession(session);
        setUser(session?.user ?? null);
        fetchUser();
      }
    );
    setLoading(false);
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const fetchUser = async () => {
    const { data: userInfo, error } = await supabase
      .from("user_info")
      .select("*");
    if (error) {
      console.log("error", error.message);
    }
    setUserInfo(userInfo!);
  };

  function singUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  }
  function login(email: string, password: string) {
    return supabase.auth.signIn({ email, password });
  }

  function logout() {
    return supabase.auth.signOut();
  }

  function addUser(username: string, lastname: string) {
    return supabase
      .from("user_info")
      .insert(
        [
          {
            user_id: user?.id,
            name: username,
            lastname: lastname,
            is_active: true,
          },
        ],
        { returning: "minimal" }
      )
      .single();
  }
  function updateUser(id: any, username: string, lastname: string) {
    return supabase
      .from("user_info")
      .update({
        name: username,
        lastname: lastname,
      })
      .eq("id", id);
  }

  const value: any = {
    user,
    userInfo,
    singUp,
    login,
    logout,
    addUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

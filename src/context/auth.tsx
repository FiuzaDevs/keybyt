import React, { useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import supabase from "../services/api";
const AuthContext = React.createContext("");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | any>(null);
  const [userInfo, setUserInfo] = useState<any>();
  const [loading, setLoading] = useState(true);

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
      .insert([
        {
          user_id: user.id,
          user_name: username,
          user_lastname: lastname,
          user_nickname:username,
          is_active: true,
        },
      ])
      .single();
  }
  function updateUser(id: any, username: string, lastname: string) {
    return supabase
      .from("user_info")
      .update({
        user_name: username,
        user_lastname: lastname,
      })
      .eq("id", id);
  }

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );
    if (!!user) {
      fetchUser();
    }

    setLoading(false);
    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const fetchUser = async () => {
    let { data: user_info, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.log("error", error.message);
    }
    setUserInfo(user_info);
  };

  const value: any = {
    user,
    userInfo,
    singUp,
    login,
    logout,
    addUser,
    updateUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

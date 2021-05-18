import React, { useContext, useEffect, useState } from "react";
import supabase from "../services/api";
const AuthContext = React.createContext("");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>();
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
          name: username,
          lastname: lastname,
          is_active: true,
        },
      ])
      .single();
  }
  function updateUser(
    id: any,
    username: string,
    lastname: string,
  ) {
    return supabase
      .from("user_info")
      .update({
        name: username,
        lastname: lastname
      })
      .match({ id: id });
  }

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser);
      }
    );
    fetchUser();
    setLoading(false);
    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const fetchUser = async () => {
    let { data: user_info, error } = await supabase
      .from("user_info")
      .select("*");
    //.eq("user_id", user.id);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

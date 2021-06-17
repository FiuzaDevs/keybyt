import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../services/api";
import { useAuth } from "./auth";
import "react-native-url-polyfill/auto";

const DeviceContext = React.createContext("");

export function useDevice() {
  return useContext(DeviceContext);
}

export function DeviceProvider({ children }: any) {
  const { user }: any = useAuth();
  const [device, setDevice] = useState<any>(null);
  const [controlUser, setControlUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevice();
    fetchControlUser();
    setLoading(false);

    return function cleanup() {};
  }, [user]);

  const fetchDevice = async () => {
    const { data: device, error } = await supabase
      .from("device")
      .select("*")
      .eq("owner_id", user?.id);
    if (error) {
      console.log("error", error.message);
    }
    setDevice(device);
  };

  async function fetchDeviceID(id: number) {
    const { data, error } = await supabase
      .from("device")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log("error", error.message);
    }
    return data;
  }

  async function fetchDeviceDoors(id: number) {
    const { data, error } = await supabase
      .from("device_doors")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log("error", error.message);
    }    
    
    return data;
  }

  const fetchControlUser = async () => {
    const { data: controlUser, error } = await supabase
      .from("control_user")
      .select("*,device_doors(door_name, devices:device_id(access_key))")
      .eq("user_id", user?.id);
    if (error) {
      console.log("error", error.message);
    }
    console.log(controlUser);
    
    setControlUser(controlUser);
  };

  async function addDevice(
    userID: string,
    name: string,
    acessKey: string,
    pin: number
  ) {
    return await supabase
      .from("control_user")
      .insert(
        [
          {
            user_id: userID,
            name: name,
            acess_key: acessKey,
            user_key: pin,
          },
        ],
        { returning: "minimal" }
      )
      .single().then(()=>{
        fetchDevice();
      })
  }
  function addDeviceDoors(deviceId: string, name: string) {
    return supabase
      .from("control_user")
      .insert(
        [
          {
            device_id: deviceId,
            door_name: name,
          },
        ],
        { returning: "minimal" }
      )
      .single();
  }
  function addControlUser(
    doorID: number,
    userID: string,
    userAdmin: boolean,
    pin: number
  ) {
    return supabase
      .from("control_user")
      .insert(
        [
          {
            user_id: userID,
            door_id: doorID,
            user_admin: userAdmin,
            is_active: true,
            user_key: pin,
          },
        ],
        { returning: "minimal" }
      )
      .single();
  }

  const value: any = {
    device,
    controlUser,
    fetchDeviceDoors,
    fetchDeviceID,
    addControlUser,
    addDevice,
    addDeviceDoors,
  };

  return (
    <DeviceContext.Provider value={value}>
      {!loading && children}
    </DeviceContext.Provider>
  );
}

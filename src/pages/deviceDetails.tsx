import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { supabase } from "../services/api";

export function deviceDetails({ route }: any) {

  const { device } = route.params;
  const { deviceDoorsId, setDeviceDoorsID }: any = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeviceDoorsID(device?.id);
    setLoading(false);
  }, [device]);

  async function fetchDeviceDoorsID(id: number) {
    const { data: deviceDoors, error } = await supabase
      .from("device_doors")
      .select("*")
      .eq("device_id", id);
    if (error) {
      console.log("error", error.message);
    }
    setDeviceDoorsID(deviceDoors);
  }

  return (
    <View>
      <Text> {device?.name} Details</Text>
      <Text>{JSON.stringify(deviceDoorsId)}</Text>
    </View>
  );
}

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useDebugValue, useEffect, useState } from "react";
import Header from "./TopHeader";
import UpcomingPage from "./demo";
const Resources = () => {
  return (
    <>
      {/* <Header title="Resources" /> */}
      <UpcomingPage />
    </>
  );
};

export default Resources;

const getActivities = async (setActivities, setLoading) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(`${process.env.BACKEND_URI}/api/activities`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    setActivities(data.activities);
    setLoading(false);
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Something went wrong",
    });
    setLoading(false);
  }
};

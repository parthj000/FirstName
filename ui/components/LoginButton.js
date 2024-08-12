import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

async function logIn2(email, password, setLoading, navigation) {
  try {
    setLoading(true);
    const res = await fetch(`${process.env.BACKEND_URI}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      console.log(
        data.token + " login token here ---------------------------------"
      );
      await AsyncStorage.setItem("token", data.token);
      setLoading(false);
      navigation.replace("WelcomePage");
      return;
    } else {
      Toast.show({
        type: "success",
        text1: data.message,
      });
      setLoading(false);
      return;
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
    setLoading(false);
    console.log(error);
  }
}

const LoginButton = (props) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={async () => {
            try {
              if (!props.email || !props.password) {
                props.email ? null : props.setEmailerr("*required");
                props.password ? null : props.setPwderr("*required");
                return null;
              }

              await logIn2(props.email, props.password, setLoading, navigation); // Pass navigation to logIn2
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text style={styles.signUpButtonText}>Log In</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  signUpButton: {
    width: "100%",
    backgroundColor: "#C8D5E1",
    padding: 12,
    marginTop: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  signUpButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

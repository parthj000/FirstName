import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";


async function signUp(email, username, setLoading,navigation) {
  try {
    setLoading(true);
    const res = await fetch(`${process.env.BACKEND_URI}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    });

    const data = await res.json();
    setLoading(false);
    navigation.replace("Login");

    Toast.show({
      type: "success",
      text1: data.message,
    });
  } catch (err) {
    console.log(err);
    Toast.show({
      type: "error",
      text1: err.message,
    });
  }
}

const SignUpButton = (props) => {
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
              if (!props.username || !props.email) {
                props.username ? null : props.setUsrerr("*required");
                props.email ? null : props.setEmailerr("*required");
                return null;
              } else if (props.emailerr || props.usrerr) {
                return null;
              }

              await signUp(props.email, props.username, setLoading,navigation);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SignUpButton;

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

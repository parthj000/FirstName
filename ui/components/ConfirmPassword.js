import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfirmPassword = (props) => {

    const {navigation} = props;


  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [pwderr, setPwderr] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />
      
      <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
        <Toast />
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",

            marginVertical: 20,
          }}
        >
          Change Your Password
        </Text>

        {/* Password TextInput */}
        <View style={{ width: "100%" }}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.fullInput]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={(val) => {
                setPassword(val);
                setPwderr(validatePassword(val));
              }}
            />
            

            <TouchableWithoutFeedback onPress={toggleShowPassword}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                color="#6c757d"
                style={styles.toggleIcon}
              />
            </TouchableWithoutFeedback>
          </View>
          {pwderr ? (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{pwderr}</Text>
            </View>
          ) : null}
        </View>

        {/* Sign Up Button */}

        <TouchableOpacity
          style={button.signUpButton}
          onPress={() => {
            console.log(password);
            if (loading || !password) {
              return null;
            }
            setLoading(true);
            handleOnPress(pwderr, password, setLoading,navigation);
          }}
        >
          {loading ? (
            <ActivityIndicator color={"black"} />
          ) : (
            <Text style={button.signUpButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ConfirmPassword;

const handleOnPress = async (pwderr, password, setLoading,navigation) => {
  try {
    if (pwderr || !password) {
      return null;
    }
    const token = await AsyncStorage.getItem("token");
    console.log(password);

    const res = await fetch(`${process.env.BACKEND_URI}/api/confirm-password`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      await AsyncStorage.setItem("confirm", "true");

      navigation.replace("WelcomePage");
      Toast.show({
        type: "success",
        text1: "password has been set successfully !",
      });
      setLoading(false);
      return;
    }

    Toast.show({
      type: "error",
      text1: data.message,
    });
    setLoading(false);
    return;
  } catch (err) {
    Toast.show({
      type: "error",
      text1: err.message,
    });
    setLoading(false);
    return;
  }
};

const button = StyleSheet.create({
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:"20%",

    gap: 10,
    paddingHorizontal: 15,
    backgroundColor: "#92A0AD",
  },
  input: {
    height: 40,
    // borderColor: "black",
    // borderWidth: 1,
    elevation: 4,

    backgroundColor: "white",
    // marginBottom: 12,
    padding: 12,
    borderRadius: 9,
  },
  fullInput: {
    width: "100%",
  },
  halfInput: {
    width: "48%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    // marginBottom: 12,
    width: "100%",
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#E1E1E1",
    padding: 12,
    marginTop: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  signUpButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  optionText: {
    marginTop: 10,
    fontSize: 14,
    color: "rgb(80 84 89)",
  },
  image: {
    width: "119%",
    height: 300,
    aspectRatio: "1/1",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  toggleIcon: {
    position: "absolute",
    right: 12,
    fontSize: 20,
    top: 12,
  },
  inputEmail: {
    fontWeight: "bold",
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    // marginBottom: 1,
    padding: 12,
    borderRadius: 9,
  },
  errorContainer: {
    width: "100%",
    paddingHorizontal: 10,

    margin: 0,
  },
  error: {
    color: "black",
    fontSize: 12,
    fontStyle: "italic",
  },
});

function validatePassword(input_string) {
  const n = input_string.length;
  if (n === 0) {
    return "*required";
  }
  // Checking lower alphabet in string
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let specialChar = false;
  const normalChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

  for (let i = 0; i < n; i++) {
    if (input_string[i] >= "a" && input_string[i] <= "z") {
      hasLower = true;
    }
    if (input_string[i] >= "A" && input_string[i] <= "Z") {
      hasUpper = true;
    }
    if (input_string[i] >= "0" && input_string[i] <= "9") {
      hasDigit = true;
    }
    if (!normalChars.includes(input_string[i])) {
      specialChar = true;
    }
  }

  // Strength of password
  let strength = "Weak";
  if (!hasDigit || !hasUpper || !hasLower || !specialChar || n < 5) {
    return `*at least 5 characters ,have one lowercase, one uppercase, one special character and one digit`;
  }

  return null;
}

// screens/SignUpPage.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SignUpButton from "../components/SignUpButton";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";


export default function SignUpPage() {

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwderr, setPwderr] = useState(null);
  const [emailerr, setEmailerr] = useState(null);
  const [usrerr, setUsrerr] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword2 = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#92A0AD" />

      <View style={{ position: "relative", zIndex: 78, width: "100%" }}>
        <Toast />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* <Image source={require("../assets/up.jpg")} style={styles.image} /> */}

          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",

              marginBottom: 16,
            }}
          >
            SignUp
          </Text>

          {/* username TextInput */}

          <View style={{ width: "100%" }}>
            <TextInput
              maxLength={20}
              style={styles.inputEmail}
              placeholder="Username "
              onChangeText={(val) => {
                setUsername(val);
                setUsrerr(validateUsername(val));
              }}
            />
            {usrerr ? (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>{usrerr}</Text>
              </View>
            ) : null}
          </View>

          {/* email TextInput */}
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.inputEmail}
              keyboardType="email-address"
              placeholder="Enter your email"
              onChangeText={(val) => {
                setEmail(val);
                setEmailerr(validateEmail(val));
              }}
            />
            {emailerr ? (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>{emailerr}</Text>
              </View>
            ) : null}
          </View>

          {/* Password TextInput */}

          {/* Sign Up Button */}
          <SignUpButton
            email={email}
            password={password}
            username={username}
            emailerr={emailerr}
            setEmailerr={setEmailerr}
            pwderr={pwderr}
            setPwderr={setPwderr}
            usrerr={usrerr}
            setUsrerr={setUsrerr}
          />

          {/* Option Text */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={styles.optionText}>Already have an account? </Text>
            <TouchableOpacity
              style={{ alignItems: "bottom" }}
              onPress={() => navigation.replace("Login")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#92A0AD",
    gap: 12,
  },
  inputEmail: {
    height: 40,
    // borderColor: "black",
    // borderWidth: 1,

    // fontWeight: "bold",
    elevation: 5,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 9,
    width: "100%",
  },
  signInButton: {
    color: "white",
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 12,
    marginTop: 15,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 14,
    color: "rgb(80 84 89)",
  },
  image: {
    width: "119%",
    height: 300,
    marginBottom: 20,
    aspectRatio: "1/1",
  },
  errorContainer: {
    width: "100%",
    // paddingHorizontal: 10,
    margin: 0,
  },
  error: {
    color: "black",
    fontSize: 12,
    fontStyle: "italic",
    paddingHorizontal: 10,
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

function validateUsername(val) {
  if (!val) {
    return "*required";
  }

  const regex = /^[a-zA-Z0-9_.]+$/;
  if (regex.test(val)) {
    return null;
  }
  return `*username can have alphabets,numbers, _ , . `;
}

function validateEmail(email) {
  if (!email) {
    return "*required";
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(email)) {
    return null;
  }
  return "*not a valid email";
}

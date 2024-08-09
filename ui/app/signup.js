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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import SignUpButton from "../components/SignUpButton";
import Toast from "react-native-toast-message";

export default function SignUpPage() {
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
        <Text style={styles.optionText}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "black" }}>
            Log In
          </Link>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 30,
    backgroundColor:"#92A0AD"
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    fontWeight:"bold",
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
    top: 12,
  },
  inputEmail: {
    fontWeight:"bold",
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
